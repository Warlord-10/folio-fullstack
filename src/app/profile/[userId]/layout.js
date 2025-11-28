export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="font-mono text-white bg-zinc-950 grow flex">
        {children}
      </div>
    </div>
  )
}