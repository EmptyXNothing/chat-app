import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visible: false,
  type: null,
  data: null,
};
const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, { payload }) {
      const { type, data } = payload;
      if (data) {
        state.data = data;
      }
      state.type = type;
      state.visible = true;
    },
    closeModal(state) {
      state.type = null;
      state.visible = false;
      state.data = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
