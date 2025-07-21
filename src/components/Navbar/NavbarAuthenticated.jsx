"use client"
import { Inbox } from "lucide-react";
import UserMenu from "./UserMenu";
import Link from "next/link";
import SearchBar from "../SearchBar";

import useSettingStore from "@/Stores/settingStore";
import useAuthStore from "@/Stores/authStore";

export default function NavbarAuthenticated() {
    const settings = useSettingStore((state) => state.settings);
    const setSettings = useSettingStore((state) => state.setSettings);
    const userData = useAuthStore((state) => state.userData) || "";

  return (
    <div className="sticky backdrop-blur-md top-0 w-full h-14 bg-gray-950/50 flex text-white items-center px-2 p-1 justify-between z-[50]">
      <Link
        href="/home"
        className="font-[Anta] text-[1.5rem] text-transparent bg-clip-text bg-gradient-to-r from-red-900 to-blue-900"
      >
        Folio
      </Link>

      <SearchBar />

      <div className="flex gap-8 items-center h-full justify-center">
        <button onClick={() => setSettings({ isTerminalOpen: !settings.isTerminalOpen })}>
          <Inbox size={36} strokeWidth={1} />
        </button>
        <UserMenu user={userData}/>
      </div>
    </div>
  );
}
