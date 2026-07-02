
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import requests from '@/Networking/Requests';
import { fetchClient } from '@/Networking/FetchInstanceClient';

const useAuthStore = create(
  persist(
    (set) => ({
      userData: undefined,          // non-sensitive profile info
      status: 'idle',               // 'idle' | 'loading' | 'authenticated' | 'unauthenticated'

      setUserData: (user) => {
        set({ userData: user, status: user ? 'authenticated' : 'unauthenticated' });
      },

      login: async (dataToSend) => {
        try {
          set({ status: 'loading' });
          const resData = await fetchClient(requests.userSignIn(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend),
          });

          set({ userData: resData.user, status: 'authenticated' });

          return resData
        } catch (error) {
          set({ status: 'unauthenticated' });
          throw error;
        }
      },

      register: async (dataToSend) => {
        try {
          set({ status: 'loading' });
          const resData = await fetchClient(requests.userSignUp(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend),
          });

          set({ userData: resData.user, status: 'authenticated' });

          return resData
        } catch (error) {
          set({ status: 'unauthenticated' });
          throw error;
        }
      },

      logout: async () => {
        try {
          await fetchClient(requests.userSignOut(), { method: 'POST' });
          set({ userData: undefined, status: 'unauthenticated' });

          return { message: "Successfully logged out!" }
        } catch (error) {
          return { error: error.message || "Something went wrong, please try again!" }
        }
      },

      refresh: async () => {
        try {
          ("trying to refresh")
          set({ status: 'loading' });

          const user = useAuthStore.getState().userData;
          if (!user) return

          const res = await fetchClient(requests.getDeleteUpdateUserById(user._id));
          if (res) set({ userData: res.data, status: 'authenticated' });

        } catch (error) {
          ("Error in refresh:", error);
        }
      },
    }),

    // persist only the profile so a page reload doesn’t refetch if we already have it
    {
      name: 'auth-cache',
      storage: createJSONStorage(() => sessionStorage), // cleared on tab close
      partialize: (s) => ({ userData: s.userData, status: s.status })
    },
  ),
);

export default useAuthStore;
