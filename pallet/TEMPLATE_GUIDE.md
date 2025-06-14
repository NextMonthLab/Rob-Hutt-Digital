# Digital Business Starter Template - Implementation Guide

## Quick Start

This template provides a complete foundation for service-based businesses with NextMonth ecosystem integration.

### 1. Content Customization

**Hero Section** (`src/components/Hero.tsx`)
- Replace "Your Business Name" with your company name
- Update tagline with your value proposition
- Replace placeholder image with professional headshot/logo

**Services** (`server/template-data.ts`)
- Modify `templateServices` array with your actual services
- Update icons using BoxIcons class names
- Customize descriptions and pricing

**About Section**
- Update bio paragraphs with your story
- Replace credentials with your qualifications
- Modify skills sections with relevant expertise

### 2. Brand Identity

**Navigation** (`src/components/NavBar.tsx`)
- Line 55: Replace "Your Business Name" with company name

**Colors** (`theme.json`)
- Customize primary color scheme
- Adjust appearance (light/dark/system)
- Set border radius preferences

**Typography** (`src/index.css`)
- Configure font families
- Adjust heading styles
- Set spacing preferences

### 3. Contact Information

**Contact Form** (`src/components/ContactForm.tsx`)
- Configure form submission endpoint
- Add business phone and address
- Set up email notifications

**Social Links** (`src/components/SocialLinks.tsx`)
- Update social media URLs
- Add/remove platforms as needed

### 4. NextMonth Integration

**SOT Configuration** (`server/utils/webhook.ts`)
- Update `DEFAULT_CLIENT_PROFILE` with business details
- Configure webhook endpoints
- Set business metadata

**Environment Variables**
```env
NEXTMONTH_CLIENT_ID=your-business-id
NEXTMONTH_API_KEY=your-api-key
NEXTMONTH_WEBHOOK_SECRET=your-secret
```

## Template Structure

```
Hero Section          → Business introduction
Services Section      → Service offerings  
Highlights Section    → Value propositions
About Section        → Business story
Contact Section      → Contact form
Admin Section        → Integration monitoring
```

## Deployment Checklist

- [ ] Replace all placeholder content
- [ ] Update business name throughout
- [ ] Configure contact information
- [ ] Set up NextMonth integration
- [ ] Test contact form functionality
- [ ] Verify responsive design
- [ ] Update meta tags and SEO
- [ ] Configure environment variables
- [ ] Test admin dashboard access

## Support

This template maintains the original Rob Hutt Digital architecture while providing generic, reusable components for any service-based business.