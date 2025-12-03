// 1. Specialized Refresh Function
// No options passed. We just want to hit the refresh endpoint with cookies.
const refreshTokens = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      method: "POST", // or GET, depending on your backend
      credentials: "include", // <--- CRITICAL: Sends the Refresh Token Cookie
    });

    return response.ok;
  } catch (error) {
    return false;
  }
};

// 2. The Wrapper
export const fetchClient = async (url, options = {}) => {
  // Ensure we send cookies with the request
  const config = {
    ...options,
    credentials: "include",
  };

  // First Attempt
  let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, config);

  // Check 401 AND make sure we haven't already tried to refresh (_retry flag)
  if (response.status === 401 && !config._retry) {
    config._retry = true; // Set the flag so we don't loop forever

    const refreshSuccess = await refreshTokens();

    if (refreshSuccess) {
      // Retry the original request with the exact same config
      return fetchClient(url, config);
    }

    // If refresh fails, we let the code fall through to the error handler below.
    // Ideally, you might want to redirect to /login here.
  }

  // Error Handling
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({})); // Safe parse
    throw new Error(errorData.message || 'Fetch request failed');
  }

  // Handle empty responses (like 204 No Content) to avoid JSON parse errors
  if (response.status === 204) {
    return null;
  }

  return response.json();
};