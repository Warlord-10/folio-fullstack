// Skeleton mirrors the PortfolioCard layout so the feed streams in cleanly
export default function Loading() {
  return (
    <main className="min-h-screen px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col items-center gap-3">
          <div className="shimmer h-10 w-72 rounded-lg" />
          <div className="shimmer h-4 w-96 max-w-full rounded" />
        </div>
        <div className="space-y-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex h-[400px] flex-col overflow-hidden rounded-2xl border border-border md:flex-row">
              <div className="shimmer h-48 w-full md:h-auto md:w-3/4" />
              <div className="flex w-full flex-col justify-between gap-6 p-6 md:w-1/4">
                <div className="flex items-center gap-4">
                  <div className="shimmer h-16 w-16 shrink-0 rounded-full" />
                  <div className="shimmer h-5 w-24 rounded" />
                </div>
                <div className="shimmer h-10 w-full rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
