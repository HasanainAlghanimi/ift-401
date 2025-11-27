(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/ift-401/app/account/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AccountPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ift-401/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ift-401/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ift-401/lib/supabaseClient.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function AccountPage() {
    _s();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [account, setAccount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        accountId: null,
        balance: 0,
        availableBalance: 0
    });
    const [depositAmount, setDepositAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [withdrawAmount, setWithdrawAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Load account for the current demo_session email
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AccountPage.useEffect": ()=>{
            const load = {
                "AccountPage.useEffect.load": async ()=>{
                    try {
                        setError(null);
                        setMessage(null);
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
                            setError("No session email found. Please sign in again.");
                            return;
                        }
                        // users -> user_id
                        const { data: userRows, error: userError } = await __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("users").select("user_id").eq("email", email).limit(1);
                        if (userError) {
                            console.error("user lookup error:", userError);
                            setError("Could not load user record for this email.");
                            return;
                        }
                        if (!userRows || userRows.length === 0) {
                            setError("No user record found for this email in the users table.");
                            return;
                        }
                        const userId = userRows[0].user_id;
                        // account -> balances
                        const { data: accRows, error: accError } = await __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("account").select("account_id, balance, available_balance").eq("user_id", userId).limit(1);
                        if (accError) {
                            console.error("account lookup error:", accError);
                            setError("Could not load account for this user.");
                            return;
                        }
                        if (!accRows || accRows.length === 0) {
                            setError("No account row found for this user. Create one in Supabase (account.user_id = users.user_id).");
                            return;
                        }
                        const row = accRows[0];
                        setAccount({
                            accountId: row.account_id,
                            balance: Number(row.balance) || 0,
                            availableBalance: Number(row.available_balance) || 0
                        });
                    } catch (e) {
                        console.error("load account error:", e);
                        setError("Failed to load account.");
                    } finally{
                        setLoading(false);
                    }
                }
            }["AccountPage.useEffect.load"];
            load();
        }
    }["AccountPage.useEffect"], []);
    const handleDeposit = async ()=>{
        setError(null);
        setMessage(null);
        const amt = Number(depositAmount);
        if (!account.accountId) {
            setError("No account loaded.");
            return;
        }
        if (!amt || amt <= 0) {
            setError("Enter a positive deposit amount.");
            return;
        }
        try {
            const newBalance = account.balance + amt;
            const newAvailable = account.availableBalance + amt;
            const { error: updateError } = await __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("account").update({
                balance: newBalance,
                available_balance: newAvailable
            }).eq("account_id", account.accountId);
            if (updateError) {
                console.error("deposit update error:", updateError);
                setError("Deposit failed.");
                return;
            }
            setAccount((prev)=>({
                    ...prev,
                    balance: newBalance,
                    availableBalance: newAvailable
                }));
            setDepositAmount("");
            setMessage("Deposited $".concat(amt.toFixed(2), " successfully."));
            // notify navbar
            if ("TURBOPACK compile-time truthy", 1) {
                window.dispatchEvent(new CustomEvent("demo-balance-changed", {
                    detail: {
                        availableBalance: newAvailable
                    }
                }));
            }
        } catch (e) {
            console.error("deposit error:", e);
            setError("Deposit failed.");
        }
    };
    const handleWithdraw = async ()=>{
        setError(null);
        setMessage(null);
        const amt = Number(withdrawAmount);
        if (!account.accountId) {
            setError("No account loaded.");
            return;
        }
        if (!amt || amt <= 0) {
            setError("Enter a positive withdrawal amount.");
            return;
        }
        if (amt > account.availableBalance) {
            setError("You cannot withdraw more than your available balance.");
            return;
        }
        try {
            const newBalance = account.balance - amt;
            const newAvailable = account.availableBalance - amt;
            const { error: updateError } = await __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("account").update({
                balance: newBalance,
                available_balance: newAvailable
            }).eq("account_id", account.accountId);
            if (updateError) {
                console.error("withdraw update error:", updateError);
                setError("Withdrawal failed.");
                return;
            }
            setAccount((prev)=>({
                    ...prev,
                    balance: newBalance,
                    availableBalance: newAvailable
                }));
            setWithdrawAmount("");
            setMessage("Withdrew $".concat(amt.toFixed(2), " successfully."));
            // notify navbar
            if ("TURBOPACK compile-time truthy", 1) {
                window.dispatchEvent(new CustomEvent("demo-balance-changed", {
                    detail: {
                        availableBalance: newAvailable
                    }
                }));
            }
        } catch (e) {
            console.error("withdraw error:", e);
            setError("Withdrawal failed.");
        }
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "page accountpage container",
            style: {
                paddingTop: 24,
                paddingBottom: 24
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    children: "Account"
                }, void 0, false, {
                    fileName: "[project]/ift-401/app/account/page.tsx",
                    lineNumber: 223,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "Loading your account…"
                }, void 0, false, {
                    fileName: "[project]/ift-401/app/account/page.tsx",
                    lineNumber: 224,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/ift-401/app/account/page.tsx",
            lineNumber: 219,
            columnNumber: 7
        }, this);
    }
    const buttonsDisabled = !account.accountId;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "page accountpage container",
        style: {
            paddingTop: 24,
            paddingBottom: 24,
            maxWidth: 900,
            margin: "0 auto"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "accountpage__title",
                children: "Account"
            }, void 0, false, {
                fileName: "[project]/ift-401/app/account/page.tsx",
                lineNumber: 236,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "accountpage__subtitle",
                children: "Manage your cash balance for trading (linked to your user record)."
            }, void 0, false, {
                fileName: "[project]/ift-401/app/account/page.tsx",
                lineNumber: 237,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "account-alert account-alert--error",
                children: error
            }, void 0, false, {
                fileName: "[project]/ift-401/app/account/page.tsx",
                lineNumber: 242,
                columnNumber: 9
            }, this),
            message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "account-alert account-alert--ok",
                children: message
            }, void 0, false, {
                fileName: "[project]/ift-401/app/account/page.tsx",
                lineNumber: 248,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "account-grid",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card accountcard",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Balances"
                            }, void 0, false, {
                                fileName: "[project]/ift-401/app/account/page.tsx",
                                lineNumber: 256,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "account-label",
                                children: "Cash balance"
                            }, void 0, false, {
                                fileName: "[project]/ift-401/app/account/page.tsx",
                                lineNumber: 257,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "account-value",
                                children: "$".concat(account.balance.toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                }))
                            }, void 0, false, {
                                fileName: "[project]/ift-401/app/account/page.tsx",
                                lineNumber: 258,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "account-label",
                                style: {
                                    marginTop: 12
                                },
                                children: "Available to trade"
                            }, void 0, false, {
                                fileName: "[project]/ift-401/app/account/page.tsx",
                                lineNumber: 265,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "account-value",
                                children: "$".concat(account.availableBalance.toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                }))
                            }, void 0, false, {
                                fileName: "[project]/ift-401/app/account/page.tsx",
                                lineNumber: 268,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ift-401/app/account/page.tsx",
                        lineNumber: 255,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card accountcard accountcard--actions",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: "Deposit"
                                    }, void 0, false, {
                                        fileName: "[project]/ift-401/app/account/page.tsx",
                                        lineNumber: 279,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "account-inputrow",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                min: "0",
                                                step: "0.01",
                                                value: depositAmount,
                                                onChange: (e)=>setDepositAmount(e.target.value),
                                                placeholder: "Amount",
                                                className: "account-input"
                                            }, void 0, false, {
                                                fileName: "[project]/ift-401/app/account/page.tsx",
                                                lineNumber: 281,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: handleDeposit,
                                                className: "btn btn--primary",
                                                disabled: buttonsDisabled,
                                                children: "Deposit"
                                            }, void 0, false, {
                                                fileName: "[project]/ift-401/app/account/page.tsx",
                                                lineNumber: 290,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/ift-401/app/account/page.tsx",
                                        lineNumber: 280,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ift-401/app/account/page.tsx",
                                lineNumber: 278,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: "Withdraw"
                                    }, void 0, false, {
                                        fileName: "[project]/ift-401/app/account/page.tsx",
                                        lineNumber: 302,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "account-inputrow",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                min: "0",
                                                step: "0.01",
                                                value: withdrawAmount,
                                                onChange: (e)=>setWithdrawAmount(e.target.value),
                                                placeholder: "Amount",
                                                className: "account-input"
                                            }, void 0, false, {
                                                fileName: "[project]/ift-401/app/account/page.tsx",
                                                lineNumber: 304,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: handleWithdraw,
                                                className: "btn btn--ghost",
                                                disabled: buttonsDisabled,
                                                children: "Withdraw"
                                            }, void 0, false, {
                                                fileName: "[project]/ift-401/app/account/page.tsx",
                                                lineNumber: 313,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/ift-401/app/account/page.tsx",
                                        lineNumber: 303,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ift-401/app/account/page.tsx",
                                lineNumber: 301,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ift-401/app/account/page.tsx",
                        lineNumber: 277,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/ift-401/app/account/page.tsx",
                lineNumber: 253,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/ift-401/app/account/page.tsx",
        lineNumber: 232,
        columnNumber: 5
    }, this);
}
_s(AccountPage, "u1SVAk7VSq9atzzsd+A4AS1917k=");
_c = AccountPage;
var _c;
__turbopack_context__.k.register(_c, "AccountPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=ift-401_app_account_page_tsx_0a478d46._.js.map