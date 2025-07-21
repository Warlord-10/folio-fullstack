"use client";

import { useRouter } from "next/navigation";
import useAuthStore from "@/Stores/authStore";

export default function LogoutButton() {
  const router = useRouter();
  const logoutFunction = useAuthStore((state) => state.logout);

  async function logOut() {
    try {
      const response = await logoutFunction()

      if (response.message) {
        router.replace("/home");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <button onClick={logOut} className="flex w-full">Logout</button>
  );
}
