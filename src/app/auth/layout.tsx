import { ReactNode } from "react";


export default async function AuthLayout({children}: {children: ReactNode}) {
    return (
        <div className="grid grid-cols-2 min-h-screen">
            <div className="bg-zinc-900">
            
            </div>
            <div className="min-h-screen relative">
                {children}
            </div>
        </div>
    )
}