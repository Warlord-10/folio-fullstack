import { create } from 'zustand'

const userStore = create((set) => ({
  userData: null,
  updateUserData: (newData) => set({ userData: newData }),
  clearUserData: () => set({ userData: null }),
}))

export default userStore;
