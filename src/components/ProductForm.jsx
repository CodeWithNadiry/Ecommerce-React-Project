/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useRef } from "react";
import useModalStore from "../store/ModalStore";
import useProductStore from "../store/ProductStore";
import { isEmpty } from "../utils/validation";
import Input from "./Input";
import Button from "./ui/Button";

const ProductForm = () => {
  const { modalType, modalData, closeModal } = useModalStore();
  const {
    addProduct,
    updateProduct,
  } = useProductStore();

  const isEditing = modalType === "edit-product";
  const editingProduct = modalData;
  const fileInputRef = useRef(null);

  const [userInputs, setUserInputs] = useState({
    name: "",
    price: "",
    image: "",
    file: null,
  });

  const [error, setError] = useState(null);

  const resetForm = () => {
    setUserInputs({
      name: "",
      price: "",
      image: "",
      file: null,
    });

    setError(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (isEditing && editingProduct) {
      setUserInputs({
        name: editingProduct.name || "",
        price: editingProduct.price || "",
        image: editingProduct.image || "",
        file: null,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      resetForm();
    }
  }, [isEditing, editingProduct]);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file" && files && files.length > 0) {
      const file = files[0];

      const reader = new FileReader();

      reader.onloadend = () => {
        setUserInputs((prev) => ({
          ...prev,
          image: reader.result, 
          file: file,
        }));
      };

      reader.readAsDataURL(file); 
    } else {
      setUserInputs((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, price, image } = userInputs;

    if (!name || name.trim().length < 5) {
      setError("Product name must be at least 5 characters.");
      return;
    }

    if (!price || isEmpty(price)) {
      setError("Price should be provided.");
      return;
    }

    if (!image) {
      setError("Product image must be provided.");
      return;
    }

    const productData = {
      name: name.trim(),
      price,
      image,
    };

    if (isEditing && editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }

    resetForm();
    closeModal();
  };

  const handleCancel = () => {
    resetForm();
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-white">
      <h2 className="text-xl font-semibold">
        {isEditing ? "Edit Product" : "Add Product"}
      </h2>

      <Input
        type="text"
        name="name"
        placeholder="Product Name"
        value={userInputs.name}
        onChange={handleChange}
      />

      <Input
        type="number"
        name="price"
        placeholder="Product Price"
        value={userInputs.price}
        onChange={handleChange}
      />

      <Input
        type="file"
        name="image"
        onChange={handleChange}
        ref={fileInputRef}
      />

      {userInputs.image && (
        <img
          src={userInputs.image}
          alt="Preview"
          className="mt-2 w-full h-48 object-cover rounded"
        />
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-3">
        <Button type="submit">
          {isEditing ? "Update Product" : "Add Product"}
        </Button>

        <Button type="button" variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;