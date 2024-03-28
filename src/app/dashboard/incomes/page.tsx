import { IncomesBlocks } from "@/components/IncomesBlocks/IncomesBlocks";
import { DataTable } from "@/components/ui/data-table";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { handleAddIncome } from "./actions";
import { AddIncomeButton } from "./add-button";
import { columns } from "./columns";

export default async function Page() {
    const supabase = createServerComponentClient({cookies})
    
    const {data, error} = await supabase
        .from('incomes')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl flex items-center">
                    Incomes
                </h1>
                <div>
                    <AddIncomeButton onSubmit={handleAddIncome} />
                </div>
            </div>

            <IncomesBlocks />

            {(data?.length ?? 0) > 0 ? (
                <DataTable columns={columns} data={data} />
            ) : (
                <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h3 className="text-2xl font-bold tracking-tight">
                            You have no incomes
                        </h3>
                        <p className="text-muted-foreground text-sm">
                            Add your first income to get started
                        </p>
                    </div>
                </div>
            )}

        </>
    )
}