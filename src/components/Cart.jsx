import { useLocation, useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import useCartStore from "../store/CartStore";
import useOrderStore from "../store/OrderStore";
import useAuthStore from "../store/AuthStore";
import { formatter } from "../utils/formatter"; 
import { useTotalPrice } from "../utils/useTotalPrice";

const Cart = ({ items: propCartItems, heading }) => {
  const { items: storeCartItems, addItem, removeItem, clearCart } = useCartStore();
  const { addOrder } = useOrderStore();
  const { user } = useAuthStore();

  const location = useLocation();
  const onCartPage = location.pathname === "/user/cart";
  const navigate = useNavigate();

  const items = propCartItems || storeCartItems;
  const totalPrice = useTotalPrice();

  const handleOrderNow = () => {
    if (items.length === 0) return;

    const today = new Date().toLocaleString();

    const productDetails = items.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));

    addOrder({
      user: { id: user.id, name: user.name },
      product: productDetails,
      date: today,
      status: "pending",
    });

    clearCart(); 
    alert("Order placed successfully!");
    navigate("/user/orders"); 
  };

  return (
    <div className="my-6 bg-white p-6 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">{heading}</h2>
        {!onCartPage && (
          <Button onClick={() => navigate("/user/cart")}>
            All Cart Items
          </Button>
        )}
      </div>

      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left text-sm text-gray-600">
            <th className="px-4 py-3">Image</th>
            <th className="px-4 py-3">Product</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3 text-center">Quantity</th>
          </tr>
        </thead>

        <tbody className="text-sm text-gray-700">
          {items.length > 0 ? (
            items.map(item => (
              <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-4 py-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-lg"
                  />
                </td>
                <td className="px-4 py-3 font-medium">{item.name}</td>
                <td className="px-4 py-3">
                  {formatter ? formatter.format(item.price) : `$${item.price}`}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-medium">{item.quantity}</span>
                    <button
                      onClick={() => addItem(item)}
                      className="px-3 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-4 text-gray-500">
                No Items Yet
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {items.length > 0 && (
        <div className="flex justify-between items-center mt-6">
          <span className="text-lg font-semibold">
            Total: {formatter.format(totalPrice)}
          </span>
          <Button onClick={handleOrderNow}>Order Now</Button>
        </div>
      )}
    </div>
  );
};

export default Cart;