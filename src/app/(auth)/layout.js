export default function Layout({ children }) {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
            <div className="pointer-events-none absolute -top-1/4 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-[28rem] w-[28rem] translate-x-1/3 translate-y-1/3 rounded-full bg-primary/10 blur-[100px]" />
            <div className="relative z-10 w-full max-w-md animate-fade-up">
                {children}
            </div>
        </div>
    )
}
