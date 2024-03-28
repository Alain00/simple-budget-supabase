'use server'

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { ExpenseFormValues } from "./form"

export const handleAddExpense = async (values: ExpenseFormValues) => {
    const supabase = createServerActionClient({cookies})

    let frequencyInHours = 0
    if (values.frequencyUnit === 'hour') frequencyInHours = values.frequency
    if (values.frequencyUnit === 'day') frequencyInHours = values.frequency * 8
    if (values.frequencyUnit === 'week') frequencyInHours = values.frequency * 40
    if (values.frequencyUnit === 'month') frequencyInHours = values.frequency * 160
    if (values.frequencyUnit === 'year') frequencyInHours = values.frequency * 1920

    const {data, error} = await supabase.from('expenses').insert({
        amount: values.amount,
        frequency_in_hours: frequencyInHours,
        description: values.description
    })

    if (error)
        console.error(error)

    revalidatePath('/dashboard/expenses')
    revalidatePath('/dashboard')
}

export const handleDeleteExpense = async (id: number) => {
    const supabase = createServerActionClient({cookies})

    const {error} = await supabase.from('expenses').delete().eq('id', id)
    if (error)
        console.error(error)
    // revalidateTag('expenses')
    revalidatePath('/dashboard/expenses')
    revalidatePath('/dashboard')
}