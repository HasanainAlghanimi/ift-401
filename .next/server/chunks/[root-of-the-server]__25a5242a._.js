module.exports = [
"[project]/ift-401/.next-internal/server/app/api/account/create/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[project]/ift-401/lib/supabaseServer.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabaseServer",
    ()=>supabaseServer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ift-401/node_modules/@supabase/supabase-js/dist/module/index.js [app-route] (ecmascript) <locals>");
;
const supabaseServer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://siqtnyyhufhclycnplrd.supabase.co"), process.env.SUPABASE_SERVICE_ROLE_KEY);
}),
"[project]/ift-401/app/api/account/create/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/api/account/create/route.ts
__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ift-401/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$supabaseServer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ift-401/lib/supabaseServer.ts [app-route] (ecmascript)");
;
;
async function POST(req) {
    try {
        const { email, name, accountType } = await req.json();
        if (!email) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'email is required'
            }, {
                status: 400
            });
        }
        // Map front-end accountType to your existing user_type values
        const userType = accountType === 'admin' ? 'Admin' : 'Customer';
        // Split "Full name" best-effort into first/last
        let firstName = null;
        let lastName = null;
        if (name && name.trim()) {
            const parts = name.trim().split(' ');
            firstName = parts[0] ?? null;
            lastName = parts.slice(1).join(' ') || null;
        }
        const username = email.split('@')[0];
        // 1) Upsert into public.users by email (this part is working for you)
        const { data: userRow, error: userError } = await __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$supabaseServer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabaseServer"].from('users').upsert({
            email,
            username,
            password: 'supabase_auth',
            first_name: firstName,
            last_name: lastName,
            user_type: userType
        }, {
            onConflict: 'email'
        }).select('user_id, user_type').single();
        if (userError) {
            console.error('Create users row error:', userError);
            return __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: userError.message
            }, {
                status: 400
            });
        }
        const userIdInt = userRow.user_id;
        // Generate a simple account number like ACC000011
        const accountNumber = `ACC${String(userIdInt).padStart(6, '0')}`;
        // 2) INSERT into public.account (no onConflict)
        const { data: accountRow, error: accountError } = await __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$lib$2f$supabaseServer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabaseServer"].from('account').insert({
            user_id: userIdInt,
            account_number: accountNumber,
            balance: 0,
            available_balance: 0,
            pending_deposits: 0,
            pending_withdrawals: 0
        }).select('account_id, user_id, balance, available_balance').single();
        if (accountError) {
            console.error('Create account row error:', accountError);
            return __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: accountError.message
            }, {
                status: 400
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            user: userRow,
            account: accountRow
        }, {
            status: 200
        });
    } catch (err) {
        console.error('Create account API error:', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$ift$2d$401$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__25a5242a._.js.map