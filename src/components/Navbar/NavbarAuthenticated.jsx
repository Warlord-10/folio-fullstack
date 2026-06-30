"use client"
import { Inbox } from "lucide-react";
import UserMenu from "./UserMenu";
import Link from "next/link";
import SearchBar from "../SearchBar";

import useSettingStore from "@/Stores/settingStore";
import useAuthStore from "@/Stores/authStore";

export default function NavbarAuthenticated({ serverUser }) {
    const settings = useSettingStore((state) => state.settings);
    const setSettings = useSettingStore((state) => state.setSettings);
    // Prefer the richer client store (has avatar etc.), fall back to the cookie-derived user
    const userData = useAuthStore((state) => state.userData) || serverUser || "";

  return (
    <header className="sticky top-0 z-50 flex h-14 w-full items-center justify-between gap-4 border-b border-border bg-background/70 px-4 backdrop-blur-xl">
      <Link
        href="/home"
        className="font-[Anta] bg-gradient-to-r from-primary to-violet-400 bg-clip-text text-2xl text-transparent"
      >
        Folio
      </Link>

      <SearchBar />

      <div className="flex h-full items-center justify-center gap-4">
        <button
          aria-label="Toggle terminal"
          onClick={() => setSettings({ isTerminalOpen: !settings.isTerminalOpen })}
          className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Inbox size={22} strokeWidth={1.75} />
        </button>
        <UserMenu user={userData}/>
      </div>
    </header>
  );
}
