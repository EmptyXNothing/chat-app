import { create } from 'zustand';
import { produce } from 'immer';

export const useChannelStore = create((set, get) => ({
  channels: [],
  currentChannel: null,

  setChannels: (channels) => set({ channels }),
  addChannel: (channel) => set(produce(state => { state.channels.push(channel) })),
  removeChannel: (id) => set(produce(state => {
    state.channels = state.channels.filter(ch => ch.id !== id);
  })),
  renameChannel: (newChannel) => set(produce(state => {
    state.channels = state.channels.map(channel => channel.id === newChannel.id ? newChannel : channel)
  })),
  setCurrentChannel: (channel) => set({ currentChannel: channel }),
  setFirstChannel: () => {
    const channels = get().channels;
    if (channels.length > 0) {
      set({ currentChannel: channels[0] });
    }
  }
}));
