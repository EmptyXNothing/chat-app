import { create } from 'zustand';

export const useModalStore = create((set) => ({
  modal: {
    visible: false,
    type: null,
    data: null,
  },

  openModal: (type, data) => set(({modal: { visible: true, type: type, data: data ?? null }})),
  closeModal: () => set(({modal: { visible: false, type: null, data: null }})),
}));
