import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { AdminDashboard, Auth, CartPage, Home, NotFound, OrdersPage, Products, Users } from "../pages";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";
import Orders from "../components/Orders";

const AppRoutes = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/auth?mode=login" /> },
    { path: "/auth", element: <Auth /> },

    {
      element: <ProtectedRoutes role="admin" />,
      children: [
        {
          path: "/admin",
          element: <AdminLayout />,
          children: [
            { index: true, element: <Navigate to="dashboard" /> },
            { path: "dashboard", element: <AdminDashboard />  },
            { path: "users", element: <Users />  },
            { path: "products", element: <Products />  },
            { path: "orders", element: <OrdersPage /> },
          ],
        },
      ],
    },

    {
      element: <ProtectedRoutes role="user" />,
      children: [
        {
          path: "/user",
          element: <UserLayout />,
          children: [
            { index: true, element: <Navigate to="home" /> },
            { path: "home", element: <Home /> },
            { path: "cart", element: <CartPage /> },
            { path: "orders", element: <Orders /> },
            { path: "products", element: <Products /> },
          ],
        },
      ],
    },

    {path: '*', element: <NotFound />}
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoutes;
