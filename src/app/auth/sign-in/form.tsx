'use client'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Database } from "../../../../database.types"
import { signIn } from "./actions"


const signInFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

const signInFormResolver = zodResolver(signInFormSchema)
export type SignInFormValues = z.infer<typeof signInFormSchema>

export const LoginForm = () => {
    const [loading, setLoading] = useState(false)
    const supabase = createClientComponentClient<Database>()

    const form = useForm<SignInFormValues>({
        resolver: signInFormResolver,
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const handleSubmit = async (values: SignInFormValues) => {
        setLoading(true)
        const data = await signIn(values)
        setLoading(false)
    }

    const handleSignInWithGithub = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: "http://localhost:3000/auth/callback",
            }
        })

        if (error) {
            console.error(error)
            return
        }
    }

    const handleSignInWithGoogle = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: "http://localhost:3000/auth/callback",
            }
        })

        if (error) {
            console.error(error)
            return
        }
    }

    return (
        <Form {...form}>
            <div className="text-center mb-4">
                <h1 className="text-2xl font-bold">Welcome back!</h1>
                <p className="text-sm text-muted-foreground">Sign in to your account</p>
            </div>

            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
                <FormField name="email" render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input type="email" placeholder="name@example.com" {...field} />
                        </FormControl>
                    </FormItem>
                )} />

                <FormField name="password" render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input type="password" placeholder="Password" {...field} />
                        </FormControl>
                    </FormItem>
                )} />

                <Button type="submit" className="w-full" disabled={loading}>
                    Sign in
                </Button>

                <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>

                <Button type='button' className="w-full" variant="outline" onClick={handleSignInWithGoogle}>
                    Google
                </Button>
                <Button type='button' className="w-full" variant="outline" onClick={handleSignInWithGithub}>
                    Github
                </Button>
            </form>
        </Form>
    )
}