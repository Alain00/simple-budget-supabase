import { formatCurrency } from "@/lib/utils"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { DollarSignIcon } from "lucide-react"
import { cookies } from "next/headers"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"


export const ExpensesBlocks = async () => {
    const supabase = createServerComponentClient({cookies})

    const {data: chartDataArray} = await supabase
        .from('expenses_rates')
        .select('*')

    const chartData = chartDataArray?.[0]

    return (
        <div className="grid lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Per hour
                        </CardTitle>
                        <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{formatCurrency(chartData?.perhour)}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Per day
                        </CardTitle>
                        <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{formatCurrency(chartData?.perday)}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Per week
                        </CardTitle>
                        <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{formatCurrency(chartData?.perweek)}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Per month
                        </CardTitle>
                        <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{formatCurrency(chartData?.permonth)}</p>
                    </CardContent>
                </Card>
            </div>
    )
}