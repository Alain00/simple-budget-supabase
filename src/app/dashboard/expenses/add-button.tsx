'use client'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusIcon } from "lucide-react"
import { ExpenseForm, ExpenseFormProps, ExpenseFormValues } from "./form"
import { useState } from "react"

export interface AddExpenseButtonProps extends ExpenseFormProps {

}

export const AddExpenseButton = ({
    ...formProps
}: AddExpenseButtonProps) => {
    const [open, setOpen] = useState(false)

    const handleSubmit = async (values: ExpenseFormValues) => {
        await formProps.onSubmit?.(values)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Expense
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Add Expense
                    </DialogTitle>
                    <DialogDescription>
                        Add a new expense to your account
                    </DialogDescription>
                </DialogHeader>

                <ExpenseForm {...formProps} onSubmit={handleSubmit} />
            </DialogContent>
        </Dialog>
    )
}