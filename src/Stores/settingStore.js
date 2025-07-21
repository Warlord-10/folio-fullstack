import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const defaultSettings = {
    isTerminalOpen: false,
}

const useSettingStore = create(
    persist(
        (set) => ({
            settings: {
                ...defaultSettings
            },
            setSettings: (partialSettings) => set((state) => ({
                settings: {
                    ...state.settings,
                    ...partialSettings
                }
            })),
            clearSettings: () => set({ settings: null }),
        }),
        {
            name: 'settings', 
            getStorage: () => sessionStorage,
        }
    )
);

export default useSettingStore;
