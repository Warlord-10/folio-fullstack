import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import NavbarAuthenticated from "./NavbarAuthenticated";
import NavbarUnauthenticated from "./NavbarUnauthenticated";

export default async function Navbar() {
  try {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return <NavbarUnauthenticated />;
    }

    const userData = jwtDecode(refreshToken);

    return <NavbarAuthenticated />;
  } catch (error) {
    console.log(error);
    return <NavbarUnauthenticated />;
  }
}
