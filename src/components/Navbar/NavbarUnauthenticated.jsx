import SearchBar from "../SearchBar";
import Link from "next/link";

export default function NavbarUnauthenticated() {
    return (
      <header className="sticky top-0 z-50 flex h-14 w-full items-center justify-between gap-4 border-b border-border bg-background/70 px-4 backdrop-blur-xl">
        <Link
          href="/home"
          className="font-[Anta] bg-gradient-to-r from-primary to-violet-400 bg-clip-text text-2xl text-transparent"
        >
          Folio
        </Link>
        <SearchBar />
        <Link
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          href="/login"
        >
          Login
        </Link>
      </header>
    );
  }
