import useCartStore from "../store/CartStore";

export const useTotalQuantity = () =>
  useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );
