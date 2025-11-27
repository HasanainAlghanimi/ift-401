(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/ift-401/app/portfolio/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PortfolioSimplePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ift-401/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ift-401/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ift-401/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ift-401/lib/supabaseClient.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const money = (n)=>"$".concat(n.toLocaleString(undefined, {
        maximumFractionDigits: 2
    }));
// helper: get current account_id from demo_session -> users -> account
async function resolveAccountId() {
    try {
        const raw = localStorage.getItem('demo_session');
        if (!raw) return null;
        const obj = JSON.parse(raw);
        const email = typeof (obj === null || obj === void 0 ? void 0 : obj.email) === 'string' ? obj.email : null;
        if (!email) return null;
        // 1) user_id from users by email
        const { data: userRow, error: userErr } = await __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('users').select('user_id').eq('email', email).maybeSingle();
        if (userErr || !userRow) {
            console.error('resolveAccountId: user lookup failed', userErr);
            return null;
        }
        const userId = userRow.user_id;
        // 2) account_id from account by user_id
        const { data: acctRow, error: acctErr } = await __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('account').select('account_id').eq('user_id', userId).maybeSingle();
        if (acctErr || !acctRow) {
            console.error('resolveAccountId: account lookup failed', acctErr);
            return null;
        }
        return acctRow.account_id;
    } catch (err) {
        console.error('resolveAccountId error', err);
        return null;
    }
}
function PortfolioSimplePage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [loadError, setLoadError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [rows, setRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PortfolioSimplePage.useEffect": ()=>{
            setMounted(true);
        }
    }["PortfolioSimplePage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PortfolioSimplePage.useEffect": ()=>{
            if (!mounted) return;
            const init = {
                "PortfolioSimplePage.useEffect.init": async ()=>{
                    setLoading(true);
                    setLoadError(null);
                    const hasSession = !!localStorage.getItem('demo_session');
                    if (!hasSession) {
                        router.replace('/signin');
                        return;
                    }
                    const accountId = await resolveAccountId();
                    if (!accountId) {
                        console.error('Portfolio: could not determine trading account');
                        setRows([]);
                        setLoading(false);
                        return;
                    }
                    // 1) load positions for this account (note average_cost)
                    const { data: posRows, error: posErr } = await __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('position').select('position_id, ticker_id, quantity, average_cost').eq('account_id', accountId);
                    if (posErr) {
                        console.error('load positions error', posErr);
                        setLoadError('Failed to load portfolio.');
                        setLoading(false);
                        return;
                    }
                    const positions = posRows !== null && posRows !== void 0 ? posRows : [];
                    if (positions.length === 0) {
                        setRows([]);
                        setLoading(false);
                        return;
                    }
                    // unique ticker_ids
                    const tickerIds = Array.from(new Set(positions.map({
                        "PortfolioSimplePage.useEffect.init.tickerIds": (p)=>p.ticker_id
                    }["PortfolioSimplePage.useEffect.init.tickerIds"])));
                    if (tickerIds.length === 0) {
                        setRows([]);
                        setLoading(false);
                        return;
                    }
                    // 2) get symbols for those tickers
                    const { data: tickerRows, error: tickerErr } = await __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('ticker').select('ticker_id, symbol').in('ticker_id', tickerIds);
                    if (tickerErr) {
                        console.error('load tickers error', tickerErr);
                        setLoadError('Failed to load ticker symbols.');
                        setLoading(false);
                        return;
                    }
                    const tickerMap = new Map();
                    (tickerRows !== null && tickerRows !== void 0 ? tickerRows : []).forEach({
                        "PortfolioSimplePage.useEffect.init": (t)=>{
                            tickerMap.set(t.ticker_id, t.symbol);
                        }
                    }["PortfolioSimplePage.useEffect.init"]);
                    // 3) latest daily close for each ticker
                    const priceMap = new Map();
                    await Promise.all(tickerIds.map({
                        "PortfolioSimplePage.useEffect.init": async (tid)=>{
                            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('pricebar').select('close').eq('ticker_id', tid).eq('time_interval', 'daily').order('bar_date', {
                                ascending: false
                            }).order('bar_time', {
                                ascending: false
                            }).limit(1).maybeSingle();
                            if (!error && data && data.close != null) {
                                priceMap.set(tid, Number(data.close));
                            }
                        }
                    }["PortfolioSimplePage.useEffect.init"]));
                    const ui = positions.map({
                        "PortfolioSimplePage.useEffect.init.ui": (p)=>{
                            var _tickerMap_get;
                            const symbol = (_tickerMap_get = tickerMap.get(p.ticker_id)) !== null && _tickerMap_get !== void 0 ? _tickerMap_get : '—';
                            var _priceMap_get;
                            const mark = (_priceMap_get = priceMap.get(p.ticker_id)) !== null && _priceMap_get !== void 0 ? _priceMap_get : p.average_cost;
                            const pnl = (mark - p.average_cost) * p.quantity; // <-- use average_cost
                            return {
                                symbol,
                                qty: p.quantity,
                                pnl
                            };
                        }
                    }["PortfolioSimplePage.useEffect.init.ui"]);
                    setRows(ui);
                    setLoading(false);
                }
            }["PortfolioSimplePage.useEffect.init"];
            void init();
        }
    }["PortfolioSimplePage.useEffect"], [
        mounted,
        router
    ]);
    const totalPnL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PortfolioSimplePage.useMemo[totalPnL]": ()=>rows.reduce({
                "PortfolioSimplePage.useMemo[totalPnL]": (a, r)=>a + r.pnl
            }["PortfolioSimplePage.useMemo[totalPnL]"], 0)
    }["PortfolioSimplePage.useMemo[totalPnL]"], [
        rows
    ]);
    if (!mounted) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "container",
        style: {
            paddingTop: 24,
            paddingBottom: 24
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pageheader",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "stocks__title",
                                children: "Portfolio"
                            }, void 0, false, {
                                fileName: "[project]/ift-401/app/portfolio/page.tsx",
                                lineNumber: 203,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "stocks__sub",
                                children: "Your current holdings & unrealized P/L."
                            }, void 0, false, {
                                fileName: "[project]/ift-401/app/portfolio/page.tsx",
                                lineNumber: 204,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ift-401/app/portfolio/page.tsx",
                        lineNumber: 202,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "header-actions",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "badge ".concat(totalPnL >= 0 ? 'badge--ok' : ''),
                            children: [
                                "Total Unrealized P/L: ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    className: totalPnL >= 0 ? 'num is-up' : 'num is-down',
                                    children: [
                                        totalPnL >= 0 ? '+' : '',
                                        totalPnL.toFixed(2)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/ift-401/app/portfolio/page.tsx",
                                    lineNumber: 211,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ift-401/app/portfolio/page.tsx",
                            lineNumber: 209,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/ift-401/app/portfolio/page.tsx",
                        lineNumber: 208,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/ift-401/app/portfolio/page.tsx",
                lineNumber: 201,
                columnNumber: 7
            }, this),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "Loading portfolio…"
            }, void 0, false, {
                fileName: "[project]/ift-401/app/portfolio/page.tsx",
                lineNumber: 220,
                columnNumber: 9
            }, this) : loadError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "trade__alert is-error",
                children: loadError
            }, void 0, false, {
                fileName: "[project]/ift-401/app/portfolio/page.tsx",
                lineNumber: 222,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "card portfoliotable",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "portfoliotable__head",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "portfoliotable__h left",
                                children: "Symbol"
                            }, void 0, false, {
                                fileName: "[project]/ift-401/app/portfolio/page.tsx",
                                lineNumber: 226,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "portfoliotable__h center",
                                children: "Qty"
                            }, void 0, false, {
                                fileName: "[project]/ift-401/app/portfolio/page.tsx",
                                lineNumber: 227,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "portfoliotable__h center",
                                children: "Unrealized P/L"
                            }, void 0, false, {
                                fileName: "[project]/ift-401/app/portfolio/page.tsx",
                                lineNumber: 228,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                                fileName: "[project]/ift-401/app/portfolio/page.tsx",
                                lineNumber: 229,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ift-401/app/portfolio/page.tsx",
                        lineNumber: 225,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "portfoliotable__body",
                        children: rows.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "portfoliotable__row",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "muted",
                                style: {
                                    padding: 12,
                                    gridColumn: '1 / -1',
                                    textAlign: 'center'
                                },
                                children: "No positions yet."
                            }, void 0, false, {
                                fileName: "[project]/ift-401/app/portfolio/page.tsx",
                                lineNumber: 235,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/ift-401/app/portfolio/page.tsx",
                            lineNumber: 234,
                            columnNumber: 15
                        }, this) : rows.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "portfoliotable__row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "portfoliotable__symbol",
                                        children: r.symbol
                                    }, void 0, false, {
                                        fileName: "[project]/ift-401/app/portfolio/page.tsx",
                                        lineNumber: 249,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "portfoliotable__qty",
                                        children: r.qty
                                    }, void 0, false, {
                                        fileName: "[project]/ift-401/app/portfolio/page.tsx",
                                        lineNumber: 250,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "portfoliotable__pnl ".concat(r.pnl >= 0 ? 'is-up' : 'is-down'),
                                        children: [
                                            r.pnl >= 0 ? '+' : '',
                                            r.pnl.toFixed(2)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/ift-401/app/portfolio/page.tsx",
                                        lineNumber: 251,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "row__actions",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "iconbtn",
                                            title: "Trade",
                                            onClick: ()=>router.push('/trade'),
                                            children: "+"
                                        }, void 0, false, {
                                            fileName: "[project]/ift-401/app/portfolio/page.tsx",
                                            lineNumber: 260,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/ift-401/app/portfolio/page.tsx",
                                        lineNumber: 259,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, r.symbol, true, {
                                fileName: "[project]/ift-401/app/portfolio/page.tsx",
                                lineNumber: 248,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/ift-401/app/portfolio/page.tsx",
                        lineNumber: 232,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/ift-401/app/portfolio/page.tsx",
                lineNumber: 224,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/ift-401/app/portfolio/page.tsx",
        lineNumber: 200,
        columnNumber: 5
    }, this);
}
_s(PortfolioSimplePage, "yIi3mSxjwyiNU2W3HdL21JjuCGo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = PortfolioSimplePage;
var _c;
__turbopack_context__.k.register(_c, "PortfolioSimplePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=ift-401_app_portfolio_page_tsx_990a5471._.js.map