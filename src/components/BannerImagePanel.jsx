import Image from 'next/image'

function BannerImagePanel({ url }) {
  if (!url) return null;
  return (
    <div className="flex w-full items-center justify-center rounded-lg border-2 border-primary/60 bg-card">
      <Image className="h-auto w-1/2 rounded-md shadow-lg" src={url} alt="banner" width={1200} height={630} />
    </div>
  )
}

export default BannerImagePanel
