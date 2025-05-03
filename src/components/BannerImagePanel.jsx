import React from 'react'

function BannerImagePanel({url}) {
  return (
    <div className="w-full flex items-center justify-center bg-gray-900 border-2 border-purple-600 rounded-lg">
        <img className="w-1/2 aspect-auto font-mono bg-gray-900 shadow-lg" src={url|| "#"} alt="banner" />
    </div>
  )
}

export default BannerImagePanel