'use server'

import { createRouteHandlerClient, createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import { SignInFormValues } from "./form";

export async function signIn(values: SignInFormValues) {
    const cookieStore = cookies()
    const supabase = createServerActionClient({cookies: () => cookieStore})
    const {data, error} = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
    })

    if (error) {
        console.error(error)
    }

    redirect('/dashboard', RedirectType.replace)
}