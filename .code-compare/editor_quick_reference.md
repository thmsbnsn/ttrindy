# 📚 Sanity Studio Editor Quick Reference

## Common Tasks for Content Editors

### 🏠 Updating Homepage Content

#### Change Hero Section
1. Go to **Pages** → **Home Page**
2. Expand **Hero Section**
3. Edit headline, subheadline, or upload new background image
4. Update CTA button text/links if needed
5. Click **Publish**

#### Update Service Cards
1. Go to **Pages** → **Home Page**
2. Scroll to **Services Preview Section**
3. Click into **Service Cards** array
4. Edit existing cards or add new ones
5. Click **Publish**

#### Toggle Featured Projects
1. Go to **Pages** → **Home Page**
2. Scroll to **Featured Projects Section**
3. Toggle **Show Featured Projects** on/off
4. Adjust **Maximum Projects to Show**
5. Click **Publish**

---

### 📱 Updating Site-Wide Settings

#### Change Phone Number or Email
1. Go to **Site Settings**
2. Expand **Contact Information**
3. Update **Phone Number** (must be format: `(555) 123-4567`)
4. Update **Email**
5. Click **Publish**
6. **Changes appear instantly** across entire site!

#### Update Navigation Menu
1. Go to **Site Settings**
2. Expand **Navigation Menu**
3. Edit **Main Menu Items**
   - Title: Display text
   - URL: Link destination (e.g., `/services`)
   - Open in New Tab: Check for external links
4. Update **CTA Button** text/link
5. Click **Publish**

#### Update Footer
1. Go to **Site Settings**
2. Expand **Footer**
3. Edit **About Text**
4. Update **Quick Links**
5. Modify **Copyright Text** (use `{year}` for current year)
6. Click **Publish**

#### Change Business Info (Stats)
1. Go to **Site Settings**
2. Expand **Business Information**
3. Update years in business, projects completed, etc.
4. Click **Publish**
5. Stats update on About page automatically!

---

### 📝 Managing Projects

#### Add a New Project
1. Click **Projects** in sidebar
2. Click **+ Create** button
3. Fill in required fields:
   - **Title**: Project name
   - **Slug**: Auto-generates (click "Generate" button)
   - **Location**: City, State
   - **Date**: Project completion date
   - **Category**: Select from dropdown
   - **Short Description**: For card preview (max 200 chars)
4. Upload **Project Images** (at least 1 required)
   - First image becomes the main/featured image
   - Add alt text for each image (required for accessibility)
5. Optional: Add **Full Project Description** with rich text
6. Optional: Add **Project Videos** (YouTube/Vimeo links)
7. Check **Featured Project** to show on homepage
8. Click **Publish**

#### Edit Existing Project
1. Click **Projects** in sidebar
2. Find project in list (sorted by date)
3. Click to open
4. Make changes
5. Click **Publish**

#### Feature/Unfeature a Project
1. Open the project
2. Scroll to **Featured Project** toggle
3. Check to feature (shows on homepage)
4. Uncheck to remove from homepage
5. Click **Publish**

---

### ✍️ Managing Blog Posts

#### Create a New Blog Post
1. Click **Blog Posts** in sidebar
2. Click **+ Create** button
3. Fill in fields:
   - **Title**: Blog post title
   - **Slug**: Auto-generates
   - **Excerpt**: Short summary (max 200 chars)
   - **Author**: Your name (defaults to "Top Tier Team")
   - **Published At**: Date/time
   - **Featured Image**: Main image (required)
4. Write content in **Blog Content** editor
   - Use formatting buttons (H2, H3, bold, italic, etc.)
   - Add images inline
   - Create lists
5. Add **Tags** (optional, helps with SEO)
6. Link **Related Projects** (optional)
7. Click **Publish**

#### Rich Text Editor Tips
- **Headings**: Use H2 for sections, H3 for subsections
- **Links**: Highlight text → Link icon → Enter URL
- **Images**: Click image icon → Upload → Add alt text
- **Lists**: Click bullet or number icon
- **Bold/Italic**: Highlight text → Click B or I

---

### 🔍 SEO Optimization

#### Update Page SEO (Home, About, Services)
1. Go to the page (e.g., **Pages** → **Home Page**)
2. Scroll to **SEO Settings** section
3. Fill in:
   - **Meta Title**: 50-60 characters (title for Google)
   - **Meta Description**: 150-160 characters (snippet for Google)
   - **Keywords**: Add relevant search terms
   - **Open Graph Image**: Image for social media sharing (1200x630px)
4. Click **Publish**

#### Update Project/Blog Post SEO
1. Open the project or blog post
2. Scroll to **SEO Settings**
3. Fill in meta title, description, keywords
4. Upload custom OG image (optional)
5. Click **Publish**

