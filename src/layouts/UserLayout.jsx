import { HiCube } from "react-icons/hi2";
import BaseLayout from "./BaseLayout";
import {
  HiClipboardList,
  HiHome,
  HiShoppingCart,
} from "react-icons/hi";

const links = [
  {
    label: "Home",
    to: "/user/home",
    icon: HiHome,
  },
  {
    label: "My Cart",
    to: "/user/cart",
    icon: HiShoppingCart,
  },
  {
    label: "My Orders",
    to: "/user/orders",
    icon: HiClipboardList,
  },
  {
    label: "Products",
    to: "/user/products",
    icon: HiCube,
  },
];

const UserLayout = () => (
  <BaseLayout
    title="User Dashboard"
    subtitle="Shop & manage your cart"
    links={links}
  />
);

export default UserLayout;
