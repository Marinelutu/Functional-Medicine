import { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
  name: string;
  price: string;
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  count: number;
  addToCart: (name: string, price: string) => void;
}

const CartContext = createContext<CartContextType>({ items: [], count: 0, addToCart: () => {} });

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (name: string, price: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.name === name);
      if (existing) return prev.map((i) => (i.name === name ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { name, price, qty: 1 }];
    });
  };

  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return <CartContext.Provider value={{ items, count, addToCart }}>{children}</CartContext.Provider>;
};
