import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import LogoutButton from "./LogoutButton";
import UserProfileImage from "../UserProfileImage";
import Link from "next/link";

export default function UserMenu({ user }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full h-full overflow-hidden">
        <UserProfileImage userData={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-900 text-gray-400">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/profile/${user._id}`} className="w-full">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
