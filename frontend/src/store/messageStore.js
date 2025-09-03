import { create } from 'zustand';
import { produce } from 'immer';

export const useMessageStore = create((set) => ({
  messages: [],

  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set(produce(state => { state.messages.push(message) })),
}));
