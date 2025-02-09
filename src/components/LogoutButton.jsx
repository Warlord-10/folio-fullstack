"use client";

import { useRouter } from "next/navigation";
import axios from "@/Networking/Axios";
import requests from "@/Networking/Requests";

export default function LogoutButton() {
  const router = useRouter();

  async function logOut() {
    try {
      await axios.post(requests.userSignOut());
      
      // Clear cookies (if applicable) & redirect to login page
      router.replace("/home");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <button onClick={logOut}>Logout</button>
  );
}
