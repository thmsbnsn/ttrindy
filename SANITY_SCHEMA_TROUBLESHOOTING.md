# 🔧 Sanity Schema Troubleshooting Guide

If your new schemas aren't showing up in Sanity Studio, follow these steps:

## Step 1: Restart Sanity Studio

**This is the most common fix!**

1. **Stop** the Sanity Studio server (press `Ctrl+C` in the terminal)
2. **Restart** it:
   ```bash
   npm run sanity:dev
   ```
3. **Wait** for it to fully load (you'll see "Studio is running at...")
4. **Refresh** your browser (hard refresh: `Ctrl+F5` or `Cmd+Shift+R`)

## Step 2: Check for Console Errors

1. Open browser **Developer Tools** (F12)
2. Go to the **Console** tab
3. Look for any **red errors** related to schemas
4. Common errors:
   - `Cannot find module...` - Import path issue
   - `TypeError...` - Schema syntax error
   - `ReferenceError...` - Missing dependency

## Step 3: Verify Schema Files Exist

Check that all these files exist:

```
sanity/schemas/
├── objects/
│   ├── navigationItem.ts ✅
│   ├── serviceCard.ts ✅
│   ├── featureCard.ts ✅
│   ├── statCard.ts ✅
│   └── seoFields.ts ✅
├── singletons/
│   ├── homePage.ts ✅
│   ├── aboutPage.ts ✅
│   └── servicesPage.ts ✅
├── index.ts ✅
├── siteSettings.ts ✅
├── project.ts ✅
├── blogPost.ts ✅
└── category.ts ✅
```

## Step 4: Check Schema Index File

The `sanity/schemas/index.ts` file should:
- Import all object types **first**
- Import all document types **second**
- Import all singletons **last**
- Export them in the same order

## Step 5: Verify Sanity Config

Check `sanity.config.ts`:
- Should import `schemaTypes` from `'./sanity/schemas'`
- Should have `schema: { types: schemaTypes }`

## Step 6: Clear Sanity Cache

Sometimes cached files cause issues:

```bash
# Stop Sanity Studio first (Ctrl+C)

# Clear cache
npm run clean

# Restart
npm run sanity:dev
```

## Step 7: Check for TypeScript Errors

Run TypeScript check:

```bash
npx tsc --noEmit
```

If there are errors, fix them before restarting Sanity Studio.

## Step 8: Deploy Schemas (If Using Deployed Studio)

If you're using a deployed Sanity Studio:

```bash
npm run sanity:deploy
```

## Common Issues & Solutions

### Issue: "Cannot find module './singletons/homePage'"

**Solution**: Check file paths are correct. All imports should match actual file locations.

### Issue: "Type 'X' is not assignable to type 'Y'"

**Solution**: Check that object types are imported before document types that use them.

### Issue: Schemas show in Studio but can't create documents

**Solution**:
- Check that singletons have `__experimental_actions: ['update', 'publish']`
- Verify document IDs match structure.ts expectations

### Issue: "Icon is not a function"

**Solution**: Icons should be:
- Emoji: `icon: () => '🏠'`
- Or React component (if lucide-react is installed in Sanity)

## Still Not Working?

1. **Check the terminal** where Sanity Studio is running for errors
2. **Check browser console** for runtime errors
3. **Verify** all imports in `sanity/schemas/index.ts` are correct
4. **Try** creating a simple test schema to see if the issue is specific to certain schemas

## Quick Test

Create a simple test schema to verify the setup works:

```typescript
// sanity/schemas/test.ts
import { defineType } from 'sanity'

export default defineType({
  name: 'test',
  title: 'Test',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
  ],
})
```

Add it to `index.ts` and see if it appears in Studio. If it does, the issue is with specific schemas. If it doesn't, the issue is with the setup.

