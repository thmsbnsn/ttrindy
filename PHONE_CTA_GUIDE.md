# 📞 Phone CTA Toggle Guide

You can now control whether phone call CTAs appear on your website directly from Sanity CMS!

---

## 🎛️ How to Use in Sanity Studio

### Step 1: Open Site Settings

1. **Go to your Sanity Studio**
2. **Find "Site Settings"** in the sidebar
3. **Open "Contact Information"** section

### Step 2: Configure Phone CTA

You'll see two new fields:

**1. Enable Phone Call CTA** (Toggle)
- ✅ **ON**: Phone call buttons will appear throughout the site
- ⬜ **OFF**: No phone CTAs (all contact buttons link to contact form)

**2. Phone Number** (Text field)
- Only appears when toggle is **ON**
- **Required** when toggle is enabled
- **Format:** `(555) 123-4567`
- Example: `(317) 555-0123`

### Step 3: Save & Publish

- Click **Save**
- Click **Publish**
- Changes apply immediately!

---

## 💡 How It Works

### When Phone CTA is DISABLED (Current State):
```
❌ No phone number field shown
✅ All "Call Now" buttons link to contact form
✅ No phone numbers displayed anywhere
```

### When Phone CTA is ENABLED:
```
✅ Phone number field appears
✅ Must enter valid phone number
✅ Phone call buttons appear (click-to-call)
✅ Phone number displays in header, footer, etc.
```

---

## 🔧 For Developers: Using Phone Info in Components

### Import the helper:
```typescript
import { getPhoneInfo } from '@/config/contact';
import type { PhoneInfo } from '@/config/contact';
```

### In a component (async):
```typescript
const MyComponent = () => {
  const [phoneInfo, setPhoneInfo] = useState<PhoneInfo>({ enabled: false });

  useEffect(() => {
    getPhoneInfo().then(setPhoneInfo);
  }, []);

  return (
    <>
      {phoneInfo.enabled && phoneInfo.phoneNumber && (
        <a href={phoneInfo.href}>
          📞 {phoneInfo.displayNumber}
        </a>
      )}
    </>
  );
};
```

### PhoneInfo Interface:
```typescript
interface PhoneInfo {
  enabled: boolean;          // Is phone CTA enabled?
  phoneNumber?: string;      // Formatted: (555) 123-4567
  displayNumber?: string;    // For display: (555) 123-4567
  href?: string;             // For tel link: tel:+15551234567
}
```

---

## 📋 Validation Rules

### Phone Number Format:
- ✅ `(317) 555-0123` - Valid
- ✅ `(800) 123-4567` - Valid
- ❌ `317-555-0123` - Invalid (wrong format)
- ❌ `3175550123` - Invalid (no formatting)
- ❌ `(317)555-0123` - Invalid (missing spaces)

### Requirements:
- Must be exactly 10 digits
- Must use format: `(XXX) XXX-XXXX`
- Required only when toggle is ON
- Hidden when toggle is OFF

---

## 🎯 Use Cases

### Scenario 1: No Office Phone Yet
```
1. Keep toggle OFF
2. All CTAs link to contact form
3. No phone number required
✅ Perfect for new businesses!
```

### Scenario 2: Office Phone Ready
```
1. Turn toggle ON
2. Enter phone number: (317) 555-0123
3. Phone CTAs appear site-wide
✅ Customers can call directly!
```

### Scenario 3: Temporary Disable
```
1. Turn toggle OFF
2. Phone number saved but hidden
3. Can re-enable anytime
✅ Flexible for maintenance or changes!
```

---

## 🔄 Where Phone CTAs Can Appear

When enabled, phone call CTAs can appear in:

- **Navbar/Header** - "Call Now" button
- **Hero Section** - Primary CTA
- **Mobile Emergency Bar** - Click-to-call
- **Footer** - Contact information
- **About Page** - Contact section
- **Services Pages** - Service CTAs

*(Each component needs to be updated to use `getPhoneInfo()` helper)*

---

## 🚀 Current Status

✅ **Schema updated** - Toggle added to Sanity  
✅ **TypeScript types** - PhoneInfo interface created  
✅ **Helper function** - `getPhoneInfo()` ready to use  
⏳ **Components** - Can be updated as needed  

**Default State:** Phone CTA is **DISABLED** (current setup)

---

## 📝 Example Implementation

### Before (Hardcoded):
```tsx
<a href="tel:+15551234567">
  Call Now: (555) 123-4567
</a>
```

### After (Dynamic from Sanity):
```tsx
const [phoneInfo, setPhoneInfo] = useState({ enabled: false });

useEffect(() => {
  getPhoneInfo().then(setPhoneInfo);
}, []);

{phoneInfo.enabled && (
  <a href={phoneInfo.href}>
    Call Now: {phoneInfo.displayNumber}
  </a>
)}
```

---

## 🎨 Benefits

✅ **No code changes needed** - Toggle in Sanity CMS  
✅ **Flexible** - Enable/disable anytime  
✅ **Consistent** - Single source of truth  
✅ **Safe** - Validation ensures correct format  
✅ **User-friendly** - Simple toggle interface  

---

## 📞 Next Steps

1. **Open Sanity Studio**
2. **Go to Site Settings → Contact Information**
3. **See the new "Enable Phone Call CTA" toggle**
4. **Configure as needed**

That's it! Phone CTA is now controlled via Sanity CMS.

**Questions?** The toggle is ready to use. Components can be updated individually to display phone CTAs when enabled.

