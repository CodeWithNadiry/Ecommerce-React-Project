import {
  HiOutlineUsers,
  HiOutlineCube,
  HiOutlineClipboardDocumentList,
} from "react-icons/hi2";
import StatsList from "../components/StatsList";
import useProductStore from "../store/ProductStore";
import useAuthStore from "../store/AuthStore";
import Orders from "../components/Orders";
import useOrderStore from "../store/OrderStore";
import ProductList from "../components/ProductList";
const AdminDashboard = () => {
  const { products } = useProductStore();
  const { orders } = useOrderStore();
  const { users } = useAuthStore();
  const stats = [
    {
      title: "Total Users",
      quantity: users.filter((u) => u.role !== "admin").length,
      icon: HiOutlineUsers,
      color: "bg-indigo-500",
      to: "/admin/users",
    },
    {
      title: "Total Products",
      quantity: products.length,
      icon: HiOutlineCube,
      color: "bg-green-500",
      to: "/admin/products",
    },
    {
      title: "Total Orders",
      quantity: orders.length,
      icon: HiOutlineClipboardDocumentList,
      color: "bg-rose-500",
      to: "/admin/orders",
    },
  ];

  const recentOrders = orders
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const recentProducts = products
    .slice()
    .sort((a, b) => b - a)
    .slice(0, 5);
  return (
    <div>
      <StatsList stats={stats} />

      <Orders
        orders={recentOrders}
        heading={"Recent Orders"}
        btnText="All Orders"
      />

      <ProductList
        products={recentProducts}
        heading="Manage Products"
        btnText="+ Add Product"
      />
    </div>
  );
};

export default AdminDashboard;
