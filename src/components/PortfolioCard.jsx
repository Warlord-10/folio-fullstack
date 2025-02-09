"use client"
import React, {useState} from 'react'
import { Heart, ExternalLink } from "lucide-react"
import axios from "@/Networking/Axios";
import requests from "@/Networking/Requests";
import Link from 'next/link';

function PortfolioCard({ id, username, isLiked, totalLikes }) {
    const [like, setLike] = useState(isLiked)
    const [likeCount, setLikeCount] = useState(totalLikes)


    const toggleLike = async () => {
        if (like) {
            const res = await axios.delete(requests.removePortfolioLike(id))
            setLike(false)
            setLikeCount(res.data.totalLikes)
        }
        else{
            const res = await axios.post(requests.addPortfolioLike(id))
            setLike(true)
            setLikeCount(res.data.totalLikes)
        }
    }

  return (
    <div className="w-full overflow-hidden bg-gray-900 text-white rounded-lg shadow-lg">
      <div className="flex h-[400px]">
        <div className="w-3/4 relative bg-white">
          <iframe src={requests.projectBundles(`${id}/index.html`)} className="absolute inset-0 w-full h-full border-0" />
          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-all duration-300">
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        </div>
        <div className="w-1/4 flex flex-col justify-between p-6">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-primary">
              <img src={requests.publicFiles(`${id}/avatar.jpeg`)} alt={username} width={64} height={64} />
            </div>
            <div>
              <Link href={`/profile/${id}`} className="text-xl font-bold hover:text-blue-500">{username}</Link>
              {/* <p className="text-sm text-gray-400">Portfolio Showcase</p> */}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href={`/portfolio/${id}`} className="w-full bg-white text-gray-900 py-2 px-4 rounded-md font-semibold hover:bg-gray-300 transition-colors flex justify-between items-center" target="_blank">
              <h1>View Full Portfolio</h1>
              <ExternalLink />
            </Link>
            <button onClick={toggleLike}>
              <Heart className='hover:scale-125 transition-transform duration-200' fill={like ? 'red' : 'none'} />
              <h1>{likeCount}</h1>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioCard