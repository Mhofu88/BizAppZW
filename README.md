# BizAppZW
Get a custom business app built fast, or list your products &amp; services for customers to find to pay using fiat and crypto currencies like Pi — all on BizApp ZW. With option to select a suitable app package to include domain registrations, management and Pi Ecosystem Apps.

# BizApp ZW — Backend Integration (Updated)

This replaces the earlier version — the admin-facing parts now use your
existing `x-admin-key` system instead of a separate login, so everything
matches your real admin.html.

## Files and where they go

| File | Destination |
|---|---|
| `redis-client.js` | Chigalex1-backend (already added) |
| `auth.js` | Chigalex1-backend (already added) — customer login for people creating listings |
| `subscriptions-admin.js` | Chigalex1-backend — **new** |
| `listings.js` | Chigalex1-backend — **replace existing** |
| `payments.js` | Chigalex1-backend — **replace existing** |
| `admin-bizapp-section.html` | Not a file to upload — instructions for pasting into `admin.html` (3 pieces, see the file itself) |

## Wiring into server.js

```js
const { router: subscriptionsRouter } = require("./subscriptions-admin");
const listingsRouter = require("./listings");
const paymentsRouter = require("./payments");
const { router: authRouter } = require("./auth");

app.use("/", subscriptionsRouter);   // exposes /pricing and /admin/subscriptions etc.
app.use("/listings", listingsRouter);
app.use("/payments", paymentsRouter);
app.use("/auth", authRouter);
```

## Important — confirm your ADMIN_KEY env var name

Your admin.html sends the header `x-admin-key` on login and every admin
call. `subscriptions-admin.js` checks that header against
`process.env.ADMIN_KEY`. Please confirm that's the exact environment
variable name already set on Render for your existing admin routes — if
it's named something else (e.g. `ADMIN_SECRET`), tell me and I'll adjust
`subscriptions-admin.js` to match, otherwise the BizApp ZW admin tab will
get "unauthorized" even with the correct key.

## Two authentication systems, on purpose

- **Customers** (people listing their business) register/log in via
  `/auth/register` and `/auth/login` — JWT-based, defined in `auth.js`.
  This is what `listings.html` on the public site uses.
- **You** (admin) keep using your existing `x-admin-key` login in
  `admin.html` — nothing changes there except the new BizApp ZW tab now
  calls a few new endpoints with that same key.

## Flow end to end

1. Customer registers/logs in on `listings.html`, creates a listing (starts `pending`)
2. Customer picks a plan, sends EcoCash payment, submits the reference
3. You review it in **admin.html → BizApp ZW tab → Pending Listing Payments**
4. Approve — listing goes `active`, using that plan's duration/adverts from
   **Subscription Plans** (edit rates/durations/adverts there any time)



