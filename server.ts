import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { OAuth2Client } from "google-auth-library";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

const app = express();
const PORT = 3000;

// Lazy Stripe Client
let stripeClient: Stripe | null = null;
const getStripe = () => {
  if (!stripeClient && process.env.STRIPE_SECRET_KEY) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripeClient;
};

// Lazy Google OAuth Client
let oauthClient: OAuth2Client | null = null;
const getOAuthClient = () => {
  if (!oauthClient && process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    oauthClient = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
  }
  return oauthClient;
};

app.use(express.json());
app.use(cookieParser());

// API Routes
app.get("/api/auth/google/url", (req, res) => {
  const host = req.get("host");
  const protocol = req.protocol === "https" || req.get("x-forwarded-proto") === "https" ? "https" : "http";
  const baseUrl = process.env.APP_URL || `${protocol}://${host}`;
  const redirectUri = `${baseUrl}/auth/callback`;
  
  console.log("OAuth Request - Base URL:", baseUrl);
  console.log("OAuth Request - Redirect URI:", redirectUri);

  const client = getOAuthClient();
  if (!client) {
    console.error("OAuth Error: Google credentials are not configured");
    return res.status(500).json({ 
      error: "Google credentials are not configured",
      details: "Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in the Secrets panel."
    });
  }

  try {
    const url = client.generateAuthUrl({
      access_type: "offline",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
      redirect_uri: redirectUri,
    });

    res.json({ url });
  } catch (error) {
    console.error("Error generating Auth URL:", error);
    res.status(500).json({ error: "Failed to generate Auth URL" });
  }
});

app.get(["/auth/callback", "/auth/callback/"], async (req, res) => {
  const { code } = req.query;
  const host = req.get("host");
  const protocol = req.protocol === "https" || req.get("x-forwarded-proto") === "https" ? "https" : "http";
  const baseUrl = process.env.APP_URL || `${protocol}://${host}`;
  const redirectUri = `${baseUrl}/auth/callback`;
  const client = getOAuthClient();

  if (!client) {
    return res.status(500).send("Google credentials are not configured.");
  }

  try {
    const { tokens } = await client.getToken({
      code: code as string,
      redirect_uri: redirectUri,
    });
    
    client.setCredentials(tokens);

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) throw new Error("No payload");

    const user = {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      avatar: payload.picture,
      role: "customer", // Default role
    };

    // Set user in cookie (SameSite=None and Secure=true required for iframe)
    res.cookie("user", JSON.stringify(user), {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.send(`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS', user: ${JSON.stringify(user)} }, '*');
              window.close();
            } else {
              window.location.href = '/';
            }
          </script>
          <p>Giriş başarılı. Bu pencere otomatik olarak kapanacaktır.</p>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("OAuth error:", error);
    res.status(500).send("Giriş sırasında bir hata oluştu.");
  }
});

app.get("/api/auth/me", (req, res) => {
  const userCookie = req.cookies.user;
  if (userCookie) {
    res.json({ user: JSON.parse(userCookie) });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("user", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.json({ success: true });
});

// Mock Login for Demo (when keys are missing)
app.post("/api/auth/mock-login", (req, res) => {
  const { role } = req.body;
  const user = {
    id: "mock-" + Math.random().toString(36).substr(2, 9),
    name: role === "seller" ? "Demo Satıcı" : "Demo Müşteri",
    email: role === "seller" ? "satici@demo.com" : "musteri@demo.com",
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`,
    role: role || "customer",
    location: "Beşiktaş, İstanbul"
  };

  res.cookie("user", JSON.stringify(user), {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.json({ user });
});

// Stripe Payment Intent
app.post("/api/create-payment-intent", async (req, res) => {
  const { amount } = req.body;
  const stripe = getStripe();

  try {
    if (!stripe) {
      // Return a special flag for frontend to handle mock payment
      return res.json({ mock: true });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // convert to cents
      currency: "try",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: error.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
