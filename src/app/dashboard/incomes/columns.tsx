"use client"
import { ColumnDef, Table } from "@tanstack/react-table";
import { Tables } from "../../../../database.types";
import dayjs from "dayjs";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon, TrashIcon } from "lucide-react";
import { handleDeleteIncome } from "./actions";
import { formatFrequency } from "@/lib/utils";


export const columns: ColumnDef<Tables<'incomes'>>[] = [
    {
        accessorKey: 'id',
        header: '#',
    },
    {
        accessorKey: 'amount',
        header: () => <div className="text-right">Amount</div>,
        
        cell: ({row}) => {
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(row.getValue('amount'))

            return (
                <div className="text-right font-medium">
                    USD {formatted}
                </div>
            )
        }
    },
    {
        accessorKey: 'frequency_in_hours',
        header: 'Frequency',
        cell: ({row}) => {
            const frequency = row.getValue<number>('frequency_in_hours')
            const formatted = formatFrequency(frequency)

            return (
                <div>
                    <Badge variant={'outline'}>{formatted}</Badge>
                </div>
            )
        }
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({row}) => {
            const description = row.getValue<string>('description')
            return (
                <div>
                    {description}
                </div>
            )
        }
    },
    {
        accessorKey: 'created_at',
        header: 'Created At',
        cell: ({row}) => {
            const date = dayjs(row.getValue('created_at')).format('MMM D, YYYY h:mm A')
            return (
                <div suppressHydrationWarning>
                    {date}
                </div>
            )
        }
    },
    {
        id: 'actions',
        cell: ({row}) => {
            const income = row.original

            return (
                <div className="justify-end flex">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontalIcon className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleDeleteIncome(income.id)} >
                                <TrashIcon className="h-4 w-4 mr-2" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        }
    }
]