import { create } from "zustand";

const useProductStore = create((set) => ({
  products: JSON.parse(localStorage.getItem("products") || "[]"),

  editingProduct: null,

  setEditingProduct: (product) => set({ editingProduct: product }),

  clearEditingProduct: () => set({ editingProduct: null }),

  addProduct: ({ name, price, image }) =>
  set((state) => {
    const newProduct = { id: Date.now(), name, price, image };
    const updatedProducts = [...state.products, newProduct];
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    return { products: updatedProducts };
  }),
  updateProduct: (id, updatedData) =>
    set((state) => {
      const updatedProducts = state.products.map((p) =>
        p.id === id ? { ...p, ...updatedData } : p,
      );
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      return { products: updatedProducts };
    }),

  deleteProduct: (id) =>
    set((state) => {
      const updatedProducts = state.products.filter((p) => p.id !== id);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      return { products: updatedProducts };
    }),
}));

export default useProductStore;
