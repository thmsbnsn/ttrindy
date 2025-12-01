# 🚀 Sanity CMS Setup Guide - Creating Singleton Documents

This guide will walk you through creating and populating all the singleton documents needed for your website.

## 📋 Prerequisites

1. **Start Sanity Studio** (if not already running):
   ```bash
   npm run sanity:dev
   ```
   Studio will be available at: `http://localhost:3333/studio`

2. **Access Sanity Studio**:
   - Open your browser and go to `http://localhost:3333/studio`
   - Log in with your Sanity account

---

## 🎯 Step 1: Create Site Settings (Most Important - Do This First!)

Site Settings controls navigation, footer, contact info, and branding across the entire site.

### How to Create:

1. In Sanity Studio, look for **"Site Settings"** in the left sidebar (under "Content")
2. Click on **"Site Settings"**
3. If it doesn't exist yet, you'll see an empty state - click **"Create"** or the **"+"** button
4. **IMPORTANT**: When creating, set the **Document ID** to exactly: `siteSettings`
   - You can set this in the document settings (three dots menu → "Set document ID")
   - Or it may auto-create with this ID if the structure is set up correctly

### What to Fill In:

#### **Branding Section**
- **Logo**: Upload your logo image (PNG/SVG recommended)
  - Add alt text: "Top Tier Restoration Logo"
- **Site Name**: `Top Tier Restoration`
- **Tagline**: `Professional Restoration Services` (optional)
- **Primary Color**: `#00AEEF` (Cyan Blue)
- **Accent Color**: `#FF6B35` (Orange)

#### **Contact Information**
- **Phone Number**: Must be format `(317) XXX-XXXX` (use your actual number)
- **Email**: `info@toptierrestoration.com` (or your actual email)
- **Address**:
  - Street: Your street address
  - City: `Indianapolis`
  - State: `IN`
  - ZIP: Your zip code
- **Service Area**: `Greater Indianapolis Metro Area`

#### **Business Information**
- **Years in Business**: `15` (or your actual number)
- **Projects Completed**: `1000` (or your actual number)
- **License Number**: Your Indiana license number (e.g., `IN-12345`)
- **Insurance Provider**: (optional)
- **Emergency Availability**: `24/7 Emergency Service`

#### **Social Media** (Optional)
- Add your Facebook, Instagram, Twitter, LinkedIn, YouTube URLs if you have them

#### **Navigation Menu**
- **Main Menu Items**: Click "Add item" and create:
  - Title: `Home`, URL: `/`, Open in New Tab: `No`
  - Title: `Services`, URL: `/services`, Open in New Tab: `No`
  - Title: `Gallery`, URL: `/gallery`, Open in New Tab: `No`
  - Title: `Blog`, URL: `/blog`, Open in New Tab: `No`
  - Title: `About`, URL: `/about`, Open in New Tab: `No`
- **CTA Button**:
  - Text: `Get a Free Quote`
  - URL: `/about#contact`

#### **Footer**
- **About Text**: `Top Tier Restoration provides professional 24/7 emergency restoration services for water damage, fire damage, and storm damage. We're your trusted partner in home restoration and remodeling throughout the Greater Indianapolis area.`
- **Quick Links**: Add links like:
  - Title: `Services`, URL: `/services`
  - Title: `Gallery`, URL: `/gallery`
  - Title: `Blog`, URL: `/blog`
  - Title: `About Us`, URL: `/about`
  - Title: `Contact`, URL: `/about#contact`
- **Copyright Text**: `© {year} Top Tier Restoration. All rights reserved.`

#### **Default SEO Settings** (Optional)
- **Default Meta Title**: `Top Tier Restoration - Professional Restoration Services in Indianapolis`
- **Default Meta Description**: `Professional 24/7 emergency restoration services for water damage, fire damage, and storm damage. Expert remodeling and renovation services in Indianapolis and surrounding Indiana areas.`
- **Default Keywords**: Add tags like: `water damage restoration`, `fire damage restoration`, `storm damage repair`, `home remodeling`, `Indianapolis restoration`
- **Default Open Graph Image**: Upload a 1200x630px image for social media sharing

5. Click **"Publish"** when done!

---

## 🏠 Step 2: Create Home Page

The Home Page controls all content on your homepage.

### How to Create:

1. In Sanity Studio, go to **"Pages"** → **"Home Page"**
2. Click **"Create"** or the **"+"** button
3. **IMPORTANT**: Set the **Document ID** to exactly: `homePage`

### What to Fill In:

#### **Hero Section**
- **Main Headline**: `Restore Your Home to Top Tier Condition`
- **Subheadline**: `24/7 emergency restoration for water, fire, storm, and structural damage. When disaster strikes, we bring your property back to life with fast response, licensed professionals, and proven results.`
- **Background Image**: Upload a hero image (1920x1080px recommended)
  - Alt text: `Home restoration transformation - from fire damage to fully restored room`
