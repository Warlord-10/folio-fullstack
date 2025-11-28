import { cookies } from 'next/headers';
import requests from './Requests';

export const fetchCurrentUser = async () => {
    try {
        const cookieStore = cookies();
        const sessionCookie = cookieStore.get('accessToken'); // Adjust cookie name if needed, usually 'connect.sid' or similar if express-session, or just pass all

        // If we don't know the exact cookie name, we can pass all cookies string
        const cookieHeader = cookieStore.toString();

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${requests.getSession()}`, {
            method: 'GET',
            headers: {
                'Cookie': cookieHeader,
                'Content-Type': 'application/json',
            },
            cache: 'no-store', // Ensure we don't cache user data
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return data.user || null;
    } catch (error) {
        console.error("Error fetching current user:", error);
        return null;
    }
};
