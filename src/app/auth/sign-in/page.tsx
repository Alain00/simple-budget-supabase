import { Button } from "@/components/ui/button";
import { LoginForm } from "./form";
import Link from "next/link";


export default function SignUp() {
    return (
        <>
            <div className="absolute top-4 right-4">
                <Link href="/auth/sign-up">
                    <Button variant='ghost'>
                        Sign up
                    </Button>
                </Link>
            </div>
            <div className="flex flex-col h-full items-center justify-center">
                <div className="w-[300px]">
                    <LoginForm />
                </div>
            </div>
        </>
    )
}