- **Primary CTA**:
  - Text: `Call Now for Emergency Service`
  - URL: `tel:(317)XXX-XXXX` (use your phone number)
- **Secondary CTA**:
  - Text: `Learn More`
  - URL: `/services`

#### **Services Preview Section**
- **Section Title**: `Our Services`
- **Section Description**: `Expert restoration and remodeling services to bring your property back to life`
- **Service Cards**: Click "Add item" and create 4 service cards:

  **Service Card 1:**
  - Icon: `Droplets`
  - Title: `Water Damage`
  - Description: `24/7 rapid water extraction, structural drying, mold prevention, sanitation, and full restoration.`
  - Related Blog Post Slug: `water-damage-restoration-indianapolis` (optional)
  - Related Project Category: `Water Damage` (optional)
  - FAQ Anchor Link: `water-damage-faq` (optional)

  **Service Card 2:**
  - Icon: `Flame`
  - Title: `Fire Damage`
  - Description: `Smoke & soot removal, odor elimination, structural repairs, and full fire damage reconstruction.`
  - Related Blog Post Slug: `fire-damage-restoration-indianapolis` (optional)
  - Related Project Category: `Fire Damage` (optional)
  - FAQ Anchor Link: `fire-damage-faq` (optional)

  **Service Card 3:**
  - Icon: `CloudRain`
  - Title: `Storm Damage`
  - Description: `Emergency tarping, exterior repairs, debris removal, and complete property restoration.`
  - Related Blog Post Slug: `storm-damage-repair-indianapolis` (optional)
  - Related Project Category: `Storm Damage` (optional)
  - FAQ Anchor Link: `storm-damage-faq` (optional)

  **Service Card 4:**
  - Icon: `Hammer`
  - Title: `Remodeling`
  - Description: `Professional remodeling services including kitchens, bathrooms, basements, and full-home renovations.`
  - Related Blog Post Slug: `home-remodeling-indianapolis` (optional)
  - Related Project Category: `Remodeling` (optional)
  - FAQ Anchor Link: `remodeling-faq` (optional)

- **CTA Button Text**: `View All Services`
- **CTA Button URL**: `/services`

#### **Featured Projects Section**
- **Section Title**: `Featured Projects`
- **Section Description**: `Explore some of our recent restoration and remodeling projects`
- **Show Featured Projects**: `Yes` (toggle on)
- **Maximum Projects to Show**: `6`

#### **Why Choose Us Section**
- **Section Title**: `Why Choose Top Tier?`
- **Section Description**: `When your home is damaged, you need a team that responds fast, communicates clearly, and restores your property the right way.`
- **Key Features**: Click "Add item" and create 4 features:

  **Feature 1:**
  - Icon: `Clock`
  - Title: `Rapid Response`
  - Description: `We're available 24/7 and arrive quickly to stop damage and begin restoration immediately.`

  **Feature 2:**
  - Icon: `Shield`
  - Title: `Licensed & Insured`
  - Description: `Fully licensed, bonded, and insured technicians you can trust with your home.`

  **Feature 3:**
  - Icon: `Award`
  - Title: `15+ Years of Experience`
  - Description: `Decades of combined expertise and thousands of successful restorations across Indiana.`

  **Feature 4:**
  - Icon: `Users`
  - Title: `Customer-First Service`
  - Description: `We treat every home like our own — with honesty, professionalism, and clear communication from start to finish.`

#### **Final CTA Section**
- **CTA Title**: `Ready to Get Started?`
- **CTA Description**: `Let Us Restore Your Property to Its Best Condition`
- **Primary Button**:
  - Text: `Get a Free Quote`
  - URL: `/about#contact`
- **Secondary Button**:
  - Text: `View Our Work`
  - URL: `/gallery`

#### **SEO Settings**
- **Meta Title**: `Top Tier Restoration - Professional Restoration Services in Indianapolis`
- **Meta Description**: `Professional 24/7 emergency restoration services for water damage, fire damage, and storm damage. Expert remodeling and renovation services in Indianapolis and surrounding Indiana areas.`
- **Keywords**: Add tags like: `water damage restoration`, `fire damage restoration`, `storm damage repair`, `home remodeling`, `Indianapolis restoration`, `emergency restoration services`
- **Open Graph Image**: Upload a 1200x630px image (optional)

5. Click **"Publish"** when done!

---

## 📖 Step 3: Create About Page

The About Page controls all content on your About Us page.

### How to Create:

