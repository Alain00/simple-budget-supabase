import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
    const supabase = createRouteHandlerClient({cookies})

    const url = new URL(request.url)
    const code = url.searchParams.get('code')

    if (code) {
        try {
            const { data, error } = await supabase.auth.exchangeCodeForSession(code)

            console.log('data', data)
            if (error) {
                console.error(error)
                return NextResponse.redirect('/auth/sign-in')
            }
            return NextResponse.redirect(`${url.origin}/dashboard`)
        } catch (error) {
            console.error('catch', error)
            return NextResponse.redirect('/auth/sign-in')
        }
    } else {
        return NextResponse.redirect('/auth/sign-in')
    }
}