"use client";

import { useEffect, useState } from "react";
import { Eye, Users, Heart } from "lucide-react";
import requests from "@/Networking/Requests";
import { fetchClient } from "@/Networking/FetchInstanceClient";

const RANGES = ["7d", "30d", "90d"];

// Inline SVG sparkline — no chart lib. Plots one series over the range.
function Sparkline({ series }) {
    if (!series || series.length < 2) {
        return <div className="text-sm text-muted-foreground">Not enough data yet.</div>;
    }
    const w = 600, h = 80, pad = 4;
    const max = Math.max(...series.map((d) => d.views), 1);
    const step = (w - pad * 2) / (series.length - 1);
    const points = series
        .map((d, i) => `${pad + i * step},${h - pad - (d.views / max) * (h - pad * 2)}`)
        .join(" ");
    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-20" preserveAspectRatio="none">
            <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2"
                className="text-primary" vectorEffect="non-scaling-stroke" />
        </svg>
    );
}

function StatCard({ icon: Icon, label, value }) {
    return (
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
            <Icon className="h-5 w-5 text-primary" />
            <div>
                <div className="text-2xl font-bold">{value ?? 0}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
            </div>
        </div>
    );
}

export default function AnalyticsDashboard() {
    const [range, setRange] = useState("30d");
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;
        setError(null);
        fetchClient(requests.getAnalyticsSummary(range))
            .then((d) => { if (!cancelled) setData(d); })
            .catch((e) => { if (!cancelled) setError(e.message); });
        return () => { cancelled = true; };
    }, [range]);

    if (error) return <div className="p-4 text-sm text-destructive">Couldn’t load analytics: {error}</div>;
    if (!data) return <div className="p-4 text-sm text-muted-foreground">Loading analytics…</div>;

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Analytics</h2>
                <div className="flex gap-1 rounded-lg border border-border p-1">
                    {RANGES.map((r) => (
                        <button key={r} onClick={() => setRange(r)}
                            className={`px-3 py-1 text-sm rounded-md ${r === range ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
                            {r}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <StatCard icon={Eye} label="Views" value={data.totals.views} />
                <StatCard icon={Users} label="Unique visitors" value={data.totals.uniques} />
                <StatCard icon={Heart} label="Likes" value={data.totals.likes} />
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
                <div className="text-sm font-medium mb-2">Views over time</div>
                <Sparkline series={data.series} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-card p-4">
                    <div className="text-sm font-medium mb-3">Top projects</div>
                    {data.topProjects.length ? (
                        <ul className="flex flex-col gap-2">
                            {data.topProjects.map((p) => (
                                <li key={p.subject_id} className="flex justify-between text-sm">
                                    <span className="truncate">{p.title || p.subject_id}</span>
                                    <span className="text-muted-foreground">{p.views}</span>
                                </li>
                            ))}
                        </ul>
                    ) : <div className="text-sm text-muted-foreground">No project views yet.</div>}
                </div>

                <div className="rounded-xl border border-border bg-card p-4">
                    <div className="text-sm font-medium mb-3">Top referrers</div>
                    {data.topReferrers.length ? (
                        <ul className="flex flex-col gap-2">
                            {data.topReferrers.map((r) => (
                                <li key={r.domain} className="flex justify-between text-sm">
                                    <span className="truncate">{r.domain}</span>
                                    <span className="text-muted-foreground">{r.count}</span>
                                </li>
                            ))}
                        </ul>
                    ) : <div className="text-sm text-muted-foreground">No referrers yet.</div>}
                </div>
            </div>
        </div>
    );
}
