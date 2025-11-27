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
                        const { data: userRow, error: userErr } = await __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('users') // <-- change to your actual users table name if needed
                        .select('user_id').eq('email', sessionEmail).maybeSingle();
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
            // update local account + portfolio + UI orders
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
                lineNumber: 481,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/ift-401/app/trade/page.tsx",
            lineNumber: 477,
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
                lineNumber: 492,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/ift-401/app/trade/page.tsx",
            lineNumber: 488,
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
                            lineNumber: 506,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "stocks__sub",
                            children: "Buy or sell stocks in this demo environment."
                        }, void 0, false, {
                            fileName: "[project]/ift-401/app/trade/page.tsx",
                            lineNumber: 507,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/ift-401/app/trade/page.tsx",
                    lineNumber: 505,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/ift-401/app/trade/page.tsx",
                lineNumber: 504,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "card",
                style: {
                    marginBottom: 24
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
                                lineNumber: 520,
                                columnNumber: 11
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
                                lineNumber: 530,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ift-401/app/trade/page.tsx",
                        lineNumber: 515,
                        columnNumber: 9
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
                                                lineNumber: 551,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                className: "field__input",
                                                value: symbol,
                                                onChange: (e)=>{
                                                    setSymbol(e.target.value);
                                                    setMessage('');
                                                },
                                                children: [
                                                    stocks.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: "No tickers available"
                                                    }, void 0, false, {
                                                        fileName: "[project]/ift-401/app/trade/page.tsx",
                                                        lineNumber: 561,
                                                        columnNumber: 19
                                                    }, this),
                                                    stocks.map((st)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: st.symbol,
                                                            children: st.company_name ? "".concat(st.symbol, " — ").concat(st.company_name) : st.symbol
                                                        }, st.ticker_id, false, {
                                                            fileName: "[project]/ift-401/app/trade/page.tsx",
                                                            lineNumber: 564,
                                                            columnNumber: 19
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/ift-401/app/trade/page.tsx",
                                                lineNumber: 552,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/ift-401/app/trade/page.tsx",
                                        lineNumber: 550,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "field",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "field__label",
                                                children: "Quantity"
                                            }, void 0, false, {
                                                fileName: "[project]/ift-401/app/trade/page.tsx",
                                                lineNumber: 574,
                                                columnNumber: 15
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
                                                placeholder: "1"
                                            }, void 0, false, {
                                                fileName: "[project]/ift-401/app/trade/page.tsx",
                                                lineNumber: 575,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/ift-401/app/trade/page.tsx",
                                        lineNumber: 573,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ift-401/app/trade/page.tsx",
                                lineNumber: 549,
                                columnNumber: 11
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
                                            lineNumber: 592,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            className: "field__input",
                                            type: "text",
                                            value: quoteLoading ? 'Loading...' : quote != null ? fmt(quote) : 'No price data',
                                            readOnly: true
                                        }, void 0, false, {
                                            fileName: "[project]/ift-401/app/trade/page.tsx",
                                            lineNumber: 595,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/ift-401/app/trade/page.tsx",
                                    lineNumber: 591,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/ift-401/app/trade/page.tsx",
                                lineNumber: 590,
                                columnNumber: 11
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
                                                lineNumber: 613,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/ift-401/app/trade/page.tsx",
                                        lineNumber: 611,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "badge",
                                        children: [
                                            "Cash: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: fmt(account.balance)
                                            }, void 0, false, {
                                                fileName: "[project]/ift-401/app/trade/page.tsx",
                                                lineNumber: 616,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/ift-401/app/trade/page.tsx",
                                        lineNumber: 615,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ift-401/app/trade/page.tsx",
                                lineNumber: 610,
                                columnNumber: 11
                            }, this),
                            message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "trade__alert ".concat(/filled\.$/i.test(message) ? 'is-success' : 'is-error'),
                                style: {
                                    marginTop: 6
                                },
                                children: message
                            }, void 0, false, {
                                fileName: "[project]/ift-401/app/trade/page.tsx",
                                lineNumber: 621,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: "btn btn--primary",
                                style: {
                                    width: '100%'
                                },
                                disabled: !canSubmit || stocks.length === 0,
                                children: [
                                    side === 'BUY' ? 'Buy' : 'Sell',
                                    " ",
                                    qty,
                                    ' ',
                                    symbol ? symbol.toUpperCase() : ''
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ift-401/app/trade/page.tsx",
                                lineNumber: 633,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ift-401/app/trade/page.tsx",
                        lineNumber: 542,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/ift-401/app/trade/page.tsx",
                lineNumber: 514,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "card spaced",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        style: {
                            marginTop: 0,
                            marginBottom: 8
                        },
                        children: "Recent orders"
                    }, void 0, false, {
                        fileName: "[project]/ift-401/app/trade/page.tsx",
                        lineNumber: 647,
                        columnNumber: 9
                    }, this),
                    orders.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "muted",
                        children: "No orders yet."
                    }, void 0, false, {
                        fileName: "[project]/ift-401/app/trade/page.tsx",
                        lineNumber: 651,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "table__body",
                        children: orders.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "row",
                                style: {
                                    gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1fr'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "name",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: o.symbol
                                            }, void 0, false, {
                                                fileName: "[project]/ift-401/app/trade/page.tsx",
                                                lineNumber: 664,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "symbol",
                                                children: new Date(o.time).toLocaleString()
                                            }, void 0, false, {
                                                fileName: "[project]/ift-401/app/trade/page.tsx",
                                                lineNumber: 665,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/ift-401/app/trade/page.tsx",
                                        lineNumber: 663,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "num",
                                        children: o.side
                                    }, void 0, false, {
                                        fileName: "[project]/ift-401/app/trade/page.tsx",
                                        lineNumber: 669,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "num",
                                        children: o.type
                                    }, void 0, false, {
                                        fileName: "[project]/ift-401/app/trade/page.tsx",
                                        lineNumber: 670,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "num",
                                        children: o.qty
                                    }, void 0, false, {
                                        fileName: "[project]/ift-401/app/trade/page.tsx",
                                        lineNumber: 671,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "num",
                                        children: fmt(o.fillPrice)
                                    }, void 0, false, {
                                        fileName: "[project]/ift-401/app/trade/page.tsx",
                                        lineNumber: 672,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, o.id, true, {
                                fileName: "[project]/ift-401/app/trade/page.tsx",
                                lineNumber: 655,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/ift-401/app/trade/page.tsx",
                        lineNumber: 653,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/ift-401/app/trade/page.tsx",
                lineNumber: 646,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/ift-401/app/trade/page.tsx",
        lineNumber: 500,
        columnNumber: 5
    }, this);
}
_s(TradePage, "TQa7Shmp6xQfbDVTpXrfcVLq+to=", false, function() {
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
"[project]/ift-401/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/ift-401/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=ift-401_d2a7358b._.js.map