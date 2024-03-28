'use client'
import { useSession } from "@supabase/auth-helpers-react"
import { Bell, Home, Package2, TrendingDown, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import { AsideLink } from "./AsideLink"


export const Aside = () => {
  const session = useSession()

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">{session?.user.user_metadata['name']}</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <AsideLink href="/dashboard" icon={<Home className="h-4 w-4" />}>
              Dashboard
            </AsideLink>
            <AsideLink href="/dashboard/incomes" icon={<TrendingUp className="h-4 w-4" />}>
              Incomes
            </AsideLink>
            <AsideLink href="/dashboard/expenses" icon={<TrendingDown className="h-4 w-4" />}>
              Expenses
            </AsideLink>
          </nav>
        </div>
      </div>
    </div>
  )
}