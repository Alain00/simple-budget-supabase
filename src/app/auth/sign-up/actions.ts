'use server'

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { SignUpFormValues } from "./form";


export async function signUp(values: SignUpFormValues) {
    const supabase = createServerActionClient({cookies})
    const {data, error} = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
    })

    console.error(error)

    return data
}