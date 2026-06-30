export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex grow bg-background text-foreground">
        {children}
      </div>
    </div>
  )
}