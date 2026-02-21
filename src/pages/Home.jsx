import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { FaShoppingCart } from "react-icons/fa";
import StatsList from "../components/StatsList";
import ProductList from "../components/ProductList";
import useProductStore from "../store/ProductStore";
import useOrderStore from "../store/OrderStore";
import useAuthStore from "../store/AuthStore";
import Cart from "../components/Cart";
import useCartStore from "../store/CartStore";

const Home = () => {
  const { products } = useProductStore();
  const { orders } = useOrderStore();
  const { user } = useAuthStore();
  const {items} = useCartStore();

  const userOrders = user
    ? orders.filter((order) => order.user?.id === user.id)
    : [];

  const stats = [
    {
      title: "My Orders",
      quantity: userOrders.length,
      icon: HiOutlineClipboardDocumentList,
      color: "bg-indigo-500",
      to: "/user/orders",
    },
    {
      title: "My Cart",
      quantity: items.length,
      icon: FaShoppingCart,
      color: "bg-green-500",
      to: "/user/cart",
    },
  ];

  const recentProducts = [...products]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

    const recentCartItems = [...items].sort((a, b) => b.id - a.id).slice(0, 5)

  return (
    <div>
      <StatsList stats={stats} user />
      <ProductList products={recentProducts} heading="Featured Products" />
      <Cart items={recentCartItems} heading='My Shopping Cart' />
    </div>
  );
};

export default Home;