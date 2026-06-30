import { cookies } from "next/headers";


// Fetch the cookies manually and attach them in the headers of the request
// This is done to make the requests to the server with the cookies
export const fetchServer = async (url, options = {}) => {
  const cookieStore = cookies()

  const config = {
    ...options,
    headers: {
      "Cookie": [
        cookieStore.get("accessToken")?.value && `accessToken=${cookieStore.get("accessToken").value}`,
        cookieStore.get("refreshToken")?.value && `refreshToken=${cookieStore.get("refreshToken").value}`,
      ]
        .filter(Boolean)
        .join("; "),
    },
  };

  // Main Request
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, config);

  // Error Handling
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return await response.json();
};