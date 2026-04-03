export type UserRole = 'customer' | 'seller' | 'admin';

export type OrderStatus = 'pending' | 'preparing' | 'on_way' | 'arrived' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  customerId: string;
  sellerId: string;
  items: {
    foodId: string;
    quantity: number;
    price: number;
    name: string;
    image: string;
  }[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  deliveryAddress: string;
  estimatedDeliveryTime?: number; // in minutes
  courier?: {
    name: string;
    phone: string;
    lat: number;
    lng: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  location?: string;
  rating?: number;
  reviewCount?: number;
  isVerified?: boolean;
}

export interface FoodItem {
  id: string;
  sellerId: string;
  sellerName: string;
  title: string;
  description: string;
  price: number;
  category: string;
  cuisineType: string;
  dietaryPreferences: string[]; // e.g., ['vejetaryen', 'glutensiz']
  image: string;
  rating: number;
  reviewCount: number;
  prepTime: string;
  isAvailable: boolean;
  location: string;
}

export interface Review {
  id: string;
  orderId: string;
  customerId: string;
  sellerId: string;
  rating: number;
  comment: string;
  createdAt: string;
}
