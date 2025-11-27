(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/ift-401/app/trade/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TradePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ift-401/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ift-401/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ift-401/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$useDemoSession$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ift-401/lib/useDemoSession.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ift-401/lib/supabaseClient.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const STARTING_CASH = 10_000;
const ORDER_TYPE = 'MARKET';
// localStorage helpers
function readJSON(key, fallback) {
    try {
        var _JSON_parse;
        return (_JSON_parse = JSON.parse(localStorage.getItem(key) || 'null')) !== null && _JSON_parse !== void 0 ? _JSON_parse : fallback;
    } catch (e) {
        return fallback;
    }
}
function writeJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function ensurePortfolio() {
    const p = readJSON('demo_portfolio', {
        cash: STARTING_CASH,
        positions: []
    });
    if (typeof p.cash !== 'number' || !Array.isArray(p.positions)) {
        return {
            cash: STARTING_CASH,
            positions: []
        };
    }
    return p;
}
const fmt = (n)=>"$".concat(n.toLocaleString(undefined, {
        maximumFractionDigits: 2
    }));
/** Helpers for market-hours check (America/New_York) */ function getNowInET() {
    const now = new Date();
    const fmt = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        weekday: 'short',
        hour12: false
    });
    const parts = fmt.formatToParts(now);
    const map = {};
    for (const p of parts){
        if (p.type !== 'literal') map[p.type] = p.value;
    }
    const date = "".concat(map.year, "-").concat(map.month, "-").concat(map.day);
    const time = "".concat(map.hour, ":").concat(map.minute, ":").concat(map.second);
    const weekdayLabel = map.weekday; // "Mon", "Tue", ... 
    const weekdayMap = {
        Sun: 7,
        Mon: 1,
        Tue: 2,
        Wed: 3,
        Thu: 4,
        Fri: 5,
        Sat: 6
    };
    var _weekdayMap_weekdayLabel;
    const dayOfWeek = (_weekdayMap_weekdayLabel = weekdayMap[weekdayLabel]) !== null && _weekdayMap_weekdayLabel !== void 0 ? _weekdayMap_weekdayLabel : 7;
    const hour = Number(map.hour);
    const minute = Number(map.minute);
    return {
        date,
        time,
        dayOfWeek,
        hour,
        minute
    };
}
function timeToMinutes(t) {
    if (!t) return null;
    const [h, m, s] = t.split(':').map((x)=>Number(x));
    if (Number.isNaN(h) || Number.isNaN(m)) return null;
    return h * 60 + m + (Number.isNaN(s) ? 0 : s / 60);
}
/** 🔹 HELPERS TO WRITE TO position TABLE */ async function upsertPositionRow(accountId, tickerId, side, qty, price) {
    try {
        // 1) Load any existing position row for this account & ticker
        const { data: existing, error: posErr } = await __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('position').select('position_id, quantity, average_cost').eq('account_id', accountId).eq('ticker_id', tickerId).maybeSingle();
        if (posErr) {
            console.error('position lookup error:', posErr);
            return;
        }
        const nowIso = new Date().toISOString();
        // No existing row
        if (!existing) {
            if (side === 'SELL') {
                // Shouldn't really happen because you already validated quantity,
                // but don't create a negative position.
                console.warn('SELL with no existing position, skipping position insert');
                return;
            }
            // BUY → insert new position row
            const { error: insertErr } = await __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('position').insert({
                account_id: accountId,
                ticker_id: tickerId,
                quantity: qty,
                average_cost: price,
                current_value: price * qty,
                unrealized_pl: 0,
                realized_pl: 0,
                last_updated: nowIso
            });
            if (insertErr) {
                console.error('position insert error:', insertErr);
            }
            return;
        }
        // There *is* an existing row
        const oldQty = Number(existing.quantity) || 0;
        const oldCost = Number(existing.average_cost) || 0;
        let newQty = oldQty;
        let newAvgCost = oldCost;
        if (side === 'BUY') {
            newQty = oldQty + qty;
            newAvgCost = newQty > 0 ? (oldCost * oldQty + price * qty) / newQty : price;
        } else {
            // SELL
            newQty = oldQty - qty;
            if (newQty < 0) {
                console.warn('SELL would result in negative position, skipping update');
                return;
            }
        // keep same avg cost on sell (realized P/L could be tracked separately)
        }
        if (newQty === 0) {
            // Close the position: delete the row
            const { error: delErr } = await __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('position').delete().eq('position_id', existing.position_id);
            if (delErr) {
                console.error('position delete error:', delErr);
            }
            return;
        }
        // Update existing row
        const { error: updateErr } = await __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('position').update({
            quantity: newQty,
            average_cost: newAvgCost,
            current_value: newQty * price,
            last_updated: nowIso
        }).eq('position_id', existing.position_id);
        if (updateErr) {
            console.error('position update error:', updateErr);
        }
    } catch (e) {
        console.error('upsertPositionRow unexpected error:', e);
    }
}
function TradePage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { isLoggedIn } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$useDemoSession$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDemoSession"])();
    // auth / mount gates
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasSession, setHasSession] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TradePage.useEffect": ()=>{
            setMounted(true);
            try {
                setHasSession(!!localStorage.getItem('demo_session'));
            } catch (e) {
                setHasSession(false);
            }
        }
    }["TradePage.useEffect"], []);
    const authed = isLoggedIn || !!hasSession;
    // DB state
    const [stocks, setStocks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [account, setAccount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [loadError, setLoadError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // quote
    const [quote, setQuote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [quoteLoading, setQuoteLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // ticket state
    const [symbol, setSymbol] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [qty, setQty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [side, setSide] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('BUY');
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // local UI portfolio + orders
    const [portfolio, setPortfolio] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        cash: STARTING_CASH,
        positions: []
    });
    const [orders, setOrders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // market-hours / holiday gating
    const [isClosed, setIsClosed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [marketStatusMsg, setMarketStatusMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // load local portfolio + orders once mounted
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TradePage.useEffect": ()=>{
            if (!mounted) return;
            setPortfolio(ensurePortfolio());
            setOrders(readJSON('demo_orders', []));
        }
    }["TradePage.useEffect"], [
        mounted
    ]);
    // redirect if not authed
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TradePage.useEffect": ()=>{
            if (!mounted) return;
            if (!authed) router.replace('/signin');
        }
    }["TradePage.useEffect"], [
        mounted,
        authed,
        router
    ]);
    // load tickers + account for *current user_id*
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TradePage.useEffect": ()=>{
            if (!mounted) return;
            const init = {
                "TradePage.useEffect.init": async ()=>{
                    setLoading(true);
                    setLoadError(null);
                    // 0) read user_id OR email from demo_session in localStorage
                    let demoUserId = null;
                    let sessionEmail = null;
                    try {
                        const raw = localStorage.getItem('demo_session');
                        if (raw) {
                            const obj = JSON.parse(raw);
                            // if your login ever stores a numeric user_id, use it directly
                            if (typeof obj.user_id === 'number') {
                                demoUserId = obj.user_id;
                            } else if (typeof obj.id === 'number') {
                                demoUserId = obj.id;
                            }
                            // from your screenshot, you currently have: { email, remember, role }
                            if (typeof obj.email === 'string') {
                                sessionEmail = obj.email;
                            }
                        }
                    } catch (e) {
                    /* ignore */ }
                    // If we didn't get a numeric user id but we *do* have an email in the session,
                    // resolve user_id from the users table.
                    if (!demoUserId && sessionEmail) {
                        const { data: userRow, error: userErr } = await __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('users').select('user_id').eq('email', sessionEmail).maybeSingle();
                        if (userErr) {
                            console.error('Failed to resolve user id from email:', userErr);
                        } else if (userRow && userRow.user_id != null) {
                            demoUserId = Number(userRow.user_id);
                        }
                    }
                    if (!demoUserId) {
                        setLoadError('Could not determine logged-in user id. Check demo_session and users table.');
                        setLoading(false);
                        return;
                    }
                    // 1) load tickers
                    const { data: tickerRows, error: tickerError } = await __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('ticker').select('ticker_id, symbol, company_name').eq('is_active', true).order('symbol', {
                        ascending: true
                    });
                    if (tickerError) {
                        console.error(tickerError);
                        setLoadError('Failed to load tickers.');
                    } else if (tickerRows && tickerRows.length > 0) {
                        setStocks(tickerRows);
                        setSymbol({
                            "TradePage.useEffect.init": (prev)=>prev || tickerRows[0].symbol
                        }["TradePage.useEffect.init"]);
                    } else {
                        setStocks([]);
                        setSymbol('');
                    }
                    // 2) load account row for this user_id
                    const { data: acct, error: acctErr } = await __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('account').select('account_id, balance').eq('user_id', demoUserId).maybeSingle();
                    if (acctErr || !acct) {
                        console.error(acctErr);
                        setLoadError('Failed to load trading account for this user. Make sure there is an account row with this user_id.');
                        setLoading(false);
                        return;
                    }
                    const acctBalance = Number(acct.balance);
                    setAccount({
                        account_id: acct.account_id,
                        balance: acctBalance
                    });
                    setPortfolio({
                        "TradePage.useEffect.init": (prev)=>({
                                ...prev,
                                cash: acctBalance
                            })
                    }["TradePage.useEffect.init"]);
                    setLoading(false);
                }
            }["TradePage.useEffect.init"];
            void init();
        }
    }["TradePage.useEffect"], [
        mounted
    ]);
    // load latest close from pricebar whenever symbol changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TradePage.useEffect": ()=>{
            const loadQuote = {
                "TradePage.useEffect.loadQuote": async ()=>{
                    if (!symbol || stocks.length === 0) {
                        setQuote(null);
                        return;
                    }
                    const stock = stocks.find({
                        "TradePage.useEffect.loadQuote.stock": (st)=>st.symbol === symbol
                    }["TradePage.useEffect.loadQuote.stock"]);
                    if (!stock) {
                        setQuote(null);
                        return;
                    }
                    setQuoteLoading(true);
                    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('pricebar').select('close, bar_date, bar_time, time_interval').eq('ticker_id', stock.ticker_id).eq('time_interval', 'daily').order('bar_date', {
                        ascending: false
                    }).order('bar_time', {
                        ascending: false
                    }).limit(1).maybeSingle();
                    if (error) {
                        console.error(error);
                        setQuote(null);
                    } else if (data && data.close != null) {
                        setQuote(Number(data.close));
                    } else {
                        setQuote(null);
                    }
                    setQuoteLoading(false);
                }
            }["TradePage.useEffect.loadQuote"];
            void loadQuote();
        }
    }["TradePage.useEffect"], [
        symbol,
        stocks
    ]);
    const posMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TradePage.useMemo[posMap]": ()=>{
            const map = new Map();
            portfolio.positions.forEach({
                "TradePage.useMemo[posMap]": (p)=>map.set(p.symbol, p)
            }["TradePage.useMemo[posMap]"]);
            return map;
        }
    }["TradePage.useMemo[posMap]"], [
        portfolio.positions
    ]);
    /** Market-hours + holiday gating effect */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TradePage.useEffect": ()=>{
            if (!mounted) return;
            const checkMarket = {
                "TradePage.useEffect.checkMarket": async ()=>{
                    try {
                        const { date, time, dayOfWeek, hour, minute } = getNowInET();
                        const nowMinutes = hour * 60 + minute;
                        // 1) Holiday / calendar check
                        const { data: calRow, error: calErr } = await __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('marketcalendar').select('holiday_name, market_status').eq('date', date).maybeSingle();
                        if (calErr) {
                            console.error('marketcalendar lookup error:', calErr);
                        }
                        if (calRow && calRow.market_status === 'Closed') {
                            setIsClosed(true);
                            setMarketStatusMsg(calRow.holiday_name ? "Market closed today for ".concat(calRow.holiday_name, ".") : 'Market closed today.');
                            return;
                        }
                        // 2) Regular hours from markethours table
                        const { data: hoursRow, error: hoursErr } = await __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('markethours').select('open_time, close_time, pre_market_start, after_hours_end, is_active, effective_date').eq('day_of_week', dayOfWeek).eq('is_active', true).lte('effective_date', date).order('effective_date', {
                            ascending: false
                        }).limit(1).maybeSingle();
                        if (hoursErr) {
                            console.error('markethours lookup error:', hoursErr);
                            setIsClosed(true);
                            setMarketStatusMsg('Could not load market hours configuration.');
                            return;
                        }
                        if (!hoursRow) {
                            // weekend or no schedule
                            setIsClosed(true);
                            setMarketStatusMsg('Market is closed today.');
                            return;
                        }
                        var _timeToMinutes;
                        const startMinutes = (_timeToMinutes = timeToMinutes(hoursRow.pre_market_start)) !== null && _timeToMinutes !== void 0 ? _timeToMinutes : timeToMinutes(hoursRow.open_time);
                        var _timeToMinutes1;
                        const endMinutes = (_timeToMinutes1 = timeToMinutes(hoursRow.after_hours_end)) !== null && _timeToMinutes1 !== void 0 ? _timeToMinutes1 : timeToMinutes(hoursRow.close_time);
                        if (startMinutes == null || endMinutes == null || nowMinutes < startMinutes || nowMinutes > endMinutes) {
                            setIsClosed(true);
                            setMarketStatusMsg('Trading is currently outside configured market hours.');
                        } else {
                            setIsClosed(false);
                            setMarketStatusMsg(null);
                        }
                    } catch (err) {
                        console.error('market hours check error', err);
                        setIsClosed(false);
                        setMarketStatusMsg(null);
                    }
                }
            }["TradePage.useEffect.checkMarket"];
            void checkMarket();
        }
    }["TradePage.useEffect"], [
        mounted
    ]);
    function updatePortfolio(newCash, s, fillPrice, qtyDelta) {
        setPortfolio((prev)=>{
            const next = {
                cash: newCash,
                positions: prev.positions.map((p)=>({
                        ...p
                    }))
            };
            const existing = next.positions.find((p)=>p.symbol === s);
            if (!existing) {
                if (qtyDelta > 0) {
                    next.positions.push({
                        symbol: s,
                        qty: qtyDelta,
                        avgPrice: fillPrice
                    });
                }
            } else {
                const newQty = existing.qty + qtyDelta;
                if (newQty <= 0) {
                    next.positions = next.positions.filter((p)=>p.symbol !== s);
                } else if (qtyDelta > 0) {
                    existing.avgPrice = (existing.avgPrice * existing.qty + fillPrice * qtyDelta) / newQty;
                    existing.qty = newQty;
                } else {
                    existing.qty = newQty;
                }
            }
            writeJSON('demo_portfolio', next);
            return next;
        });
    }
    async function placeOrder() {
        if (!account) {
            setMessage('Trading account not loaded.');
            return;
        }
        if (isClosed) {
            setMessage(marketStatusMsg || 'Trading is currently closed. Please return during market hours.');
            return;
        }
        const s = symbol.trim().toUpperCase();
        if (!s) {
            setMessage('Select a symbol.');
            return;
        }
        if (!Number.isFinite(qty) || qty <= 0) {
            setMessage('Quantity must be a positive number.');
            return;
        }
        if (quote == null || !Number.isFinite(quote) || quote <= 0) {
            setMessage('No price data available for this symbol.');
            return;
        }
        const stock = stocks.find((st)=>st.symbol === s);
        if (!stock) {
            setMessage('That symbol is not available to trade.');
            return;
        }
        const px = quote;
        const amt = Number((px * qty).toFixed(2));
        const currentBalance = Number(account.balance);
        if (side === 'BUY' && amt > currentBalance) {
            setMessage("Insufficient funds. You have ".concat(fmt(currentBalance), "."));
            return;
        }
        if (side === 'SELL') {
            var _posMap_get;
            var _posMap_get_qty;
            const have = (_posMap_get_qty = (_posMap_get = posMap.get(s)) === null || _posMap_get === void 0 ? void 0 : _posMap_get.qty) !== null && _posMap_get_qty !== void 0 ? _posMap_get_qty : 0;
            if (qty > have) {
                setMessage("You only have ".concat(have, " ").concat(s, " to sell."));
                return;
            }
        }
        try {
            setMessage('Submitting order...');
            // 1) insert into orders
            const { data: orderRow, error: orderError } = await __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('orders').insert({
                account_id: account.account_id,
                ticker_id: stock.ticker_id,
                order_type: 'Market',
                side: side === 'BUY' ? 'Buy' : 'Sell',
                quantity: qty,
                price: px,
                status: 'FILLED',
                order_date: new Date().toISOString()
            }).select().single();
            if (orderError || !orderRow) {
                console.error('Order insert error:', orderError);
                var _orderError_message;
                setMessage("Could not place order: ".concat((_orderError_message = orderError === null || orderError === void 0 ? void 0 : orderError.message) !== null && _orderError_message !== void 0 ? _orderError_message : 'Unknown error'));
                return;
            }
            // 2) insert into trade
            const { error: tradeError } = await __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('trade').insert({
                order_id: orderRow.order_id,
                ticker_id: stock.ticker_id,
                execution_price: px,
                quantity: qty,
                trade_date: new Date().toISOString(),
                commission: 0,
                settlement_date: new Date()
            });
            if (tradeError) {
                console.error('Trade insert error:', tradeError);
                setMessage('Order created but trade record failed.');
                return;
            }
            // 3) update account balance
            const newBalance = side === 'BUY' ? Number((currentBalance - amt).toFixed(2)) : Number((currentBalance + amt).toFixed(2));
            const { error: acctUpdateError } = await __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('account').update({
                balance: newBalance,
                available_balance: newBalance
            }).eq('account_id', account.account_id);
            if (acctUpdateError) {
                console.error('Account update error:', acctUpdateError);
                setMessage('Trade executed but failed to update balance.');
                return;
            }
            // 4) insert into transaction
            const { error: txError } = await __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('transaction').insert({
                account_id: account.account_id,
                transaction_type: side === 'BUY' ? 'Buy' : 'Sell',
                amount: amt,
                balance_before: currentBalance,
                balance_after: newBalance,
                transaction_date: new Date().toISOString(),
                status: 'COMPLETED'
            });
            if (txError) {
                console.error('Transaction insert error:', txError);
            }
            // 5) 🔹 UPDATE / INSERT INTO position TABLE
            await upsertPositionRow(account.account_id, stock.ticker_id, side, qty, px);
            // update local account + portfolio + UI orders (still tracked client-side)
            setAccount((prev)=>prev ? {
                    ...prev,
                    balance: newBalance
                } : prev);
            updatePortfolio(newBalance, s, px, side === 'BUY' ? qty : -qty);
            const uiOrder = {
                id: orderRow.order_id.toString(),
                time: orderRow.order_date,
                symbol: s,
                side,
                type: ORDER_TYPE,
                qty,
                fillPrice: px
            };
            const nextOrders = [
                uiOrder,
                ...orders
            ].slice(0, 100);
            setOrders(nextOrders);
            writeJSON('demo_orders', nextOrders);
            setMessage("".concat(side, " ").concat(qty, " ").concat(s, " @ ").concat(fmt(px), " filled."));
            router.refresh(); // refresh navbar balance, etc.
        } catch (err) {
            console.error(err);
            setMessage('Unexpected error while placing order.');
        }
    }
    const est = (quote !== null && quote !== void 0 ? quote : 0) * qty;
    const canSubmit = !!symbol && Number.isFinite(qty) && qty > 0 && quote != null && quote > 0 && !quoteLoading;
    // render gates
    if (!mounted) return null;
    if (!authed) return null;
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "trade container",
            style: {
                paddingTop: 24,
                paddingBottom: 24
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "Loading trading data..."
            }, void 0, false, {
                fileName: "[project]/ift-401/app/trade/page.tsx",
                lineNumber: 737,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/ift-401/app/trade/page.tsx",
            lineNumber: 733,
            columnNumber: 7
        }, this);
    }
    if (loadError || !account) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "trade container",
            style: {
                paddingTop: 24,
                paddingBottom: 24
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "trade__alert is-error",
                children: loadError !== null && loadError !== void 0 ? loadError : 'No trading account found.'
            }, void 0, false, {
                fileName: "[project]/ift-401/app/trade/page.tsx",
                lineNumber: 748,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/ift-401/app/trade/page.tsx",
            lineNumber: 744,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "trade container",
        style: {
            paddingTop: 24,
            paddingBottom: 24
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pageheader",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "stocks__title",
                            children: "Trade"
                        }, void 0, false, {
                            fileName: "[project]/ift-401/app/trade/page.tsx",
                            lineNumber: 762,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "stocks__sub",
                            children: "Buy or sell stocks with ease."
                        }, void 0, false, {
                            fileName: "[project]/ift-401/app/trade/page.tsx",
                            lineNumber: 763,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/ift-401/app/trade/page.tsx",
                    lineNumber: 761,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/ift-401/app/trade/page.tsx",
                lineNumber: 760,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: isClosed ? 'trade-disabled' : '',
                children: [
                    isClosed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "market-closed-banner",
                        children: marketStatusMsg !== null && marketStatusMsg !== void 0 ? marketStatusMsg : 'Trading is currently closed. Please return during normal market hours.'
                    }, void 0, false, {
                        fileName: "[project]/ift-401/app/trade/page.tsx",
                        lineNumber: 770,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "card",
                        style: {
                            marginBottom: 24,
                            background: '#060816',
                            borderRadius: 20,
                            border: '1px solid rgba(255,255,255,0.05)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pillgroup",
                                role: "tablist",
                                "aria-label": "Order side",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "pillbtn ".concat(side === 'BUY' ? 'is-active' : ''),
                                        onClick: ()=>{
                                            setSide('BUY');
                                            setMessage('');
                                        },
                                        type: "button",
                                        children: "Buy"
                                    }, void 0, false, {
                                        fileName: "[project]/ift-401/app/trade/page.tsx",
                                        lineNumber: 787,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "pillbtn ".concat(side === 'SELL' ? 'is-active' : ''),
                                        onClick: ()=>{
                                            setSide('SELL');
                                            setMessage('');
                                        },
                                        type: "button",
                                        children: "Sell"
                                    }, void 0, false, {
                                        fileName: "[project]/ift-401/app/trade/page.tsx",
                                        lineNumber: 797,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ift-401/app/trade/page.tsx",
                                lineNumber: 786,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                className: "auth__form",
                                onSubmit: (e)=>{
                                    e.preventDefault();
                                    void placeOrder();
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "fieldrow",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "field",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "field__label",
                                                        children: "Symbol"
                                                    }, void 0, false, {
                                                        fileName: "[project]/ift-401/app/trade/page.tsx",
                                                        lineNumber: 818,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        className: "field__input",
                                                        value: symbol,
                                                        onChange: (e)=>{
                                                            setSymbol(e.target.value);
                                                            setMessage('');
                                                        },
                                                        disabled: isClosed,
                                                        children: [
                                                            stocks.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "",
                                                                children: "No tickers available"
                                                            }, void 0, false, {
                                                                fileName: "[project]/ift-401/app/trade/page.tsx",
                                                                lineNumber: 829,
                                                                columnNumber: 21
                                                            }, this),
                                                            stocks.map((st)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: st.symbol,
                                                                    children: st.company_name ? "".concat(st.symbol, " — ").concat(st.company_name) : st.symbol
                                                                }, st.ticker_id, false, {
                                                                    fileName: "[project]/ift-401/app/trade/page.tsx",
                                                                    lineNumber: 832,
                                                                    columnNumber: 21
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/ift-401/app/trade/page.tsx",
                                                        lineNumber: 819,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/ift-401/app/trade/page.tsx",
                                                lineNumber: 817,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "field",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "field__label",
                                                        children: "Quantity"
                                                    }, void 0, false, {
                                                        fileName: "[project]/ift-401/app/trade/page.tsx",
                                                        lineNumber: 842,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "field__input",
                                                        type: "number",
                                                        min: 1,
                                                        step: 1,
                                                        value: qty,
                                                        onChange: (e)=>{
                                                            setQty(Math.max(1, Number(e.target.value)));
                                                            setMessage('');
                                                        },
                                                        placeholder: "1",
                                                        disabled: isClosed
                                                    }, void 0, false, {
                                                        fileName: "[project]/ift-401/app/trade/page.tsx",
                                                        lineNumber: 843,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/ift-401/app/trade/page.tsx",
                                                lineNumber: 841,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/ift-401/app/trade/page.tsx",
                                        lineNumber: 816,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "fieldrow",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "field",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "field__label",
                                                    children: "Price (latest close from pricebar)"
                                                }, void 0, false, {
                                                    fileName: "[project]/ift-401/app/trade/page.tsx",
                                                    lineNumber: 861,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    className: "field__input",
                                                    type: "text",
                                                    value: quoteLoading ? 'Loading...' : quote != null ? fmt(quote) : 'No price data',
                                                    readOnly: true
                                                }, void 0, false, {
                                                    fileName: "[project]/ift-401/app/trade/page.tsx",
                                                    lineNumber: 864,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/ift-401/app/trade/page.tsx",
                                            lineNumber: 860,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/ift-401/app/trade/page.tsx",
                                        lineNumber: 859,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "actions-row",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "badge",
                                                children: [
                                                    "Est. ",
                                                    side === 'BUY' ? 'Cost' : 'Proceeds',
                                                    ":",
                                                    ' ',
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: fmt(est || 0)
                                                    }, void 0, false, {
                                                        fileName: "[project]/ift-401/app/trade/page.tsx",
                                                        lineNumber: 882,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/ift-401/app/trade/page.tsx",
                                                lineNumber: 880,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "badge",
                                                children: [
                                                    "Cash: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: fmt(account.balance)
                                                    }, void 0, false, {
                                                        fileName: "[project]/ift-401/app/trade/page.tsx",
                                                        lineNumber: 885,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/ift-401/app/trade/page.tsx",
                                                lineNumber: 884,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/ift-401/app/trade/page.tsx",
                                        lineNumber: 879,
                                        columnNumber: 13
                                    }, this),
                                    message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "trade__alert ".concat(/filled\.$/i.test(message) ? 'is-success' : 'is-error'),
                                        style: {
                                            marginTop: 6
                                        },
                                        children: message
                                    }, void 0, false, {
                                        fileName: "[project]/ift-401/app/trade/page.tsx",
                                        lineNumber: 890,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        className: "btn btn--primary",
                                        style: {
                                            width: '100%'
                                        },
                                        disabled: !canSubmit || stocks.length === 0 || isClosed,
                                        children: [
                                            side === 'BUY' ? 'Buy' : 'Sell',
                                            " ",
                                            qty,
                                            ' ',
                                            symbol ? symbol.toUpperCase() : ''
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/ift-401/app/trade/page.tsx",
                                        lineNumber: 900,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ift-401/app/trade/page.tsx",
                                lineNumber: 809,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ift-401/app/trade/page.tsx",
                        lineNumber: 777,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/ift-401/app/trade/page.tsx",
                lineNumber: 768,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/ift-401/app/trade/page.tsx",
        lineNumber: 756,
        columnNumber: 5
    }, this);
}
_s(TradePage, "AFHgvDKpXP2lH18UyuYS5HTwmw8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$useDemoSession$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDemoSession"]
    ];
});
_c = TradePage;
var _c;
__turbopack_context__.k.register(_c, "TradePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=ift-401_app_trade_page_tsx_b6599e52._.js.map