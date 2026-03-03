import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface CartItem {
  name: string;
  price: string;
  benefit?: string;
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  count: number;
  subtotal: number;
  drawerOpen: boolean;
  badgeBounce: boolean;
  addToCart: (name: string, price: string, benefit?: string) => void;
  removeFromCart: (name: string) => void;
  updateQty: (name: string, qty: number) => void;
  toggleDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextType>({
  items: [],
  count: 0,
  subtotal: 0,
  drawerOpen: false,
  badgeBounce: false,
  addToCart: () => { },
  removeFromCart: () => { },
  updateQty: () => { },
  toggleDrawer: () => { },
  closeDrawer: () => { },
});

export const useCart = () => useContext(CartContext);

const parsePrice = (p: string) => parseFloat(p.replace("$", ""));

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [badgeBounce, setBadgeBounce] = useState(false);

  const triggerBounce = useCallback(() => {
    setBadgeBounce(true);
    setTimeout(() => setBadgeBounce(false), 300);
  }, []);

  const addToCart = useCallback(
    (name: string, price: string, benefit?: string) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.name === name);
        if (existing)
          return prev.map((i) =>
            i.name === name ? { ...i, qty: i.qty + 1 } : i
          );
        return [...prev, { name, price, benefit, qty: 1 }];
      });
      triggerBounce();
    },
    [triggerBounce]
  );

  const removeFromCart = useCallback((name: string) => {
    setItems((prev) => prev.filter((i) => i.name !== name));
  }, []);

  const updateQty = useCallback((name: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.name !== name));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.name === name ? { ...i, qty } : i))
      );
    }
  }, []);

  const toggleDrawer = useCallback(() => setDrawerOpen((o) => !o), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + parsePrice(i.price) * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        subtotal,
        drawerOpen,
        badgeBounce,
        addToCart,
        removeFromCart,
        updateQty,
        toggleDrawer,
        closeDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
