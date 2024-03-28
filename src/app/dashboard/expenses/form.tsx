'use client'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

export interface ExpenseFormProps {
    onSubmit?: (values: ExpenseFormValues) => Promise<void>
}

const formSchema = z.object({
    amount: z.coerce.number().positive({ message: 'Amount must be a positive number'}),
    frequency: z.coerce.number().positive({ message: 'Frequency must be a positive number' }),
    frequencyUnit: z.enum(['hour', 'day', 'week', 'month', 'year']),
    description: z.string().optional()
})

export type ExpenseFormValues = z.infer<typeof formSchema>

export const ExpenseForm = ({
    onSubmit
}: ExpenseFormProps) => {
    const [loading, setLoading] = useState(false)

    const form = useForm<ExpenseFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: 0,
            frequency: 1,
            frequencyUnit: 'month'
        }
    })

    const handleSubmit = async (values: ExpenseFormValues) => {
        setLoading(true)
        await onSubmit?.(values)
        form.reset()
        setLoading(false)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField name="amount" render={({field}) => (
                    <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                            <Input type="number" {...field} />
                        </FormControl>
                        <FormDescription>
                            How much you expent
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />

                <div className="grid grid-cols-2 space-x-4">
                    <FormField name="frequency" render={({field}) => (
                        <FormItem>
                            <FormLabel>Frequency</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField name="frequencyUnit" render={({field}) => (
                        <FormItem>
                            <FormLabel>Frequency Unit</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Hours" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="hour">Hours</SelectItem>
                                        <SelectItem value="day">Days</SelectItem>
                                        <SelectItem value="week">Weeks</SelectItem>
                                        <SelectItem value="month">Months</SelectItem>
                                        <SelectItem value="year">Years</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>

                <FormField name="description" render={({field}) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea {...field} />
                        </FormControl>
                        <FormDescription>
                            A short description of the expense
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />


                <div className="flex justify-end">
                    <Button type="submit" disabled={loading}>
                        {loading && <ReloadIcon className="animate-spin mr-2 h-4 w-4" />}
                        Add Expense
                    </Button>
                </div>
            </form>
        </Form>
    )
}