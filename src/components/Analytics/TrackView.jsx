"use client";

import { useEffect } from "react";
import requests from "@/Networking/Requests";

// Fires a single view beacon on mount. Rendered by server pages so they stay SSR.
// sendBeacon is fire-and-forget: it never blocks the page and survives navigation.
export default function TrackView({ type, id }) {
    useEffect(() => {
        if (!id || typeof navigator === "undefined" || !navigator.sendBeacon) return;

        // Domain only, and drop our own origin so internal nav isn't counted as a referrer.
        let referrer = null;
        try {
            const host = new URL(document.referrer).hostname;
            if (host && host !== location.hostname) referrer = host;
        } catch { /* no / opaque referrer */ }

        const payload = JSON.stringify({ type, subject_id: id, referrer });
        navigator.sendBeacon(
            `${process.env.NEXT_PUBLIC_API_URL}${requests.analyticsCollect()}`,
            new Blob([payload], { type: "application/json" })
        );
    }, [type, id]);

    return null;
}
