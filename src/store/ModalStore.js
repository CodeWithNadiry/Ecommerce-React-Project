import { create } from "zustand";

const useModalStore = create((set) => ({
  modalType: "",
  modalData: null, // product object when editing

  openModal: (type, data = null) => {
    set({
      modalType: type,
      modalData: data,
    });
  },

  closeModal: () => {
    set({
      modalType: "",
      modalData: null,
    });
  },
}));

export default useModalStore;
