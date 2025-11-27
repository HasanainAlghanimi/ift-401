(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/ift-401/lib/useDemoSession.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDemoSession",
    ()=>useDemoSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ift-401/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function readSession() {
    try {
        return JSON.parse(localStorage.getItem("demo_session") || "null");
    } catch (e) {
        return null;
    }
}
function useDemoSession() {
    _s();
    const [session, setSession] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useDemoSession.useEffect": ()=>{
            const sync = {
                "useDemoSession.useEffect.sync": ()=>{
                    setSession(readSession());
                    setReady(true);
                }
            }["useDemoSession.useEffect.sync"];
            sync();
            const onStorage = {
                "useDemoSession.useEffect.onStorage": (e)=>{
                    if (!e.key || e.key === "demo_session") {
                        setSession(readSession());
                    }
                }
            }["useDemoSession.useEffect.onStorage"];
            const onAuthChanged = {
                "useDemoSession.useEffect.onAuthChanged": ()=>setSession(readSession())
            }["useDemoSession.useEffect.onAuthChanged"];
            const onVis = {
                "useDemoSession.useEffect.onVis": ()=>{
                    if (document.visibilityState === "visible") setSession(readSession());
                }
            }["useDemoSession.useEffect.onVis"];
            window.addEventListener("storage", onStorage);
            window.addEventListener("demo-auth-changed", onAuthChanged);
            document.addEventListener("visibilitychange", onVis);
            return ({
                "useDemoSession.useEffect": ()=>{
                    window.removeEventListener("storage", onStorage);
                    window.removeEventListener("demo-auth-changed", onAuthChanged);
                    document.removeEventListener("visibilitychange", onVis);
                }
            })["useDemoSession.useEffect"];
        }
    }["useDemoSession.useEffect"], []);
    return {
        session,
        isLoggedIn: !!session,
        ready
    };
}
_s(useDemoSession, "FyVQmE5cxdmkxhj8Ld6PKe5j/sc=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/ift-401/lib/supabaseClient.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ift-401/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ift-401/node_modules/@supabase/supabase-js/dist/module/index.js [app-client] (ecmascript) <locals>");
'use client';
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://siqtnyyhufhclycnplrd.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpcXRueXlodWZoY2x5Y25wbHJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MDAwMzksImV4cCI6MjA3NjA3NjAzOX0.U0iey_l_ljb628np-J8O7B_N6mw9DuXX7yjykrboPbI"));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/ift-401/components/NavBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NavBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ift-401/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ift-401/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ift-401/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ift-401/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$useDemoSession$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ift-401/lib/useDemoSession.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ift-401/lib/supabaseClient.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const links = [
    {
        href: "/",
        label: "Home"
    },
    {
        href: "/stocks",
        label: "Stocks"
    },
    {
        href: "/trade",
        label: "Trade",
        authOnly: true
    },
    {
        href: "/portfolio",
        label: "Portfolio",
        authOnly: true
    },
    {
        href: "/history",
        label: "History",
        authOnly: true
    },
    {
        href: "/account",
        label: "Account",
        authOnly: true
    },
    {
        href: "/admin",
        label: "Admin",
        authOnly: true
    }
];
function NavBar() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { isLoggedIn } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$useDemoSession$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDemoSession"])();
    const [mounted, setMounted] = __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [balance, setBalance] = __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(null);
    __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "NavBar.useEffect": ()=>{
            setMounted(true);
        }
    }["NavBar.useEffect"], []);
    __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "NavBar.useEffect": ()=>{
            if (!mounted || !isLoggedIn) return;
            const loadBalanceForUser = {
                "NavBar.useEffect.loadBalanceForUser": async ()=>{
                    try {
                        // 1) Get email from demo_session
                        let email = null;
                        if ("TURBOPACK compile-time truthy", 1) {
                            try {
                                const raw = window.localStorage.getItem("demo_session");
                                if (raw) {
                                    const parsed = JSON.parse(raw);
                                    var _parsed_email;
                                    email = (_parsed_email = parsed.email) !== null && _parsed_email !== void 0 ? _parsed_email : null;
                                }
                            } catch (e) {
                                email = null;
                            }
                        }
                        if (!email) {
                            setBalance(0);
                            return;
                        }
                        // 2) Look up user_id
                        const { data: userRows, error: userError } = await __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("users").select("user_id").eq("email", email).limit(1);
                        if (userError || !userRows || userRows.length === 0) {
                            setBalance(0);
                            return;
                        }
                        const userId = userRows[0].user_id;
                        // 3) Look up that user's account
                        const { data: accRows, error: accError } = await __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("account").select("available_balance").eq("user_id", userId).limit(1);
                        if (accError || !accRows || accRows.length === 0) {
                            setBalance(0);
                            return;
                        }
                        setBalance(Number(accRows[0].available_balance) || 0);
                    } catch (e) {
                        setBalance(0);
                    }
                }
            }["NavBar.useEffect.loadBalanceForUser"];
            loadBalanceForUser();
            const handler = {
                "NavBar.useEffect.handler": (event)=>{
                    const e = event;
                    if (e.detail && typeof e.detail.availableBalance === "number") {
                        setBalance(e.detail.availableBalance);
                    } else {
                        loadBalanceForUser();
                    }
                }
            }["NavBar.useEffect.handler"];
            window.addEventListener("demo-balance-changed", handler);
            return ({
                "NavBar.useEffect": ()=>window.removeEventListener("demo-balance-changed", handler)
            })["NavBar.useEffect"];
        }
    }["NavBar.useEffect"], [
        mounted,
        isLoggedIn
    ]);
    const handleLogout = ()=>{
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.removeItem("demo_session");
            window.dispatchEvent(new Event("demo-auth-changed"));
        }
        router.refresh();
    };
    const formattedBalance = mounted && isLoggedIn && balance !== null ? "$".concat(balance.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })) : "$0.00";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "nav",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "nav__inner",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/",
                    className: "brand",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "brand__logo",
                            children: "🌕"
                        }, void 0, false, {
                            fileName: "[project]/ift-401/components/NavBar.tsx",
                            lineNumber: 119,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "brand__name",
                            children: "Callisto"
                        }, void 0, false, {
                            fileName: "[project]/ift-401/components/NavBar.tsx",
                            lineNumber: 120,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/ift-401/components/NavBar.tsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "nav__links",
                    "aria-label": "Primary",
                    children: mounted && links.filter((l)=>!l.authOnly || isLoggedIn).map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: l.href,
                            className: "nav__link",
                            children: l.label
                        }, l.href, false, {
                            fileName: "[project]/ift-401/components/NavBar.tsx",
                            lineNumber: 128,
                            columnNumber: 17
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/ift-401/components/NavBar.tsx",
                    lineNumber: 123,
                    columnNumber: 9
                }, this),
                mounted && isLoggedIn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginLeft: "1rem",
                        marginRight: "1rem",
                        padding: "4px 12px",
                        borderRadius: 999,
                        background: "#333",
                        fontSize: "0.85rem"
                    },
                    children: formattedBalance
                }, void 0, false, {
                    fileName: "[project]/ift-401/components/NavBar.tsx",
                    lineNumber: 135,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "nav__actions",
                    children: mounted && (isLoggedIn ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleLogout,
                        className: "btn btn--ghost",
                        children: "Log out"
                    }, void 0, false, {
                        fileName: "[project]/ift-401/components/NavBar.tsx",
                        lineNumber: 152,
                        columnNumber: 15
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/signin",
                                className: "btn btn--ghost",
                                children: "Sign in"
                            }, void 0, false, {
                                fileName: "[project]/ift-401/components/NavBar.tsx",
                                lineNumber: 157,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/signup",
                                className: "btn btn--primary",
                                children: "Sign up"
                            }, void 0, false, {
                                fileName: "[project]/ift-401/components/NavBar.tsx",
                                lineNumber: 159,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true))
                }, void 0, false, {
                    fileName: "[project]/ift-401/components/NavBar.tsx",
                    lineNumber: 149,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/ift-401/components/NavBar.tsx",
            lineNumber: 117,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/ift-401/components/NavBar.tsx",
        lineNumber: 116,
        columnNumber: 5
    }, this);
}
_s(NavBar, "uo70NRtyMMuStEX1GRa2hkrGmaY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$useDemoSession$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDemoSession"]
    ];
});
_c = NavBar;
var _c;
__turbopack_context__.k.register(_c, "NavBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=ift-401_30a2d6dc._.js.map