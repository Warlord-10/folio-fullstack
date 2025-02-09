import Navbar from "@/components/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="font-mono text-white min-h-screen bg-zinc-950">
        {children}
      </div>
    </>   
  )
}