// "use client"
import requests from "@/Networking/Requests";
import Link from 'next/link'
import { cookies } from 'next/headers'
import SearchBar from './SearchBar';
import { jwtDecode } from "jwt-decode";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LogoutButton from "./LogoutButton";
import { fetchClient } from "@/Networking/FetchInstance";
import UserProfileImage from "./UserProfileImage";

export default async function Navbar() {
  try {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;
    
    if (!refreshToken) {
      return (
        <div className='sticky backdrop-blur-md top-0 w-full h-14 bg-gray-950/50 flex text-white items-center px-2 p-1 justify-between z-[50]'>
          <Link href="/home" className='font-[Anta] text-[1.5rem] text-transparent bg-clip-text bg-gradient-to-r from-red-900 to-blue-900'>Folio</Link>
          <SearchBar />
          <Link className="p-2 bg-gray-900 text-gray-400 rounded-md hover:bg-gray-700 font-semibold" href={"/login"}>Login</Link>
        </div>
      );
    }
    
    const userData = jwtDecode(refreshToken);
    // const head = { Cookie: cookieStore.toString() };

    // Fetch user data only when refreshToken exists
    // const userData = await fetchClient(requests.getDeleteUpdateUserById(userData.user._id), {
    //   headers: head,
    //   next: { revalidate: 1800 },
    //   credentials: 'include',
    // });

    return (
      <div className='sticky backdrop-blur-md top-0 w-full h-14 bg-gray-950/50 flex text-white items-center px-2 p-1 justify-between z-[50]'>

        <Link href="/home" className='font-[Anta] text-[1.5rem] text-transparent bg-clip-text bg-gradient-to-r from-red-900 to-blue-900'>Folio</Link>

        <SearchBar />

        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full h-full overflow-hidden">
            <UserProfileImage userData={userData.user} />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="bg-gray-900 text-gray-400">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/profile/${userData.user._id}`} className="w-full">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    );
  } catch (error) {
    console.log(error);
  }
}
