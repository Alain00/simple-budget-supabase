'use client'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusIcon } from "lucide-react"
import { IncomeForm, IncomeFormProps, IncomeFormValues } from "./form"
import { useState } from "react"

export interface AddIncomeButtonProps extends IncomeFormProps {

}

export const AddIncomeButton = ({
    ...formProps
}: AddIncomeButtonProps) => {
    const [open, setOpen] = useState(false)

    const handleSubmit = async (values: IncomeFormValues) => {
        await formProps.onSubmit?.(values)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Income
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Add Income
                    </DialogTitle>
                    <DialogDescription>
                        Add a new income to your account
                    </DialogDescription>
                </DialogHeader>

                <IncomeForm {...formProps} onSubmit={handleSubmit} />
            </DialogContent>
        </Dialog>
    )
}