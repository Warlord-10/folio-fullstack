import requests from "@/Networking/Requests";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${requests.refreshSession()}`, {
            method: "POST",
            credentials: "include",
        });

        const result = await response.json();
        return NextResponse.json(result);
    } catch (error) {
        console.log("error", error)
    }
}