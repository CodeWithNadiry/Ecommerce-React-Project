import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/AuthStore";
import useCartStore from "../store/CartStore";
import useModalStore from "../store/ModalStore";
import useProductStore from "../store/ProductStore";
import { formatter } from "../utils/formatter";
import Button from "./ui/Button";

const ProductCard = ({ ...product }) => {
  const navigate = useNavigate();
  const { id, name, price, image } = product;
  const { openModal } = useModalStore();
  const { user } = useAuthStore();
  const { addItem } = useCartStore();
  const {  deleteProduct } = useProductStore();

  function handleDeleteProduct() {
    const confirmed = window.confirm(
      "Are you sure you want to delete the product.",
    );
    if (confirmed) {
      deleteProduct(id);
    }
  }
  return (
    <div className="flex flex-col items-center text-center bg-gray-50 rounded-2xl p-4 shadow-md hover:shadow-xl transition duration-300">
      <div className="w-full h-60 mb-4">
        <img
          src={image || "/placeholder.png"}
          alt={name}
          className="w-full h-60 object-contain rounded-xl"
        />
      </div>

      <h2 className="font-semibold text-gray-800 text-lg mb-1">{name}</h2>
      <h3 className="text-indigo-600 font-bold mb-4 text-lg">
        {formatter.format(price)}
      </h3>

      <div className="flex gap-2 w-full">
        {user && user.role === "admin" ? (
          <>
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => {
                openModal("edit-product", product);
              }}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              className="flex-1"
              onClick={handleDeleteProduct}
            >
              Delete
            </Button>
          </>
        ) : (
          <Button
            className="flex-1"
            disabled={!user}
            onClick={() => {
              if (!user) return navigate("/login");
              addItem(product);
            }}
          >
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
