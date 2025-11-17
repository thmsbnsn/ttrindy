# Live Preview Setup (Optional)

Live preview allows content editors to see draft changes in real-time on the website while editing in Sanity Studio.

## Current Status

Live preview is currently **disabled** to avoid import errors. The Sanity Studio works perfectly without it.

## To Enable Live Preview Later

1. Install the correct preview package:
   ```bash
   npm install @sanity/preview-url-secret
   ```

2. Update `sanity.config.ts` with the correct import:
   ```ts
   import { definePreviewUrl } from '@sanity/preview-url-secret/define-preview-url'
   ```

3. Configure in your React app (not in sanity.config.ts):
   - Set up preview mode in your data fetching functions
   - Use the preview client when `?preview=true` is in the URL

## Alternative: Use Sanity's Built-in Preview

Sanity v3 has built-in preview capabilities that don't require additional plugins. You can:
- Use the "Open Preview" button in Sanity Studio
- Configure preview URLs in Sanity project settings
- Use the `usePreview` hook in your React components

## Resources

- [Sanity Preview Documentation](https://www.sanity.io/docs/preview-urls)
- [Visual Editing Guide](https://www.sanity.io/docs/visual-editing)

