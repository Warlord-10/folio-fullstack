import './auth.css';

export default function Layout({ children }) {
    return (
        <div className="auth-layout loginScreen flex justify-center items-center h-screen bg-gradient-to-br from-purple-950 via-black to-purple-950 relative overflow-hidden">
            <div className="animated-background"></div>
            <div className="content-wrapper relative z-10">
                {children}
            </div>
        </div>
    )
}