# Setup Commands - Run These in Order

## 1. Install Dependencies
```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force
npm install
```

## 2. Authenticate with Sanity (Required for first time)
```powershell
npm run sanity -- login
```
This will open a browser window for authentication.

## 3. Initialize Sanity Studio (if needed)
The configuration files are already created, but you may need to authenticate:
```powershell
npm run sanity -- init
```
Or if you prefer the interactive setup:
```powershell
npm create sanity@latest
```
Then select:
- Project ID: `o2ba67uq`
- Dataset: `production`
- Template: `clean`

## 4. Start Development Server
```powershell
npm run dev
```
Website will be available at: http://localhost:8080

## 5. Start Sanity Studio (in a separate terminal)
```powershell
npm run sanity:dev
```
Studio will be available at: http://localhost:3333/studio

## 6. Deploy Sanity Studio (when ready)
```powershell
npm run sanity:deploy
```

## Environment Variables Required

Make sure your `.env` file contains:
```
VITE_SANITY_PROJECT_ID=o2ba67uq
VITE_SANITY_DATASET=production
VITE_SANITY_PREVIEW_SECRET=preview.secret
VITE_SANITY_PREVIEW_TOKEN=your_token_here
RESEND_API_KEY=your_resend_key
```

## Notes

- The Sanity configuration files are already created in the `sanity/` directory
- You only need to authenticate with Sanity once
- The studio can be accessed at `/studio` path when deployed
- Auto-deploy is configured through Vercel webhooks

