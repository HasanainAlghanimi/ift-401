// app/api/deposit/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'

export async function POST(req: NextRequest) {
  try {
    const { account_id, amount } = await req.json()

    if (!account_id || typeof amount !== 'number') {
      return NextResponse.json({ error: 'account_id and numeric amount are required' }, { status: 400 })
    }

    const { data, error } = await supabaseServer.rpc('deposit_funds', {
      p_account_id: account_id,
      p_amount: amount,
    })

    if (error) {
      console.error('deposit_funds error:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ new_balance: data }, { status: 200 })
  } catch (err) {
    console.error('Deposit API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