1. In Sanity Studio, go to **"Pages"** → **"About Page"**
2. Click **"Create"** or the **"+"** button
3. **IMPORTANT**: Set the **Document ID** to exactly: `aboutPage`

### What to Fill In:

#### **Page Title & Subtitle**
- **Page Title**: `About Top Tier Restoration`
- **Subtitle**: `Your trusted partner in home restoration and remodeling`

#### **Our Story Section**
- **Section Title**: `Our Story`
- **Story Content**: Use the rich text editor to write your company story. Example:
  ```
  Founded over 15 years ago, Top Tier Restoration was built on a simple mission: deliver honest, reliable, and professional restoration services that put homeowners first.

  What started as a small family-run business has grown into a full-service restoration team known for quality workmanship, rapid emergency response, and exceptional customer care. We've proudly restored thousands of homes across Indiana, helping families recover from fire, water, and storm damage with confidence.

  We believe your home deserves the highest standard of craftsmanship and care. That's why every project — big or small — is handled by licensed, insured, and highly trained professionals dedicated to doing the job right.
  ```
- **Story Image**: Upload an image of your team or office (optional)
  - Alt text: `Our team at Top Tier Restoration`

#### **Statistics Section**
- **Statistics**: Click "Add item" and create 4 stats:

  **Stat 1:**
  - Number: `15+`
  - Label: `Years Experience`

  **Stat 2:**
  - Number: `1000+`
  - Label: `Projects Completed`

  **Stat 3:**
  - Number: `100%`
  - Label: `Licensed & Insured`

  **Stat 4:**
  - Number: `24/7`
  - Label: `Emergency Service`

#### **Our Values Section**
- **Section Title**: `Our Values`
- **Values**: Click "Add item" and create 4 values:

  **Value 1:**
  - Icon: `Shield`
  - Title: `Quality First`
  - Description: `We never cut corners — your home's safety and longevity come first.`

  **Value 2:**
  - Icon: `Clock`
  - Title: `Timely Response`
  - Description: `24/7 emergency service with fast on-site arrival and efficient restoration.`

  **Value 3:**
  - Icon: `Heart`
  - Title: `Customer Care`
  - Description: `We communicate clearly, answer questions quickly, and treat every home with respect.`

  **Value 4:**
  - Icon: `Target`
  - Title: `Precision`
  - Description: `Meticulous attention to detail ensures durable, lasting results.`

#### **Contact Section**
- **Section Title**: `Get In Touch`
- **Show Contact Form**: `Yes` (toggle on)
- **Form Title**: `Send Us a Message`

#### **SEO Settings**
- **Meta Title**: `About Top Tier Restoration - Your Trusted Restoration Partner`
- **Meta Description**: `Learn about Top Tier Restoration's 15+ years of experience in home restoration and remodeling. Licensed, insured, and committed to quality service in Indianapolis and surrounding areas.`
- **Keywords**: Add tags like: `about top tier restoration`, `restoration company indianapolis`, `licensed restoration contractor`

5. Click **"Publish"** when done!

---

## 🔧 Step 4: Create Services Page

The Services Page controls all content on your Services page.

### How to Create:

1. In Sanity Studio, go to **"Pages"** → **"Services Page"**
2. Click **"Create"** or the **"+"** button
3. **IMPORTANT**: Set the **Document ID** to exactly: `servicesPage`

### What to Fill In:

#### **Page Title & Subtitle**
- **Page Title**: `Our Services`
- **Subtitle**: `Professional restoration and remodeling services to restore and enhance your property`

#### **Service Details**
- **Services**: Click "Add item" and create 4 service details:

  **Service 1: Water Damage Restoration**
  - Icon: `Droplets`
  - Title: `Water Damage Restoration`
  - Short Description: `Expert water damage restoration services available 24/7 for emergencies.`
  - Service Features: Click "Add item" and add:
    - `Emergency water extraction`
    - `Structural drying & dehumidification`
    - `Mold prevention & remediation`
    - `Insurance claim assistance`
    - `Complete restoration services`
  - Service Image: Upload a water damage restoration image (800x600px recommended)
    - Alt text: `Water damage restoration services`
  - FAQ Section ID: `water-damage-faq` (optional)

  **Service 2: Fire Damage Restoration**
  - Icon: `Flame`
  - Title: `Fire Damage Restoration`
  - Short Description: `Comprehensive fire and smoke damage restoration to bring your property back to life.`
  - Service Features:
    - `Smoke & soot removal`
    - `Odor elimination`
    - `Structural repairs`
    - `Content cleaning & restoration`
    - `Board-up & security services`
  - Service Image: Upload a fire damage restoration image
    - Alt text: `Fire damage restoration services`
  - FAQ Section ID: `fire-damage-faq` (optional)

  **Service 3: Storm Damage Repair**
  - Icon: `CloudRain`
  - Title: `Storm Damage Repair`
  - Short Description: `Fast response to storm damage including roof repairs and structural restoration.`
  - Service Features:
    - `Emergency tarping services`
    - `Roof & structural repairs`
    - `Window & door replacement`
    - `Debris removal`
    - `Full property restoration`
  - Service Image: Upload a storm damage repair image
    - Alt text: `Storm damage repair services`
  - FAQ Section ID: `storm-damage-faq` (optional)

  **Service 4: Complete Remodeling**
  - Icon: `Hammer`
  - Title: `Complete Remodeling`
  - Short Description: `Transform your space with our professional remodeling services.`
  - Service Features:
    - `Kitchen & bathroom remodels`
    - `Basement finishing`
    - `Custom carpentry`
    - `Flooring installation`
    - `Complete home renovations`
  - Service Image: Upload a remodeling image
    - Alt text: `Home remodeling services`
  - FAQ Section ID: `remodeling-faq` (optional)

