'use server'
import { Aside } from "@/components/Aside/Aside";
import { Header } from "@/components/Header/Header";
import { SessionProvider } from "@/session/provider";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";


export default async function DashboardLayout({ children }: { children: ReactNode }) {
    const supabase = createServerComponentClient({cookies})
    const {data: session} = await supabase.auth.getSession()

    if (!session.session?.user) {
        return redirect("/auth/sign-in")
    }

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <SessionProvider
                initialSession={session.session}
            >
                <Aside />
                <div className="flex flex-col">
                    <Header />
                    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                        {children}
                    </main>
                </div>
            </SessionProvider>
        </div>
    )
}