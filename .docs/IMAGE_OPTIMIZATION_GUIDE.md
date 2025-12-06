# Image Optimization Guide for Sanity

## Quick Reference

### Project Images

**Recommended Settings:**
- **Format**: WebP (best) or JPEG (fallback)
- **Quality**: 80-85% (WebP) or 80-85% (JPEG)
- **Dimensions**:
  - Upload at **1200px width** (16:9 aspect ratio = 1200×675px)
  - Sanity will automatically generate smaller sizes (800px, 400px, etc.)

**Why 1200px?**
- Gallery cards display at 800×450px
- Project detail pages display at 1200×675px
- Sanity CDN generates all sizes automatically
- Upload once, get all sizes

### Using Squoosh

1. **Open your image in Squoosh** (https://squoosh.app)

2. **Resize:**
   - Click "Resize"
   - Set width to **1200px** (height will auto-calculate for 16:9)
   - Or manually set: Width: 1200, Height: 675 (maintains 16:9)

3. **Compress:**
   - **For WebP:**
     - Select "WebP" format
     - Quality: **80-85**
     - Effort: 4-6 (good balance of speed/quality)
   - **For JPEG (if WebP not available):**
     - Select "MozJPEG" format
     - Quality: **80-85**

4. **Download and upload to Sanity**

### Aspect Ratio

- **16:9** is recommended (matches gallery cards and detail pages)
- If your source image is different, crop in Squoosh before resizing
- Sanity's hotspot feature allows cropping in Studio, but pre-cropping is better

### File Size Targets

- **Before optimization**: Often 2-5MB+ (from phone/camera)
- **After Squoosh**: Should be **200-500KB** for 1200px width
- **Sanity CDN**: Automatically serves optimized versions (often 50-150KB)

### Sanity Image CDN

Sanity automatically:
- ✅ Generates multiple sizes (400px, 800px, 1200px, etc.)
- ✅ Serves WebP when browser supports it
- ✅ Serves JPEG fallback for older browsers
- ✅ Optimizes on-the-fly
- ✅ Provides responsive `srcset` via `urlFor()`

### Example Workflow

1. Take photo with phone (often 3000×4000px, 3-5MB)
2. Open in Squoosh
3. Resize to 1200×675px (16:9)
4. Compress to WebP at 80% quality
5. Result: ~300KB file
6. Upload to Sanity
7. Sanity serves optimized versions automatically

### Tips

- **Don't over-optimize**: Sanity handles optimization, so 80% quality is fine
- **Use WebP when possible**: Better compression than JPEG
- **Maintain aspect ratio**: 16:9 works best for this site
- **First image is featured**: The first image in the array becomes the main/featured image
- **Add alt text**: Always add descriptive alt text for accessibility

### Current Image Usage on Site

- **Gallery cards**: 800×450px (from 1200px source)
- **Project detail**: 1200×675px (full size)
- **OG images**: 1200×630px (for social sharing)
- **Blog cards**: 800×450px

All sizes are generated automatically from your 1200px upload!

