import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    removeChannel: channelsAdapter.removeOne,
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors(
  (state) => state.channels
);
export default channelsSlice.reducer;
