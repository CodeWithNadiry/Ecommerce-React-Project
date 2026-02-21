import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuthStore from "../store/AuthStore";
import { HiLogout, HiMenu, HiX } from "react-icons/hi";
import Button from "../components/ui/Button";
import useCartStore from "../store/CartStore";

const BaseLayout = ({ title, subtitle, links }) => {
  const { user, logout } = useAuthStore();
  const { clearCart } = useCartStore();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
  clearCart();
  logout();
  navigate("/auth?mode=login");
};
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-[#0A6085] text-white flex flex-col transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 z-50`}
      >
        <div className="flex items-center gap-2 px-6 py-4 border-b border-white/20">
          <img src="/logo.jpg" alt="Logo" className="w-10 mix-blend-multiply" />
          <h2 className="text-xl font-bold tracking-wide">Skyware</h2>

          <button
            className="md:hidden ml-auto cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          >
            <HiX size={24} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-2 p-4 text-sm">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 group
                   ${
                     isActive
                       ? "bg-white text-[#0A6085] font-semibold shadow"
                       : "hover:bg-white/10"
                   }`
                }
              >
                {Icon && (
                  <Icon
                    size={18}
                    className="transition-transform group-hover:scale-110"
                  />
                )}
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col md:ml-60">
        <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-[#0A6085] cursor-pointer"
              onClick={() => setSidebarOpen(true)}
            >
              <HiMenu size={26} />
            </button>

            <div>
              <h1 className="text-lg font-semibold">{title}</h1>
              <p className="text-xs text-gray-500">{subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-lg font-medium capitalize">{user?.name}</span>

            <Button onClick={handleLogout} variant="danger">
              <span className="flex items-center gap-2">
                <span className="hidden md:inline">Logout</span>
                <HiLogout size={18} />
              </span>
            </Button>
          </div>
        </header>

        <main className="p-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default BaseLayout;
