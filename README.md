<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/0729a59c-1a30-4dc0-a5b7-aeddbca81f48

## Run Locally

**Prerequisites:** Node.js

## Recommended Tools

- **Claude for Desktop:** For a better experience, you can install Claude for Desktop.
  ```powershell
  irm https://claude.ai/install.ps1 | iex
  ```
  Or run: `npm run install:claude`


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Contact leads and admin

Run the API server in a second terminal:

```powershell
npm run dev:server
```

Contact form submissions are saved through `POST /api/contact` and appear in the admin leads view at `/admin/contacts`.

For production, set these environment variables:

- `VITE_API_URL`: API base URL, for example `https://your-api-host.com/api` or `/api` when frontend and backend share an origin.
- `MONGODB_URI`, `MONGODB_DB`: MongoDB Atlas connection for permanent lead storage. When unset, leads use the local SQLite fallback.
- `DATABASE_URL`: persistent database path for the existing SQLite admin backend. Do not rely on local Vercel filesystem storage for permanent data.
- `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`: admin authentication settings.
- `LEAD_NOTIFICATION_EMAIL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`: optional email notifications for new leads.

On Vercel, keep `vercel.json` in the project root so React Router pages such as `/admin` resolve to `index.html` on direct visits.
