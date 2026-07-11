# ShopNova

ShopNova is a Next.js-based e-commerce app generator. It lets a signed-in user configure a storefront by choosing a store name, theme palette, pages, and feature flags, then preview the result in a polished storefront mockup.

## What the app does

- Landing page that explains the product and routes users into sign-in or registration.
- Firebase-backed authentication with email/password and Google sign-in.
- Authenticated dashboard for starting a new store build.
- Step-by-step builder for app name, theme, pages, and features.
- Preview screen that renders the selected configuration and lets the user copy the config JSON.
- Profile and settings pages for account and preference management.

## Main routes

- `/` - Marketing landing page.
- `/auth/login` - Sign in.
- `/auth/register` - Create an account.
- `/dashboard` - Authenticated start page.
- `/builder` - Multi-step store configuration flow.
- `/preview` - Storefront preview and config summary.
- `/profile` - User account profile.
- `/settings` - Account, notification, appearance, and security settings.

## Tech stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn-style UI components and Radix primitives
- Framer Motion for transitions
- Firebase Auth and Firestore initialization
- Zustand for builder state
- Vercel Analytics

## Local setup

1. Install dependencies.
2. Create a local `.env` file or `.env.local` with the Firebase client config.
3. Run the dev server with `pnpm dev`.

### Required environment variables

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

## Security audit

This audit is based on the current workspace snapshot of the frontend only. There is no server API, no middleware, and no Firestore or Storage rules file in the repo snapshot, so the findings below focus on the actual control points present in the app.

### Findings

- High: protected routes are enforced only on the client. The dashboard, builder, preview, profile, and settings pages redirect unauthenticated users in `useEffect`, which means access control depends on client-side execution rather than a server-side guard. That is acceptable for a UI-only prototype, but it is not a strong security boundary if sensitive data or server actions are added later.
- Medium: Firebase is initialized in the frontend, but the repository does not include Firestore or Storage security rules. If persistence is added, access control will need to move into Firebase rules and schema validation, otherwise any future user data layer will be vulnerable to overbroad access.
- Low: auth errors are surfaced directly from Firebase into toast messages. This is common, but a production app should map known error codes to user-friendly messages and keep raw diagnostics out of the UI.
- Low: the preview feature copies the builder config to the clipboard. That is not a vulnerability by itself, but it should remain limited to non-sensitive configuration only.

### Positive observations

- I did not find direct XSS sinks in the app pages. User-provided values are rendered as text, not injected as HTML.
- The only `dangerouslySetInnerHTML` usage found in shared UI code is the chart style helper, which generates controlled CSS from component config rather than from arbitrary user HTML.
- The Firebase client config is exposed through `NEXT_PUBLIC_` variables, which is expected for a client SDK. No admin credentials or secrets should ever be placed in those variables.

### Hardening checklist

- Add server-side route protection or middleware if any sensitive data is introduced.
- Add Firestore and Storage rules before enabling persistence.
- Validate and normalize any future config payloads before saving or exporting them.
- Replace raw auth error strings with mapped messages.
- Keep secrets out of frontend environment variables and ensure local env files stay untracked.
