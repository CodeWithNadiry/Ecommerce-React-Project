import { create } from "zustand";
import { persist } from "zustand/middleware";

const useOrderStore = create(
  persist(
    (set, get) => ({
      orders: [],

      // Add a new order
      addOrder: ({ user, product, date, status = "pending" }) => {
        const { orders } = get();
        const newOrder = {
          id: Date.now(),
          user,
          product,
          date,
          status,
        };
        const updatedOrders = [...orders, newOrder];
        set({ orders: updatedOrders });
      },

      updateOrder: (id, updatedData) => {
        const { orders } = get();
        const updatedOrders = orders.map((o) =>
          o.id === id ? { ...o, ...updatedData } : o
        );
        set({ orders: updatedOrders });
      },

      removeOrder: (id) => {
        const { orders } = get();
        const updatedOrders = orders.filter((o) => o.id !== id);
        set({ orders: updatedOrders });
      },

    }),
    {
      name: "orders-storage",
    }
  )
);

export default useOrderStore;