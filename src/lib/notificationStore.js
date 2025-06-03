import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useNotificationStore = create(
  persist(
    (set) => ({
      notifications: [],
      addNotification: (notif) =>
        set((state) => ({
          notifications: [notif, ...state.notifications],
        })),
      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: 'notification-store',
    }
  )
)
