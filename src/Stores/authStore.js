
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import requests from '@/Networking/Requests';
import axios from "@/Networking/Axios";
import { fetchClient } from '@/Networking/FetchInstance';

const useAuthStore = create(
  persist(
    (set) => ({
      userData: undefined,          // non-sensitive profile info
      status: 'idle' | 'loading' | 'authenticated' | 'unauthenticated',           

      login: async (dataToSend) => {
        try {
          set({ status: 'loading' });
          const res = await axios.post(requests.userSignIn(), dataToSend)
          const resData = res.data;     
          
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
          const res = await axios.post(requests.userSignUp(), dataToSend)
          const resData = res.data;

          set({ userData: resData.user, status: 'authenticated' });

          return resData
        } catch (error) {
          set({ status: 'unauthenticated' });
          throw error;
        }
      },

      logout: async () => {
        try {
          const res = await axios.post(requests.userSignOut());
          set({ userData: undefined, status: 'unauthenticated' });

          return {message: "Successfully logged out!"}
        } catch (error) {
          return {error: error.message || "Something went wrong, please try again!"}
        }
      },

      refresh: async () => {
        try {
          console.log("trying to refresh")
          set({ status: 'loading' });

          const user = useAuthStore.getState().userData;
          if (!user) return
          
          const res = await fetchClient(requests.getDeleteUpdateUserById(user._id), { credentials: 'include' });
          if (res) set({ userData: res.data, status: 'authenticated' });
          
        } catch (error) {
          console.log("Error in refresh:", error);
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
