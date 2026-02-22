import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const { items } = get();
        const updatedItems = [...items];

        const index = updatedItems.findIndex((i) => i.id === item.id);

        if (index > -1) {
          const existingItem = updatedItems[index];
          const updatedItem = {
            ...existingItem,
            quantity: existingItem.quantity + 1,
          };
          updatedItems[index] = updatedItem;
        } else {
          updatedItems.push({
            ...item,
            quantity: 1,
          });
        }

        set({ items: updatedItems });
      },

      removeItem: (id) => {
        const { items } = get();
        const updatedItems = [...items];

        const index = updatedItems.findIndex((i) => i.id === id);
        if (index === -1) return;

        const existingItem = updatedItems[index];

        if (existingItem.quantity === 1) {
          updatedItems.splice(index, 1);
        } else {
          const updatedItem = {
            ...existingItem,
            quantity: existingItem.quantity - 1,
          };
          updatedItems[index] = updatedItem;
        }

        set({ items: updatedItems });
      },

      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: "cart-storage", 
    }
  )
);

export default useCartStore;