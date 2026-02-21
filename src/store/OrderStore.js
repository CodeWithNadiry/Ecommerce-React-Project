import { create } from "zustand";

const useOrderStore = create((set) => ({
  orders: JSON.parse(localStorage.getItem("orders") || "[]"),

  addOrder: ({ user, product, date, status = "pending" }) =>
    set((state) => {
      const newOrder = {
        id: Date.now(),
        user,
        product,
        date,
        status,
      };
      const updatedOrders = [...state.orders, newOrder];
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      return { orders: updatedOrders };
    }),

  updateOrder: (id, updatedData) =>
    set((state) => {
      const updatedOrders = state.orders.map((o) =>
        o.id === id ? { ...o, ...updatedData } : o,
      );
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      return { orders: updatedOrders };
    }),
}));

export default useOrderStore;
