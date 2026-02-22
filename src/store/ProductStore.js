import { create } from "zustand";
import { persist } from "zustand/middleware";

const useProductStore = create(
  persist(
    (set, get) => ({
      products: [],

      addProduct: ({ name, price, image }) => {
        const { products } = get();
        const newProduct = {
          id: Date.now(),
          name,
          price,
          image,
        };

        set({ products: [...products, newProduct] });
      },

      updateProduct: (id, updatedData) => {
        const { products } = get();
        const updatedProducts = products.map((p) =>
          p.id === id ? { ...p, ...updatedData } : p
        );

        set({ products: updatedProducts });
      },

      deleteProduct: (id) => {
        const { products } = get();
        const updatedProducts = products.filter((p) => p.id !== id);

        set({ products: updatedProducts });
      },
    }),
    {
      name: "products-storage",
      partialize: state => ({
        products: state.products // did it because before editingProduct also existed
      })
    }
  )
);

export default useProductStore;

// ⚠️ But Should editingProduct Be Persisted?
// Honestly ❌ No.
// Because:
// If user refreshes page →
// You don’t want edit mode to stay active.
// You can persist only products, not editingProduct.