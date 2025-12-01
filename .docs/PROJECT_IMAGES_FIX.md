# Project Images Loading Fix

## Issue
Project images were not loading correctly after Phase 1 schema mismatch fix.

## Root Cause
The Sanity queries were fetching image objects, but the asset references needed to be explicitly included in the query structure for `urlFor()` to work properly.

## Solution Applied

Updated all project image queries in `src/lib/sanity.ts` to explicitly include the asset and alt fields:

### Before:
```groq
"mainImage": mainImage
```

### After:
```groq
"mainImage": mainImage{
  asset,
  alt
}
```

## Files Modified

1. `src/lib/sanity.ts`
   - `getProjects()` - Fixed mainImage query
   - `getProjectBySlug()` - Fixed mainImage, additionalImages, and thumbnail queries
   - `getFeaturedProjects()` - Fixed mainImage query

## Changes Made

### getProjects()
- Changed `"mainImage": mainImage` to `"mainImage": mainImage{ asset, alt }`

### getProjectBySlug()
- Changed `"mainImage": mainImage` to `"mainImage": mainImage{ asset, alt }`
- Changed `"additionalImages": additionalImages` to `"additionalImages": additionalImages[]{ asset, alt }`
- Changed `"thumbnail": thumbnail` to `"thumbnail": thumbnail{ asset, alt }`

### getFeaturedProjects()
- Changed `"mainImage": mainImage` to `"mainImage": mainImage{ asset, alt }`

## Expected Result

- Images should now load correctly in Gallery page
- Images should now load correctly in ProjectDetail page
- All image references properly include asset and alt fields
- `urlFor()` function can properly resolve image URLs

## Testing

1. Check Gallery page - project images should display
2. Check ProjectDetail page - main image and carousel images should display
3. Check browser console for any image loading errors
4. Verify image URLs are being generated correctly

## Notes

- Blog post images were already working correctly (they had the proper structure)
- The issue was specific to project images after the schema mismatch fix in Phase 1
- Asset references are now explicitly queried, ensuring compatibility with `urlFor()`

