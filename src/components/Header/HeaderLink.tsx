'use client'
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

export interface HeaderLinkProps {
    children: React.ReactNode
    href: string
    icon?: React.ReactNode,
    active?: boolean
}

export const HeaderLink = ({
    href,
    icon,
    active,
    children
}: HeaderLinkProps) => {
    const pathname = usePathname()

    const isActive = pathname === href ?? active

    return (
        <Link
            href={href}
            className={cn(
                "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                {
                    "bg-muted text-foreground": isActive
                }
            )}
        >
            {icon}
            {children}
        </Link>
    )
}