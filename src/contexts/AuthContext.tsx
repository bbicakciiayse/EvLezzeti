import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, FoodItem, Order, OrderStatus } from '../types';
import { MOCK_FOOD_ITEMS } from '../data';

interface AuthContextType {
  user: User | null;
  location: string;
  login: (user: User) => void;
  logout: () => void;
  myProducts: FoodItem[];
  addProduct: (product: FoodItem) => void;
  orders: Order[];
  createOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updateLocation: (location: string) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [location, setLocation] = useState<string>('Beşiktaş, İstanbul');
  const [myProducts, setMyProducts] = useState<FoodItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          if (data.user.location) setLocation(data.user.location);
          if (data.user.role === 'seller') {
            setMyProducts(MOCK_FOOD_ITEMS.filter(item => item.sellerId === data.user.id));
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    if (userData.location) setLocation(userData.location);
    if (userData.role === 'seller') {
      setMyProducts(MOCK_FOOD_ITEMS.filter(item => item.sellerId === userData.id));
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout failed:', error);
    }
    setUser(null);
    setMyProducts([]);
    setOrders([]);
  };

  const addProduct = (product: FoodItem) => {
    setMyProducts((prev) => [product, ...prev]);
  };

  const createOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) => 
      prev.map(order => 
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const updateLocation = (newLocation: string) => {
    setLocation(newLocation);
    if (user) {
      setUser({ ...user, location: newLocation });
    }
  };

  return (
    <AuthContext.Provider value={{ user, location, login, logout, myProducts, addProduct, orders, createOrder, updateOrderStatus, updateLocation, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
