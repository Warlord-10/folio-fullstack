"use client"
import React, { useState } from 'react'
import { Heart, ExternalLink } from "lucide-react"
import Image from 'next/image'
import requests from "@/Networking/Requests";
import Link from 'next/link';
import { fetchClient } from "@/Networking/FetchInstanceClient";

function PortfolioCard({ id, username, isLiked, totalLikes }) {
  const [like, setLike] = useState(isLiked)
  const [likeCount, setLikeCount] = useState(totalLikes)


  const toggleLike = async () => {
    if (like) {
      const res = await fetchClient(requests.removePortfolioLike(id), {
        method: "DELETE",
      })
      setLike(false)
      setLikeCount(res.data.totalLikes)
    }
    else {
      const res = await fetchClient(requests.addPortfolioLike(id), {
        method: "POST",
      })
      setLike(true)
      setLikeCount(res.data.totalLikes)
    }
  }

  return (
    <div className="group w-full overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-lg transition-all duration-300 hover:border-primary/40 hover:shadow-primary/10">
      <div className="flex h-[400px] flex-col md:flex-row">
        <div className="relative h-48 w-full bg-white md:h-auto md:w-3/4">
          <iframe
            src={requests.projectBundles(`${id}/index.html`)}
            title={`${username}'s portfolio preview`}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <div className="flex w-full flex-col justify-between gap-6 p-6 md:w-1/4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-primary">
              <Image src={requests.publicFiles(`${id}/avatar.jpeg`)} alt={username} width={64} height={64} className="h-full w-full object-cover" />
            </div>
            <Link href={`/profile/${id}`} className="text-xl font-bold transition-colors hover:text-primary">{username}</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/portfolio/${id}`}
              target="_blank"
              className="flex flex-1 items-center justify-between gap-2 rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <span>View Portfolio</span>
              <ExternalLink size={18} />
            </Link>
            <button
              onClick={toggleLike}
              aria-label={like ? "Unlike" : "Like"}
              className="flex flex-col items-center rounded-md px-2 py-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Heart className='transition-transform duration-200 hover:scale-125' fill={like ? 'hsl(var(--destructive))' : 'none'} stroke={like ? 'hsl(var(--destructive))' : 'currentColor'} />
              <span className="text-sm">{likeCount}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioCard