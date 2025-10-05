(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/capstone/components/PageHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/PageHeader.tsx
__turbopack_context__.s([
    "default",
    ()=>PageHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/capstone/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function PageHeader(param) {
    let { title, subtitle, actions } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "pageheader",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pageheader__text",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/capstone/components/PageHeader.tsx",
                        lineNumber: 10,
                        columnNumber: 9
                    }, this),
                    subtitle ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: subtitle
                    }, void 0, false, {
                        fileName: "[project]/capstone/components/PageHeader.tsx",
                        lineNumber: 11,
                        columnNumber: 21
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/capstone/components/PageHeader.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            actions ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pageheader__actions",
                children: actions
            }, void 0, false, {
                fileName: "[project]/capstone/components/PageHeader.tsx",
                lineNumber: 13,
                columnNumber: 18
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/capstone/components/PageHeader.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = PageHeader;
var _c;
__turbopack_context__.k.register(_c, "PageHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/capstone/components/SearchBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/SearchBar.tsx
__turbopack_context__.s([
    "default",
    ()=>SearchBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/capstone/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function SearchBar(param) {
    let { value, onChange, placeholder = "Search stocks…" } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "searchbar",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "text",
            value: value,
            onChange: (e)=>onChange(e.target.value),
            className: "searchbar__input",
            placeholder: placeholder,
            "aria-label": "Search stocks by symbol or name"
        }, void 0, false, {
            fileName: "[project]/capstone/components/SearchBar.tsx",
            lineNumber: 14,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/capstone/components/SearchBar.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = SearchBar;
var _c;
__turbopack_context__.k.register(_c, "SearchBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
                        children: "Stocks Table"
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
"[project]/capstone/components/AuthedHome.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/AuthedHome.tsx
__turbopack_context__.s([
    "default",
    ()=>AuthedHome
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/capstone/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/capstone/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$components$2f$PageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/capstone/components/PageHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$components$2f$SearchBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/capstone/components/SearchBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$components$2f$StocksTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/capstone/components/StocksTable.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function AuthedHome() {
    _s();
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [order, setOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        by: "ticker",
        dir: "asc"
    });
    const rows = [
        {
            id: "AAPL",
            ticker: "AAPL",
            companyName: "Apple Inc.",
            volume: 72_300_000,
            price: {
                last: 174.22,
                open: 173.0,
                high: 176.2,
                low: 172.8,
                prevClose: 173.5
            },
            status: "Open"
        },
        {
            id: "AMZN",
            ticker: "AMZN",
            companyName: "Amazon.com Inc.",
            volume: 54_200_000,
            price: {
                last: 132.47,
                open: 131.2,
                high: 133.5,
                low: 130.9,
                prevClose: 131.8
            },
            status: "Open"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$components$2f$PageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: "Welcome to Callisto",
                subtitle: "Practice buying and selling stocks with a simulated market.",
                actions: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$components$2f$SearchBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    value: search,
                    onChange: setSearch
                }, void 0, false, {
                    fileName: "[project]/capstone/components/AuthedHome.tsx",
                    lineNumber: 25,
                    columnNumber: 18
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/capstone/components/AuthedHome.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "spaced",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$capstone$2f$components$2f$StocksTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    rows: rows,
                    order: order,
                    onSort: setOrder,
                    searchTerm: search
                }, void 0, false, {
                    fileName: "[project]/capstone/components/AuthedHome.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/capstone/components/AuthedHome.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(AuthedHome, "dKFc03VxxnigUxZqAkDm7kFZwww=");
_c = AuthedHome;
var _c;
__turbopack_context__.k.register(_c, "AuthedHome");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=capstone_components_c9597b2e._.js.map