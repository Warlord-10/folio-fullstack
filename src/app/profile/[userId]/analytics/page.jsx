"use client";

import useAuthStore from "@/Stores/authStore";
import AnalyticsDashboard from "@/components/Analytics/AnalyticsDashboard";

// Owner-only: the summary API scopes to the token's user, so only render for the
// profile owner. Everyone else (or logged-out) gets a not-authorized message.
export default function Page({ params }) {
    const userData = useAuthStore((s) => s.userData);

    if (!userData || userData._id !== params.userId) {
        return <div className="p-6 text-sm text-muted-foreground">You can only view your own analytics.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <AnalyticsDashboard />
        </div>
    );
}