#### SEO Best Practices
- ✅ Use action words in titles: "Professional Water Damage Restoration"
- ✅ Include location: "Indianapolis, IN" or "Greenwood, Indiana"
- ✅ Keep descriptions under 160 characters
- ✅ Use keywords naturally (no stuffing!)
- ✅ Upload high-quality images with descriptive alt text

---

### 📊 Understanding Document Status

| Icon | Status | Meaning |
|------|--------|---------|
| 🟢 Green | Published | Live on website |
| 🟡 Yellow | Draft | Saved but not published |
| 🔴 Red | Changes | Published with unpublished edits |

**Important**: Always click **Publish** after editing! Draft changes don't appear on the live site.

---

### 🎨 Image Best Practices

#### Image Sizes
- **Hero Images**: 1920x1080px or larger
- **Project Images**: 1200x800px minimum
- **Service Images**: 800x600px minimum
- **Blog Images**: 1200x675px recommended
- **OG Images**: 1200x630px (for social sharing)

#### Image Optimization
1. Use JPEG for photos (.jpg)
2. Use PNG for graphics with transparency (.png)
3. Use WebP for modern browsers (Sanity auto-converts!)
4. Compress images before uploading (use TinyPNG.com)
5. **Always add alt text** (describes image for screen readers)

#### Alt Text Tips
- ✅ Good: "Water-damaged living room with extraction equipment"
- ✅ Good: "Before and after kitchen remodel in Indianapolis"
- ❌ Bad: "Image1.jpg"
- ❌ Bad: "Click here"

---

### 🚨 Common Mistakes to Avoid

1. **Forgetting to Publish**: Changes saved as drafts don't go live!
2. **Missing Alt Text**: Required for all images (accessibility + SEO)
3. **Phone Number Format**: Must be `(555) 123-4567` format
4. **Broken Links**: Always test internal links (start with `/`)
5. **Over-long Descriptions**: Card descriptions limited to 200 characters
6. **No Categories**: Projects need categories for filtering
7. **Duplicate Slugs**: Each project/blog needs unique slug

---

### 🔧 Troubleshooting

#### "This field is required" Error
**Solution**: Fill in all fields marked with a red asterisk (*) before publishing.

#### Image Not Uploading
**Solution**: 
1. Check file size (max 10MB)
2. Try JPEG instead of PNG
3. Refresh browser and try again

#### Changes Not Showing on Website
**Solution**:
1. Ensure you clicked **Publish** (not just Save Draft)
2. Wait 1-2 minutes for cache to clear
3. Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)

#### Slug Already Exists
**Solution**: 
1. Click the **Generate** button again
2. Manually append `-2` or current year to slug
3. Example: `water-damage-2024`

#### Can't Find a Document
**Solution**:
1. Use the search bar at top (press `/` key)
2. Check correct section (Projects vs Blog Posts)
3. Sort by date (newest/oldest)

---

### 💡 Pro Tips

1. **Preview Before Publishing**: Use the eye icon to preview changes
2. **Duplicate Content**: Use "Duplicate" button to copy similar projects/posts
3. **Bulk Actions**: Select multiple items to publish/delete at once
4. **Keyboard Shortcuts**: 
   - `Ctrl/Cmd + S` = Save draft
   - `Ctrl/Cmd + Alt + P` = Publish
   - `/` = Open search
5. **Reference Other Content**: Link projects in blog posts using references
6. **Schedule Publishing**: Set future dates in "Published At" field

---

### 📞 Getting Help

**Questions about:**
- **Content editing**: Contact your web developer
- **Technical issues**: Check browser console or contact support
- **SEO strategy**: Consult with marketing team
- **Sanity Studio**: https://www.sanity.io/help

---

### 🎯 Quick Reference: Weekly Tasks

**Every Monday**:
- [ ] Check for new project photos to upload
- [ ] Review and publish draft blog posts
- [ ] Update featured projects if needed
- [ ] Check contact form submissions

**Monthly**:
- [ ] Update business stats (projects completed)
- [ ] Review and update service descriptions
- [ ] Audit old projects (unfeature outdated ones)
- [ ] Update homepage hero image seasonally

**Quarterly**:
- [ ] SEO audit (update meta descriptions)
- [ ] Review navigation menu
- [ ] Update About page story
- [ ] Refresh testimonials (if added)

---

## 🎓 Training Checklist

After completing this guide, you should be able to:
- ✅ Update homepage hero and service cards
- ✅ Change site-wide contact info and navigation
- ✅ Create and publish new projects
- ✅ Write and format blog posts
- ✅ Optimize content for SEO
- ✅ Upload and manage images properly
- ✅ Troubleshoot common issues

**Need more training?** Schedule a 1-on-1 session with your web developer!
