import { create } from "zustand";

const useCartStore = create((set) => ({
  items: JSON.parse(localStorage.getItem("items") || "[]"),

  addItem: (item) =>
    set((state) => {
      const updatedItems = [...state.items];

      const index = updatedItems.findIndex((i) => i.id === item.id);

      if (index > -1) {
        updatedItems[index] = {
          ...updatedItems[index],
          quantity: updatedItems[index].quantity + 1,
        };
      } else {
        updatedItems.push({
          ...item,
          quantity: 1,
        });
      }

      localStorage.setItem("items", JSON.stringify(updatedItems));

      return { items: updatedItems };
    }),

  removeItem: (id) =>
    set((state) => {
      const updatedItems = [...state.items];
      const index = updatedItems.findIndex((item) => item.id === id);

      if (index === -1) return { items: updatedItems };

      if (updatedItems[index].quantity === 1) {
        updatedItems.splice(index, 1);
      } else {
        updatedItems[index] = {
          ...updatedItems[index],
          quantity: updatedItems[index].quantity - 1,
        };
      }

      localStorage.setItem("items", JSON.stringify(updatedItems));

      return { items: updatedItems };
    }),

  clearCart: () =>
    set(() => {
      localStorage.removeItem("items");
      return { items: [] };
    }),
}));

export default useCartStore;
