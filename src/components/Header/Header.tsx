'use client'
import { useSession } from "@supabase/auth-helpers-react"
import { Home, LineChart, Menu, Package2, Search, TrendingDownIcon, TrendingUpIcon, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { UserMenu } from "./UserMenu"
import { HeaderLink } from "./HeaderLink"


export const Header = () => {
  const session = useSession()

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">{session?.user.email}</span>
            </Link>
            <HeaderLink href="/dashboard" icon={<Home className="h-5 w-5" />}>Dashboard</HeaderLink>
            
            <HeaderLink href="/dashboard/incomes" icon={<TrendingUpIcon className="h-5 w-5" />}>Incomes</HeaderLink>
            <HeaderLink href="/dashboard/expenses" icon={<TrendingDownIcon className="h-5 w-5" />}>Expenses</HeaderLink>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
       
      </div>
      <UserMenu />
    </header>
  )
}