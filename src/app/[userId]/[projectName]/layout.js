import { Toaster } from 'sonner';

export default function Layout({ children }) {
  return (
    <>
      <div className="font-mono text-white min-h-screen bg-zinc-950">
        {children}
      </div>
      <Toaster richColors duration={1500} />
    </>
  )
}