// app/api/account/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';

export async function POST(req: NextRequest) {
  try {
    const { email, name, accountType } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'email is required' },
        { status: 400 }
      );
    }

    // Map front-end accountType to your existing user_type values
    const userType = accountType === 'admin' ? 'Admin' : 'Customer';

    // Split "Full name" best-effort into first/last
    let firstName: string | null = null;
    let lastName: string | null = null;
    if (name && name.trim()) {
      const parts = name.trim().split(' ');
      firstName = parts[0] ?? null;
      lastName = parts.slice(1).join(' ') || null;
    }

    const username = email.split('@')[0];

    // 1) Upsert into public.users by email (this part is working for you)
    const { data: userRow, error: userError } = await supabaseServer
      .from('users')
      .upsert(
        {
          email,
          username,
          password: 'supabase_auth',
          first_name: firstName,
          last_name: lastName,
          user_type: userType,
        },
        { onConflict: 'email' }
      )
      .select('user_id, user_type')
      .single();

    if (userError) {
      console.error('Create users row error:', userError);
      return NextResponse.json(
        { error: userError.message },
        { status: 400 }
      );
    }

    const userIdInt = userRow.user_id as number;

    // Generate a simple account number like ACC000011
    const accountNumber = `ACC${String(userIdInt).padStart(6, '0')}`;

    // 2) INSERT into public.account (no onConflict)
    const { data: accountRow, error: accountError } = await supabaseServer
      .from('account')
      .insert({
        user_id: userIdInt,
        account_number: accountNumber,
        balance: 0,
        available_balance: 0,
        pending_deposits: 0,
        pending_withdrawals: 0,
      })
      .select('account_id, user_id, balance, available_balance')
      .single();

    if (accountError) {
      console.error('Create account row error:', accountError);
      return NextResponse.json(
        { error: accountError.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { user: userRow, account: accountRow },
      { status: 200 }
    );
  } catch (err) {
    console.error('Create account API error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
