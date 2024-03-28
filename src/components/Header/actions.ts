'use server'

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function signOut() {
    const supabase = createServerActionClient({ cookies })
    await supabase.auth.signOut();
    redirect("/auth/sign-in")
}