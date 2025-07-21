import SearchBar from "../SearchBar";
import Link from "next/link";

export default function NavbarUnauthenticated() {
    return (
      <div className="sticky backdrop-blur-md top-0 w-full h-14 bg-gray-950/50 flex text-white items-center px-2 p-1 justify-between z-[50]">
        <Link
          href="/home"
          className="font-[Anta] text-[1.5rem] text-transparent bg-clip-text bg-gradient-to-r from-red-900 to-blue-900"
        >
          Folio
        </Link>
        <SearchBar />
        <Link
          className="p-2 bg-gray-900 text-gray-400 rounded-md hover:bg-gray-700 font-semibold"
          href="/login"
        >
          Login
        </Link>
      </div>
    );
  }
  