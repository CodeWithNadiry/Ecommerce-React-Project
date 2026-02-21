import ProductList from "../components/ProductList";
import useProductStore from "../store/ProductStore";

const Products = () => {
  const {products} = useProductStore();
  return (
    <div>
      <ProductList products={products} heading={'All Products'} btnText={'+ Add Product'} />
    </div>
  );
};

export default Products;