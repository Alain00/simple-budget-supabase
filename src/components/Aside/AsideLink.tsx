'use client'
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

export interface AsideLinkProps {
    children: React.ReactNode 
    href: string
    icon?: React.ReactNode,
    active?: boolean
}

export const AsideLink = ({
    href,
    icon,
    active,
    children
}: AsideLinkProps) => {
    const pathname = usePathname()

    const isActive = pathname === href ?? active

    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                {
                    "bg-muted": isActive
                }
            )}
        >
            {icon}
            {children}
        </Link>
    )
}