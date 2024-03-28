import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import dayjs from "dayjs";
import { cookies } from "next/headers";
import Link from "next/link";


export default async function Page() {
    const supabase = createServerComponentClient({cookies})

    const {data} = await supabase.from('dashboard')
        .select('*')
        .limit(1)

    const dashboard = data?.[0]

    return (
        <>
            <div className="grid lg:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="space-y-1 flex">
                        <CardTitle>
                            Net Income <Badge variant='outline'>{dayjs().format("MMMM")}</Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">
                            {formatCurrency(dashboard?.net_income)}
                        </p>
                    </CardContent>
                </Card>
                <Link href={'/dashboard/incomes'}>
                    <Card className="hover:bg-zinc-900">
                        <CardHeader className="space-y-1 flex">
                            <CardTitle>
                                Incomes <Badge variant='outline'>{dayjs().format("MMMM")}</Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">
                                {formatCurrency(dashboard?.total_income)}
                            </p>
                        </CardContent>
                    </Card>
                </Link>
                <Link href={'/dashboard/expenses'}>
                    <Card className="hover:bg-zinc-900">
                        <CardHeader className="space-y-1 flex">
                            <CardTitle>
                                Expenses <Badge variant='outline'>{dayjs().format("MMMM")}</Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">
                                {formatCurrency(dashboard?.total_expense)}
                            </p>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </>
    )
}