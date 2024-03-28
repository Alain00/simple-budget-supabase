'use client'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signUp } from "./actions"
import { redirect } from "next/navigation"


const signUpFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    repeatPassword: z.string().min(6),
})

const signUpFormResolver = zodResolver(signUpFormSchema)
export type SignUpFormValues = z.infer<typeof signUpFormSchema>

export const SignUpForm = () => {
    const form = useForm<SignUpFormValues>({
        resolver: signUpFormResolver,
        defaultValues: {
            email: "",
            password: "",
            repeatPassword: "",
        },
    })

    const handleSubmit = async (values: SignUpFormValues) => {
        const response = await signUp(values)
        form.reset()
        return redirect("/auth/sign-in")
    }

    return (
        <Form {...form}>
            <div className="text-center mb-4">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-sm text-muted-foreground">Enter your email below to create your account</p>
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
                            <Input type="password" autoComplete="new-password" placeholder="Password" {...field} />
                        </FormControl>
                    </FormItem>
                )} />

                <FormField name="repeatPassword" render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input type="password" placeholder="Repeat password" {...field} />
                        </FormControl>
                    </FormItem>
                )} />

                <Button type="submit" className="w-full">
                    Sign up
                </Button>
            </form>
        </Form>
    )
}