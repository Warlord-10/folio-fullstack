import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import NavbarAuthenticated from "./NavbarAuthenticated";
import NavbarUnauthenticated from "./NavbarUnauthenticated";

export default async function Navbar() {
  const refreshToken = cookies().get("refreshToken")?.value;
  if (!refreshToken) {
    return <NavbarUnauthenticated />;
  }

  try {
    const decoded = jwtDecode(refreshToken);

    // jwtDecode only decodes — it does NOT validate expiry. Check it ourselves,
    // otherwise an expired refresh token still renders as "logged in".
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return <NavbarUnauthenticated />;
    }

    // Cookie is the source of truth for identity, so seed the client menu from it.
    // The store (sessionStorage) is empty on a fresh tab; this keeps the profile link valid.
    const serverUser = {
      _id: decoded._id || decoded.id || decoded.userId,
      name: decoded.name,
      avatar_path: decoded.avatar_path,
    };

    return <NavbarAuthenticated serverUser={serverUser} />;
  } catch (error) {
    console.log(error);
    return <NavbarUnauthenticated />;
  }
}
