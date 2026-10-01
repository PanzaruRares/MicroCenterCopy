# Storefront on GitHub Pages

The site is a static frontend. GitHub Pages serves the HTML, CSS, and JavaScript; Supabase provides hosted authentication and the per-account cart database.

## Configure Supabase

1. Create a Supabase project.
2. Open the project SQL editor and run [`supabase/schema.sql`](./supabase/schema.sql). Row-level security limits each signed-in user to their own cart.
3. In Supabase Authentication settings, enable email/password sign-in, choose the email-confirmation behavior you want, set the site URL to the eventual GitHub Pages URL, and add the GitHub Pages URL (including the project path, if applicable) to the allowed redirect URLs.
4. Copy the project URL and the **publishable/anon client key**. Never use a `service_role` or secret key in this static site.

## Deploy with GitHub Pages

The repository needs the workflow at `.github/workflows/pages.yml`. It deploys only the storefront assets from `V1/`; it does not upload the local server, tests, or `data/` directory.

1. Push this project to a GitHub repository.
2. In that repository, open **Settings → Secrets and variables → Actions → Variables** and add:
   - `SUPABASE_URL`: the project URL, such as `https://your-project.supabase.co`.
   - `SUPABASE_ANON_KEY`: the project’s public publishable/anon client key. It is included in the website bundle and is not a secret.
3. Open **Settings → Pages** and select **GitHub Actions** as the deployment source.
4. Push to `main` or `master`, or run the **Deploy storefront to GitHub Pages** workflow manually.

The workflow generates `supabase-config.js` in the Pages artifact using those variables. Missing variables leave account sync unconfigured, with a message in the Account menu.

## Local preview

Use Node.js 18 or newer:

```powershell
npm start
```

Open <http://localhost:4173>. To test accounts and online cart sync locally, copy the project URL and public key into `supabase-config.js` first. The preview server is loopback-only and is not a production backend.

Run the static build and preview tests with:

```powershell
npm test
```

## Authentication and cart notes

The Supabase browser SDK handles email/password sign-in, email confirmation, and session persistence. In this static setup, the SDK persists its auth session in browser storage; it is not an HTTP-only cookie. Do not place secret keys in the frontend.

Guest carts remain in the visitor’s browser. After sign-in, the guest cart is merged into that user’s Supabase cart. Signed-in carts are restored from Supabase on return and are protected by row-level security.

This demo has no real checkout. Product prices still originate in the static catalog, so do not use these cart values for payment or order fulfillment. Real commerce needs server-verified prices and a payment/order backend.

The previous local SQLite account data is not migrated to Supabase. Do not upload the local `data/` directory; it is ignored by Git.
