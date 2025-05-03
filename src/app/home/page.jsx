import React from 'react'
import requests from "@/Networking/Requests";
import PortfolioCard from '@/components/PortfolioCard';
import { cookies } from 'next/headers'
import { fetchClient } from '@/Networking/FetchInstance';


async function Page() {
  try {
    const cookieStore = cookies()
    const head = {
      Cookie: cookieStore.toString(),
    }

    const res = await fetchClient(requests.fetchPortfolios_v2(), {
      headers: head,
      next: { revalidate: 60 },
      credentials: 'include',
    })

  
    return (
      <div className="min-h-screen bg-zinc-950 text-white p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Featured Portfolios</h1>
        <div className="max-w-7xl mx-auto space-y-8">
          {res.data.map((portfolio, index) => (
            <PortfolioCard key={index} id={portfolio._id} username={portfolio.owner_name} isLiked={portfolio.isLiked} totalLikes ={portfolio.likes} />
          ))}
        </div>
      </div>
    )
  } catch (error) {
    console.error(error)
    return <div>Error loading portfolios</div>
  }
}

export default Page