'use server'

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { IncomeFormValues } from "./form"

export const handleAddIncome = async (values: IncomeFormValues) => {
    const supabase = createServerActionClient({cookies})

    let frequencyInHours = 0
    if (values.frequencyUnit === 'hour') frequencyInHours = values.frequency
    if (values.frequencyUnit === 'day') frequencyInHours = values.frequency * 8
    if (values.frequencyUnit === 'week') frequencyInHours = values.frequency * 40
    if (values.frequencyUnit === 'month') frequencyInHours = values.frequency * 160
    if (values.frequencyUnit === 'year') frequencyInHours = values.frequency * 1920

    const {data, error} = await supabase.from('incomes').insert({
        amount: values.amount,
        frequency_in_hours: frequencyInHours,
        description: values.description
    })

    if (error)
        console.error(error)

    // revalidateTag('incomes')
    revalidatePath('/dashboard/incomes')
    revalidatePath('/dashboard')
}

export const handleDeleteIncome = async (id: number) => {
    const supabase = createServerActionClient({cookies})

    const {error} = await supabase.from('incomes').delete().eq('id', id)
    if (error)
        console.error(error)
    // revalidateTag('incomes')
    revalidatePath('/dashboard/incomes')
    revalidatePath('/dashboard')
}