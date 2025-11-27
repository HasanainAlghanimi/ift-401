// app/api/admin/stocks/[symbol]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';

type Params = { params: { symbol: string } };

// 🔁 Update existing stock
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const symbol = params.symbol.toUpperCase();
    const { name, marketCap, tradable } = await req.json();

    if (!name) {
      return NextResponse.json(
        { error: 'name is required' },
        { status: 400 }
      );
    }

    const { error } = await supabaseServer
      .from('ticker')
      .update({
        company_name: name,
        market_cap: marketCap ?? 0,
        is_active: !!tradable,
      })
      .eq('symbol', symbol);

    if (error) {
      console.error('Update ticker error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Admin PUT /api/admin/stocks/[symbol] error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// ❌ Delete existing stock
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const symbol = params.symbol.toUpperCase();

    const { error } = await supabaseServer
      .from('ticker')
      .delete()
      .eq('symbol', symbol);

    if (error) {
      console.error('Delete ticker error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Admin DELETE /api/admin/stocks/[symbol] error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
