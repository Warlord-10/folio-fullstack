import React from 'react'
import requests from "@/Networking/Requests";
import PortfolioCard from '@/components/PortfolioCard';
import { fetchServer } from '@/Networking/FetchInstanceServer';


export const metadata = {
  title: "Discover Portfolios",
  description: "Browse featured developer portfolios and live project previews on Folio.",
};

async function Page() {
  // Let failures bubble to error.jsx instead of swallowing into a bare div
  const res = await fetchServer(requests.fetchPortfolios_v2(), {
    method: 'GET',
    cache: "no-store"
  })

  return (
    <main className="min-h-screen px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 text-center animate-fade-up">
          <h1 className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            Featured Portfolios
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Explore work from developers across the community — live previews, one click away.
          </p>
        </header>

        {res.data?.length ? (
          <div className="space-y-8">
            {res.data.map((portfolio, index) => (
              <div key={portfolio._id} className="animate-fade-up" style={{ animationDelay: `${index * 60}ms` }}>
                <PortfolioCard id={portfolio._id} username={portfolio.owner_name} isLiked={portfolio.isLiked} totalLikes={portfolio.likes} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No portfolios to show yet.</p>
        )}
      </div>
    </main>
  )
}

export default Page