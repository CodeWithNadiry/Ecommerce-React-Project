import BaseLayout from "./BaseLayout";
import { HiUsers, HiCube, HiClipboardList, HiViewGrid } from "react-icons/hi";
import ProductForm from "../components/ProductForm";
import useModalStore from "../store/ModalStore";
import Modal from "../components/Modal";

const links = [
  { label: "Dashboard", to: "/admin/dashboard", icon: HiViewGrid },
  { label: "Users", to: "/admin/users", icon: HiUsers },
  { label: "Products", to: "/admin/products", icon: HiCube },
  { label: "Orders", to: "/admin/orders", icon: HiClipboardList },
];

const AdminLayout = () => {
  const { modalType, closeModal } = useModalStore();

  return (
    <>
      <BaseLayout
        title="Admin Panel"
        subtitle="Manage products & orders"
        links={links}
      />

      <Modal
        open={modalType === "add-product" || modalType === "edit-product"}
        closeModal={closeModal}
      >
        <ProductForm />
      </Modal>
    </>
  );
};

export default AdminLayout;