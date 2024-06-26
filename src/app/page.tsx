import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Page() {
  const supabase = createServerComponentClient({cookies})

  const {data} = await supabase.auth.getSession()

  if (data.session?.user) {
    return redirect("/dashboard")
  } 

  return redirect("/auth/sign-in")
}