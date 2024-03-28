'use client'
import { useSession } from "@supabase/auth-helpers-react";
import { CircleUserIcon } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { signOut } from "./actions";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


export const UserMenu = () => {
    const session = useSession()

    const handleSignOut = async () => {
        await signOut()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                    {session?.user?.user_metadata?.avatar_url ? (
                        <Avatar>
                            <AvatarImage src={session.user.user_metadata.avatar_url} alt={session.user.email} />
                            <AvatarFallback>{session.user.email?.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    ) : (
                        <CircleUserIcon className="h-5 w-5" />
                    )}
                    
                    <span className="sr-only">Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>{session?.user?.email}</DropdownMenuLabel>
                <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}