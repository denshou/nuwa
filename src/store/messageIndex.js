export const createMessageIndexSlice = (set) => ({
  messageIndex: 0,
  setMessageIndex: (index) =>
    set((state) => ({ ...state, messageIndex: index })),
});
