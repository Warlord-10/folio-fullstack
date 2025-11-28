export default function Layout({ children }) {
  return (
    <>
      <div className="font-mono text-white min-h-screen bg-zinc-950">
        {children}
      </div>
    </>
  )
}