#### **Emergency Call-to-Action**
- **CTA Title**: `Need Emergency Service?`
- **CTA Description**: `We're available 24/7 for emergency restoration services. Don't wait - contact us now for immediate assistance.`
- **Primary Button Text**: `Call Now`
- **Secondary Button Text**: `Contact Us`

#### **SEO Settings**
- **Meta Title**: `Our Services - Water, Fire, Storm Damage Restoration & Remodeling`
- **Meta Description**: `Professional restoration and remodeling services including water damage, fire damage, storm damage repair, and complete home renovations. Available 24/7 for emergencies in Indianapolis.`
- **Keywords**: Add tags like: `water damage restoration`, `fire damage restoration`, `storm damage repair`, `home remodeling`, `emergency restoration services`

5. Click **"Publish"** when done!

---

## ✅ Verification Checklist

After creating all documents, verify:

- [ ] **Site Settings** document exists with ID `siteSettings`
- [ ] **Home Page** document exists with ID `homePage`
- [ ] **About Page** document exists with ID `aboutPage`
- [ ] **Services Page** document exists with ID `servicesPage`
- [ ] All documents are **Published** (not just saved as drafts)
- [ ] Navigation menu has at least 3-5 items
- [ ] Contact information is filled in
- [ ] Logo is uploaded
- [ ] At least one service card/service detail is created

---

## 🧪 Testing Your Changes

1. **Refresh your website** (if running `npm run dev`)
2. **Check each page**:
   - Homepage should show hero, services, featured projects, why us, and CTA
   - About page should show story, stats, values, and contact form
   - Services page should show all service details
   - Navigation menu should appear in header
   - Footer should show your contact info and links

3. **If content doesn't appear**:
   - Make sure documents are **Published** (not just saved)
   - Check browser console for errors
   - Verify document IDs are exactly as specified
   - Wait 1-2 minutes for cache to clear

---

## 🆘 Troubleshooting

### "Document with ID already exists"
- This means a singleton was created manually. Just use the existing document and update its content.

### "Changes not showing on website"
- Ensure you clicked **"Publish"** (not just Save Draft)
- Wait 1-2 minutes for cache to clear
- Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)

### "Can't find the singleton in Studio"
- Make sure you've deployed the schemas: `npm run sanity:deploy`
- Check that the structure.ts file is correct
- Restart Sanity Studio: Stop and run `npm run sanity:dev` again

### "Navigation not showing"
- Ensure Site Settings has navigation items in the `navigation.mainMenu` field
- Make sure Site Settings document is published

---

## 📚 Next Steps

After creating the singleton documents:

1. **Create Categories** (if you haven't already):
   - Go to "Categories" in Studio
   - Create categories like: Water Damage, Fire Damage, Storm Damage, Remodeling

2. **Create Projects**:
   - Go to "Projects" in Studio
   - Create projects with images, descriptions, and link them to categories

3. **Create Blog Posts**:
   - Go to "Blog Posts" in Studio
   - Write blog posts with featured images and content

4. **Test Everything**:
   - Visit each page on your website
   - Test navigation links
   - Test contact form
   - Test all CTAs

---

## 💡 Pro Tips

1. **Save as Draft First**: Create content, save as draft, review, then publish
2. **Use Images**: Upload high-quality images (compress them first with TinyPNG.com)
3. **SEO Matters**: Fill in SEO fields for better search engine visibility
4. **Test Mobile**: Check how content looks on mobile devices
5. **Regular Updates**: Update content regularly to keep it fresh

---

## 🎉 You're Done!

Once all singleton documents are created and published, your website will be fully dynamic and editable through Sanity Studio. Non-technical team members can now update content without touching code!

Need help? Check the Sanity documentation: https://www.sanity.io/docs

