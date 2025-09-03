import { create } from 'zustand';

export const useModalStore = create((set) => ({
  modal: {
    visible: false,
    type: null,
    data: null,
  },

  openModal: (type, data) => set({
      data : data ?? null,
      type : type,
      visible : true,
  }),
  closeModal: () => set({ type: null, visible: false, data: null }),
}));
