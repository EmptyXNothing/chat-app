import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visible: false,
}
const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, { payload }) {
      state.visible = true
    },
    closeModal(state, { payload }) {
      state.visible = false
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
