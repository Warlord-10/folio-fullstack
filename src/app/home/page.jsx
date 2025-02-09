import React from 'react'
import axios from "@/Networking/Axios";
import requests from "@/Networking/Requests";
import PortfolioCard from '@/components/PortfolioCard';
import { cookies } from 'next/headers'


async function Page() {
  const cookieStore = cookies()

  const res = await axios.get(requests.fetchPortfolios_v2(), {
    headers: {
      Cookie: cookieStore.toString()
    }
  })

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Featured Portfolios</h1>
      <div className="max-w-7xl mx-auto space-y-8">
        {res.data.data.map((portfolio, index) => (
          <PortfolioCard key={index} id={portfolio._id} username={portfolio.owner_name} isLiked={portfolio.isLiked} totalLikes ={portfolio.likes} />
        ))}
      </div>
    </div>
  )
}

export default Page