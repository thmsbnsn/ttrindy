# 🚀 Quick Start: Create Singleton Documents

Now that your schemas are fixed and loading, you need to create the singleton documents in Sanity Studio.

## ✅ Prerequisites

1. **Sanity Studio is running**:
   ```bash
   npm run sanity:dev
   ```

2. **Schemas are visible** in Sanity Studio:
   - You should see "Site Settings" and "Pages" folder in the sidebar
   - If not, restart Sanity Studio and hard refresh your browser

---

## 📝 Option 1: Manual Creation (Recommended for First Time)

### Step 1: Create Site Settings

1. In Sanity Studio, click **"Site Settings"** in the left sidebar
2. Click **"Create"** button (or the **"+"** icon)
3. **Important**: The document ID should be `siteSettings` (it should auto-set, but verify in document settings)
4. Fill in the fields:
   - **Branding**: Upload logo, set site name, colors
   - **Contact**: Add phone, email, address
   - **Navigation**: Add menu items (Home, Services, Gallery, Blog, About)
   - **Footer**: Add about text and quick links
5. Click **"Publish"**

### Step 2: Create Home Page

1. Go to **"Pages"** → **"Home Page"**
2. Click **"Create"**
3. Document ID should be `homePage`
4. Fill in:
   - **Hero Section**: Headline, subheadline, background image, CTAs
   - **Services Section**: Add service cards
   - **Featured Projects**: Enable/disable, set max projects
   - **Why Us Section**: Add feature cards
   - **Final CTA**: Add call-to-action
5. Click **"Publish"**

### Step 3: Create About Page

1. Go to **"Pages"** → **"About Page"**
2. Click **"Create"**
3. Document ID should be `aboutPage`
4. Fill in:
   - **Story Section**: Add your company story (rich text)
   - **Stats Section**: Add statistics
   - **Values Section**: Add company values
   - **Contact Section**: Enable contact form
5. Click **"Publish"**

### Step 4: Create Services Page

1. Go to **"Pages"** → **"Services Page"**
2. Click **"Create"**
3. Document ID should be `servicesPage`
4. Fill in:
   - **Services**: Add detailed service descriptions
   - **Emergency CTA**: Add emergency contact info
5. Click **"Publish"**

---

## 📝 Option 2: Automated Script (Faster)

If you want to create the documents with default/placeholder data automatically:

### Setup:

1. **Install dependencies** (if not already installed):
   ```bash
   npm install --save-dev dotenv tsx
   ```

2. **Get your Sanity API token**:
   - Go to https://www.sanity.io/manage
   - Select your project
   - Go to "API" → "Tokens"
   - Create a new token with "Editor" permissions
   - Copy the token

3. **Add token to `.env` file**:
   ```env
   SANITY_API_WRITE_TOKEN=your_token_here
   ```

4. **Run the initialization script**:
   ```bash
   npx tsx sanity/scripts/init-singletons.ts
   ```

This will create all 4 singleton documents with default/placeholder data. You can then edit them in Sanity Studio to customize.

---

## ✅ Verification

After creating all documents:

1. **Check in Sanity Studio**:
   - All 4 documents should be visible and published
   - Site Settings should have navigation menu items
   - Home Page should have hero section filled

2. **Test on frontend**:
   - Start your dev server: `npm run dev`
   - Visit http://localhost:8080
   - Check that:
     - Navigation menu appears (from Site Settings)
     - Homepage shows hero section (from Home Page)
     - Footer shows content (from Site Settings)

---

## 🎯 Next Steps

After creating the singleton documents:

1. ✅ **Update contact information** (phone numbers, addresses)
2. ✅ **Upload images** (logos, hero images, service images)
3. ✅ **Customize content** to match your brand
4. ✅ **Test all pages** load correctly
5. ✅ **Migrate existing project images** (if needed)

---

## ❓ Troubleshooting

**Documents don't appear in Studio?**
- Restart Sanity Studio
- Hard refresh browser (Ctrl+F5)
- Check browser console for errors

**Can't create documents?**
- Make sure you're logged into Sanity
- Check that schemas are loading (you see them in sidebar)
- Verify document IDs match exactly: `siteSettings`, `homePage`, `aboutPage`, `servicesPage`

**Script fails?**
- Verify your API token has write permissions
- Check that project ID and dataset are correct in `.env`
- Make sure `dotenv` and `tsx` are installed

