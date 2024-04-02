export const createUploadFileSlice = (set) => ({
  uploadType: null,
  setUploadType: (value) => set((state) => ({ ...state, uploadType: value })), // DIRECT, CHAT, CANVAS, VOICE
});
