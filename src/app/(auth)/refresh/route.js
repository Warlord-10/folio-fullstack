import requests from "@/Networking/Requests";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        // Server-side fetch has no cookie jar — credentials:"include" is a no-op here,
        // so forward the incoming cookies explicitly or the backend never sees the refreshToken.
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${requests.refreshSession()}`, {
            method: "POST",
            headers: { Cookie: cookies().toString() },
        });

        const result = await response.json().catch(() => ({}));

        // Mirror the backend's Set-Cookie so the browser stores the new tokens
        const res = NextResponse.json(result, { status: response.status });
        const setCookie = response.headers.get("set-cookie");
        if (setCookie) res.headers.set("set-cookie", setCookie);
        return res;
    } catch (error) {
        console.error("refresh route failed", error);
        return NextResponse.json({ message: "Token refresh failed" }, { status: 500 });
    }
}
