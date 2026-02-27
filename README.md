This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Set the following variables before running the payment-enabled tools:

```bash
PAYSTACK_SECRET_KEY=your_paystack_secret
NEXT_PUBLIC_CV_PRICE_GHS=50
```

Set the following variables to enable Firebase account/data storage (service account credentials):

```bash
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

Set the following variables to enable the admin dashboard and Google Sheets integrations:

```bash
ADMIN_EMAIL=123@example.com
ADMIN_PASSWORD=123456

# Single webhook for all admin actions (recommended)
GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/your-web-app-id/exec

# Optional sheet-specific webhooks (override GOOGLE_SHEET_WEBHOOK_URL when set)
GOOGLE_SHEET_EMAIL_WEBHOOK_URL=https://script.google.com/macros/s/email-sheet/exec
GOOGLE_SHEET_CLIENT_WEBHOOK_URL=https://script.google.com/macros/s/client-sheet/exec
GOOGLE_SHEET_RECEIPT_WEBHOOK_URL=https://script.google.com/macros/s/receipt-sheet/exec
GOOGLE_SHEET_STATUS_WEBHOOK_URL=https://script.google.com/macros/s/status-sheet/exec
```

Admin dashboard route:

```bash
/admin
```

## Maintenance & Scalability

### Automated checks
- Run `npm run lint` for linting.
- Run `npm test` to validate content JSON structures used by the UI.
- The GitHub Actions workflow at `.github/workflows/ci.yml` runs both checks on every push and pull request.

### Content management
The site content in `src/content/` centralizes data like feature cards and pathway guidance. This makes it easier to swap in a headless CMS (e.g., Strapi or Contentful) later by replacing these JSON imports with CMS fetches, so non-developers can update eligibility criteria, timelines, and guidance without code changes.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
