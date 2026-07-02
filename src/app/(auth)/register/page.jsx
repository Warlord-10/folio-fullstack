"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import useAuthStore from '@/Stores/authStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function Page() {
    const router = useRouter();
    const [apiResponse, setApiResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const userData = useAuthStore((s) => s.userData);
    if (userData) {
        router.push("/profile/" + userData._id);
    }

    const registerFunction = useAuthStore((state) => state.register);

    const validateInputs = (name, email, password) => {
        if (!name || !email || !password) {
            throw new Error("All fields are required");
        }
        if (name.trim().length < 2) {
            throw new Error("Name must be at least 2 characters long");
        }
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            throw new Error("Please enter a valid email address");
        }
    };

    const signUpFunction = async (e) => {
        setIsLoading(true);
        setApiResponse(null);
        try {
            const name = e.get("name")?.trim();
            const email = e.get("email")?.trim();
            const password = e.get("password")?.trim();

            validateInputs(name, email, password);

            const response = await registerFunction({ name, email, password });

            setApiResponse({ type: "success", message: response.message || "Successfully registered!" });
            router.push(`/profile/${response.user._id}`);
            router.refresh(); // re-render the server-side Navbar with the new cookie
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || "Something went wrong, please try again!";
            setApiResponse({ type: "error", message: errorMessage });
            setTimeout(() => setApiResponse(null), 3000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form action={signUpFunction} className='flex w-full flex-col gap-5 rounded-2xl border border-border bg-card/80 p-8 shadow-2xl backdrop-blur-xl'>
            <div className='flex flex-col gap-1'>
                <h1 className='text-2xl font-bold tracking-tight'>Create your account</h1>
                <p className='text-sm text-muted-foreground'>Start building and sharing your portfolio.</p>
            </div>

            <div className='flex flex-col gap-1.5'>
                <label htmlFor="name" className='text-sm font-medium text-muted-foreground'>Full name</label>
                <Input id="name" type='text' name='name' placeholder='Jane Doe' required disabled={isLoading} autoComplete="name" />
            </div>

            <div className='flex flex-col gap-1.5'>
                <label htmlFor="email" className='text-sm font-medium text-muted-foreground'>Email</label>
                <Input id="email" type='email' name='email' placeholder='you@example.com' required disabled={isLoading} autoComplete="email" />
            </div>

            <div className='flex flex-col gap-1.5'>
                <label htmlFor="password" className='text-sm font-medium text-muted-foreground'>Password</label>
                <Input id="password" type='password' name='password' placeholder='••••••••' required disabled={isLoading} autoComplete="new-password" />
            </div>

            {apiResponse && (
                <p className={`text-center text-sm ${apiResponse.type === "error" ? "text-destructive" : "text-success"}`}>
                    {apiResponse.message}
                </p>
            )}

            <Button type="submit" disabled={isLoading} className='h-11 w-full text-base'>
                {isLoading ? <><Loader2 className='animate-spin' /> Creating account…</> : "Sign up"}
            </Button>

            <p className='text-center text-sm text-muted-foreground'>
                Have an account?{' '}
                <Link className='font-medium text-primary hover:underline' href="./login">Sign in</Link>
            </p>
        </form>
    );
}
