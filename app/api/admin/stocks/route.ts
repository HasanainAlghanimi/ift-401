// app/api/admin/stocks/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';

export async function POST(req: NextRequest) {
  try {
    const { name, symbol, marketCap, tradable } = await req.json();

    if (!name || !symbol) {
      return NextResponse.json(
        { error: 'name and symbol are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseServer
      .from('ticker')
      .insert({
        company_name: name,
        symbol: symbol.toUpperCase(),
        market_cap: marketCap ?? 0,
        is_active: !!tradable,
      })
      .select('*')
      .single();

    if (error) {
      console.error('Create ticker error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error('Admin POST /api/admin/stocks error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
