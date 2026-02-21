import useCartStore from "../store/CartStore";

export const useTotalPrice = () => {
  const { items } = useCartStore();

  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};
