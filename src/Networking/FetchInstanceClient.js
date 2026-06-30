import requests from "@/Networking/Requests";

// We just hit the refresh endpoint with cookies.
const refreshTokens = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${requests.refreshSession()}`, {
            method: "POST",
            credentials: "include",
        });

        return response.ok;
    } catch (error) {
        return false;
    }
};


export const fetchClient = async (url, options = {}) => {
    // Ensure we send cookies with the request
    const config = {
        ...options,
        credentials: "include",
    };

    // Main Request
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, config);

    // Check 401 AND make sure we haven't already tried to refresh (_retry flag)
    if (response.status === 401 && !config._retry) {
        config._retry = true;

        const refreshSuccess = await refreshTokens();

        if (refreshSuccess) {
            return fetchClient(url, config);
        }
    }

    // Error Handling
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    if (response.status === 204) {
        return null;
    }

    if (options.responseType === 'text') {
        return response.text();
    }

    return response.json();
};