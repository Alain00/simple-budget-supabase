import { Button } from "@/components/ui/button"
import { SignUpForm } from "./form"
import Link from "next/link"


export default function SignUp() {
    return (
        <>
            <div className="absolute top-4 right-4">
                <Link href={'/auth/sign-in'}>
                    <Button variant='ghost'>
                        Sign in
                    </Button>
                </Link>
            </div>
            <div className="flex flex-col h-full items-center justify-center">
                <div className="w-[300px]">
                    <SignUpForm />
                </div>
            </div>
        </>
    )
}