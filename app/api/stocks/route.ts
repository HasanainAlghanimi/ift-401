import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  const { data, error } = await supabase
    .from("ticker")
    .select("symbol, company_name, market_cap, is_active");

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stocks" },
      { status: 500 }
    );
  }


  const stocks = data.map((row: any) => ({
    name: row.company_name,
    symbol: row.symbol,
    price: Math.random() * 500 + 50,     // fake price
    changePct: (Math.random() * 4 - 2),  // fake daily % change
    marketCap: Number(row.market_cap),
    tradable: row.is_active,
  }));

  return NextResponse.json(stocks);
}
