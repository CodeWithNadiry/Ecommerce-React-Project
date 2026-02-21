import ProductCard from "./ProductCard";
import Button from "./ui/Button";
import useModalStore from "../store/ModalStore";
import useAuthStore from "../store/AuthStore";
import { useLocation, useNavigate } from "react-router-dom";

const ProductList = ({ products, heading }) => {
  const navigate = useNavigate();
  const { openModal } = useModalStore();
  const { user } = useAuthStore();
  const location = useLocation();
  const onProductsPage = location.pathname === "/user/products";
  return (
    <div className="my-6 bg-white p-6 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">{heading}</h2>
        {!onProductsPage && (
          <Button
            onClick={() => {
              if (user?.role === "admin") {
                openModal("add-product");
              } else {
                navigate("/user/products");
              }
            }}
          >
            {user?.role === "admin" ? "+ Add Product" : "All Products"}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center">
            <p className="text-gray-500 text-lg">No Products yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
