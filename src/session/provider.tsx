'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Session, SessionContextProvider } from "@supabase/auth-helpers-react"
import { ReactNode } from "react"


export const SessionProvider = ({children, initialSession}: {children: ReactNode, initialSession: Session}) => {
    const supabase = createClientComponentClient()

    return (
        <SessionContextProvider
                    initialSession={initialSession}
                    supabaseClient={supabase}
                >
                    {children}
        </SessionContextProvider>
    )
}