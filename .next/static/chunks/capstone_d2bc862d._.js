(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/capstone/components/StocksTable.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/StocksTable.tsx
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/capstone/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/capstone/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const numberFmt = function(n) {
    let opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return typeof n === "number" && !Number.isNaN(n) ? new Intl.NumberFormat(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        ...opts
    }).format(n) : "—";
};
const compactFmt = (n)=>typeof n === "number" && !Number.isNaN(n) ? new Intl.NumberFormat(undefined, {
        notation: "compact",
        maximumFractionDigits: 2
    }).format(n) : "—";
const StocksTable = (param)=>{
    let { rows, order = {
        by: "ticker",
        dir: "asc"
    }, onSort = ()=>{}, loading = false, error = null, searchTerm = "" } = param;
    _s();
    // derive market cap & changePct, and do simple local filtering if searchTerm provided
    const derived = (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "StocksTable.useMemo[derived]": ()=>{
            const term = searchTerm.trim().toLowerCase();
            return rows.map({
                "StocksTable.useMemo[derived]": (r)=>{
                    const { last, open, high, low, prevClose } = r.price;
                    const marketCap = typeof last === "number" && typeof r.volume === "number" ? last * r.volume : undefined;
                    const changePct = typeof prevClose === "number" && prevClose > 0 ? (last - prevClose) / prevClose * 100 : undefined;
                    return {
                        ...r,
                        _derived: {
                            marketCap,
                            changePct
                        }
                    };
                }
            }["StocksTable.useMemo[derived]"]).filter({
                "StocksTable.useMemo[derived]": (r)=>term ? r.ticker.toLowerCase().includes(term) || r.companyName.toLowerCase().includes(term) : true
            }["StocksTable.useMemo[derived]"]);
        }
    }["StocksTable.useMemo[derived]"], [
        rows,
        searchTerm
    ]);
    // sorting
    const sorted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "StocksTable.useMemo[sorted]": ()=>{
            const copy = [
                ...derived
            ];
            const dir = order.dir === "asc" ? 1 : -1;
            const val = {
                "StocksTable.useMemo[sorted].val": (r, key)=>{
                    switch(key){
                        case "last":
                            return r.price.last;
                        case "open":
                            return r.price.open;
                        case "high":
                            return r.price.high;
                        case "low":
                            return r.price.low;
                        case "marketCap":
                            return r._derived.marketCap;
                        case "changePct":
                            return r._derived.changePct;
                        default:
                            return r[key];
                    }
                }
            }["StocksTable.useMemo[sorted].val"];
            copy.sort({
                "StocksTable.useMemo[sorted]": (a, b)=>{
                    const av = val(a, order.by);
                    const bv = val(b, order.by);
                    if (av == null && bv == null) return 0;
                    if (av == null) return 1;
                    if (bv == null) return -1;
                    if (typeof av === "number" && typeof bv === "number") {
                        return (av - bv) * dir;
                    }
                    const as = String(av).toLowerCase();
                    const bs = String(bv).toLowerCase();
                    if (as < bs) return -1 * dir;
                    if (as > bs) return 1 * dir;
                    return 0;
                }
            }["StocksTable.useMemo[sorted]"]);
            return copy;
        }
    }["StocksTable.useMemo[sorted]"], [
        derived,
        order
    ]);
    const cols = [
        {
            key: "ticker",
            label: "Symbol",
            width: "7rem"
        },
        {
            key: "companyName",
            label: "Name",
            width: "auto"
        },
        {
            key: "last",
            label: "Last",
            numeric: true,
            width: "8rem"
        },
        {
            key: "changePct",
            label: "Δ %",
            numeric: true,
            width: "6rem"
        },
        {
            key: "volume",
            label: "Volume",
            numeric: true,
            width: "9rem"
        },
        {
            key: "marketCap",
            label: "Market Cap",
            numeric: true,
            width: "11rem"
        },
        {
            key: "open",
            label: "Open",
            numeric: true,
            width: "8rem"
        },
        {
            key: "high",
            label: "High",
            numeric: true,
            width: "8rem"
        },
        {
            key: "low",
            label: "Low",
            numeric: true,
            width: "8rem"
        },
        {
            key: "status",
            label: "Status",
            width: "7rem"
        }
    ];
    const sortIcon = (key)=>order.by !== key ? "↕" : order.dir === "asc" ? "▲" : "▼";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: styles.card,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: {
                            margin: 0
                        },
                        children: "Stocks Screener"
                    }, void 0, false, {
                        fileName: "[project]/capstone/components/StocksTable.tsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        role: "alert",
                        style: styles.badgeError,
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/capstone/components/StocksTable.tsx",
                        lineNumber: 163,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)) : loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: styles.badgeMuted,
                        children: "Loading…"
                    }, void 0, false, {
                        fileName: "[project]/capstone/components/StocksTable.tsx",
                        lineNumber: 167,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: styles.badgeOk,
                        children: "Live"
                    }, void 0, false, {
                        fileName: "[project]/capstone/components/StocksTable.tsx",
                        lineNumber: 169,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/capstone/components/StocksTable.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    overflowX: "auto"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    role: "grid",
                    style: styles.table,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: cols.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        scope: "col",
                                        style: {
                                            ...styles.th,
                                            width: c.width
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>onSort(order.by === c.key ? {
                                                    by: c.key,
                                                    dir: order.dir === "asc" ? "desc" : "asc"
                                                } : {
                                                    by: c.key,
                                                    dir: "asc"
                                                }),
                                            "aria-label": "Sort by ".concat(c.label),
                                            style: styles.sortBtn,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: c.label
                                                }, void 0, false, {
                                                    fileName: "[project]/capstone/components/StocksTable.tsx",
                                                    lineNumber: 191,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    "aria-hidden": "true",
                                                    style: styles.sortIcon,
                                                    children: sortIcon(c.key)
                                                }, void 0, false, {
                                                    fileName: "[project]/capstone/components/StocksTable.tsx",
                                                    lineNumber: 192,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/capstone/components/StocksTable.tsx",
                                            lineNumber: 179,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, c.key, false, {
                                        fileName: "[project]/capstone/components/StocksTable.tsx",
                                        lineNumber: 178,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/capstone/components/StocksTable.tsx",
                                lineNumber: 176,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/capstone/components/StocksTable.tsx",
                            lineNumber: 175,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: loading && rows.length === 0 ? Array.from({
                                length: 8
                            }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: cols.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                ...styles.td,
                                                ...c.numeric ? styles.tdNum : null
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: styles.skeleton
                                            }, void 0, false, {
                                                fileName: "[project]/capstone/components/StocksTable.tsx",
                                                lineNumber: 207,
                                                columnNumber: 25
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, String(c.key), false, {
                                            fileName: "[project]/capstone/components/StocksTable.tsx",
                                            lineNumber: 206,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, "skeleton-".concat(i), false, {
                                    fileName: "[project]/capstone/components/StocksTable.tsx",
                                    lineNumber: 204,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0))) : sorted.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    colSpan: cols.length,
                                    style: {
                                        ...styles.td,
                                        textAlign: "center",
                                        padding: "24px"
                                    },
                                    children: "No results."
                                }, void 0, false, {
                                    fileName: "[project]/capstone/components/StocksTable.tsx",
                                    lineNumber: 215,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/capstone/components/StocksTable.tsx",
                                lineNumber: 214,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)) : sorted.map((r)=>{
                                const { last, open, high, low } = r.price;
                                const mcap = r._derived.marketCap;
                                const chg = r._derived.changePct;
                                const chgColor = typeof chg === "number" ? chg > 0 ? "#065f46" // green
                                 : chg < 0 ? "#991b1b" // red
                                 : "#374151" : "#374151";
                                var _r_status;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    style: styles.row,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: styles.td,
                                            children: r.ticker
                                        }, void 0, false, {
                                            fileName: "[project]/capstone/components/StocksTable.tsx",
                                            lineNumber: 235,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: styles.td,
                                            children: r.companyName
                                        }, void 0, false, {
                                            fileName: "[project]/capstone/components/StocksTable.tsx",
                                            lineNumber: 236,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                ...styles.td,
                                                ...styles.tdNum
                                            },
                                            children: numberFmt(last)
                                        }, void 0, false, {
                                            fileName: "[project]/capstone/components/StocksTable.tsx",
                                            lineNumber: 237,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                ...styles.td,
                                                ...styles.tdNum,
                                                color: chgColor
                                            },
                                            children: typeof chg === "number" ? "".concat(chg.toFixed(2), "%") : "—"
                                        }, void 0, false, {
                                            fileName: "[project]/capstone/components/StocksTable.tsx",
                                            lineNumber: 240,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                ...styles.td,
                                                ...styles.tdNum
                                            },
                                            children: compactFmt(r.volume)
                                        }, void 0, false, {
                                            fileName: "[project]/capstone/components/StocksTable.tsx",
                                            lineNumber: 243,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                ...styles.td,
                                                ...styles.tdNum
                                            },
                                            children: compactFmt(mcap)
                                        }, void 0, false, {
                                            fileName: "[project]/capstone/components/StocksTable.tsx",
                                            lineNumber: 246,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                ...styles.td,
                                                ...styles.tdNum
                                            },
                                            children: numberFmt(open)
                                        }, void 0, false, {
                                            fileName: "[project]/capstone/components/StocksTable.tsx",
                                            lineNumber: 249,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                ...styles.td,
                                                ...styles.tdNum
                                            },
                                            children: numberFmt(high)
                                        }, void 0, false, {
                                            fileName: "[project]/capstone/components/StocksTable.tsx",
                                            lineNumber: 252,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                ...styles.td,
                                                ...styles.tdNum
                                            },
                                            children: numberFmt(low)
                                        }, void 0, false, {
                                            fileName: "[project]/capstone/components/StocksTable.tsx",
                                            lineNumber: 255,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: styles.td,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    ...styles.badgeTiny,
                                                    background: r.status === "Open" ? "#ecfdf5" : "#f3f4f6",
                                                    color: r.status === "Open" ? "#065f46" : "#374151",
                                                    borderColor: r.status === "Open" ? "#a7f3d0" : "#e5e7eb"
                                                },
                                                children: (_r_status = r.status) !== null && _r_status !== void 0 ? _r_status : "—"
                                            }, void 0, false, {
                                                fileName: "[project]/capstone/components/StocksTable.tsx",
                                                lineNumber: 259,
                                                columnNumber: 25
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/capstone/components/StocksTable.tsx",
                                            lineNumber: 258,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, r.id, true, {
                                    fileName: "[project]/capstone/components/StocksTable.tsx",
                                    lineNumber: 234,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0));
                            })
                        }, void 0, false, {
                            fileName: "[project]/capstone/components/StocksTable.tsx",
                            lineNumber: 201,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/capstone/components/StocksTable.tsx",
                    lineNumber: 174,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/capstone/components/StocksTable.tsx",
                lineNumber: 173,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/capstone/components/StocksTable.tsx",
        lineNumber: 159,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(StocksTable, "qOTpkjBqmIO96B7zNHAlY0e38tE=");
_c = StocksTable;
const styles = {
    card: {
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        padding: 16
    },
    header: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        justifyContent: "space-between",
        marginBottom: 12
    },
    table: {
        width: "100%",
        borderCollapse: "separate",
        borderSpacing: 0,
        fontSize: 14
    },
    th: {
        textAlign: "left",
        padding: "10px 12px",
        borderBottom: "1px solid #e5e7eb",
        background: "#f9fafb",
        position: "sticky",
        top: 0,
        zIndex: 1
    },
    sortBtn: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: 0,
        font: "inherit",
        color: "#111827"
    },
    sortIcon: {
        opacity: 0.6,
        fontSize: 12
    },
    td: {
        padding: "10px 12px",
        borderBottom: "1px solid #f3f4f6",
        color: "#111827",
        whiteSpace: "nowrap"
    },
    tdNum: {
        textAlign: "right",
        fontVariantNumeric: "tabular-nums"
    },
    row: {
        transition: "background 120ms"
    },
    badgeOk: {
        background: "#ecfdf5",
        color: "#065f46",
        border: "1px solid #a7f3d0",
        borderRadius: 999,
        padding: "4px 10px",
        fontSize: 12
    },
    badgeMuted: {
        background: "#f3f4f6",
        color: "#374151",
        border: "1px solid #e5e7eb",
        borderRadius: 999,
        padding: "4px 10px",
        fontSize: 12
    },
    badgeError: {
        background: "#fef2f2",
        color: "#991b1b",
        border: "1px solid #fecaca",
        borderRadius: 999,
        padding: "4px 10px",
        fontSize: 12
    },
    badgeTiny: {
        display: "inline-block",
        border: "1px solid",
        borderRadius: 999,
        padding: "2px 8px",
        fontSize: 12
    },
    skeleton: {
        height: 12,
        background: "linear-gradient(90deg, rgba(0,0,0,0.06), rgba(0,0,0,0.12), rgba(0,0,0,0.06))",
        backgroundSize: "200% 100%",
        borderRadius: 6,
        animation: "pulse 1.2s ease-in-out infinite"
    }
};
// one-time keyframes injection (safe in client components)
if (typeof document !== "undefined" && !document.getElementById("stocks-table-keyframes")) {
    const style = document.createElement("style");
    style.id = "stocks-table-keyframes";
    style.innerHTML = "\n  @keyframes pulse {\n    0% { background-position: 200% 0; }\n    100% { background-position: -200% 0; }\n  }";
    document.head.appendChild(style);
}
const __TURBOPACK__default__export__ = StocksTable;
var _c;
__turbopack_context__.k.register(_c, "StocksTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/capstone/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/capstone/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
    }
    var React = __turbopack_context__.r("[project]/capstone/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/capstone/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/capstone/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/capstone/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=capstone_d2bc862d._.js.map