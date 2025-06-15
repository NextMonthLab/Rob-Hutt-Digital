# Professional Business Template

A modern, responsive website template for business owners and service providers. This template features professional design, customizable content sections, and NextMonth ecosystem integration for seamless business management.

## Features

- **Professional Design**: Modern, responsive layout optimized for business websites
- **Customizable Sections**: Hero, Services, About, Contact, and Admin pages
- **NextMonth Integration**: Built-in SOT (Source of Truth) for business data synchronization
- **Mobile Optimized**: Fully responsive design that works on all devices
- **SEO Ready**: Proper meta tags and semantic HTML structure
- **Contact Forms**: Integrated contact forms with webhook notifications
- **Admin Dashboard**: Monitor system health and manage integrations

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, TailwindCSS, Framer Motion
- **UI Components**: shadcn/ui, Radix UI primitives
- **State Management**: TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation
- **Integration**: NextMonth API, Webhook system

## Using This Template in NextMonth Lab

This template is designed for easy customization through NextMonth Lab's AI-assisted platform:

### 1. Brand Customization
- Replace "Your Business" with your company name
- Update colors in `theme.json` to match your brand
- Customize hero section content and imagery

### 2. Service Configuration
- Modify service offerings in the storage configuration
- Update service descriptions and icons
- Add or remove service categories

### 3. Content Updates
- Personalize the About section with your business story
- Update contact information and social media links
- Customize highlight cards with your value propositions

### 4. Advanced Customization
- Integrate with your existing business systems via NextMonth SOT
- Configure webhook notifications for form submissions
- Set up custom domain and SSL for production deployment

## Quick Deployment Options

### GitHub Pages (Recommended for Static Sites)

This template includes automatic GitHub Pages deployment:

1. **Push to GitHub**: Upload this repository to GitHub
2. **Automatic Deployment**: GitHub Actions builds and deploys on every push to main branch
3. **Live Site**: Access your site at `https://USERNAME.github.io/REPO-NAME/`

The template automatically:
- Builds the React application for production
- Optimizes assets and creates static files
- Deploys to GitHub Pages branch
- Handles routing and asset paths correctly

### Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:5000` to see your template running locally.

## Deployment to Hetzner

This application is designed to be deployed to a Hetzner VPS environment using Docker.

### Prerequisites

- Docker and Docker Compose installed on the Hetzner server
- Git access to pull the repository
- Environment variables configured (.env file)

### Deployment Steps

1. **Clone the repository on your Hetzner server**

```bash
git clone https://github.com/your-org/rob-hutt-digital.git
cd rob-hutt-digital
```

2. **Set up environment variables**

Copy the example environment file and update with production values:

```bash
cp .env.example .env
# Edit .env with appropriate production values
nano .env
```

Required environment variables:
- `NODE_ENV=production`
- `PORT=5000`
- `NEXTMONTH_API_ENDPOINT`
- `NEXTMONTH_API_KEY`
- `NEXTMONTH_CLIENT_ID`
- `NEXTMONTH_WEBHOOK_SECRET`

3. **Build and start the application**

```bash
# Build the Docker image and start the container
docker-compose up --build -d
```

4. **Verify the deployment**

The application should now be running at http://your-server-ip:5000

5. **Setting up a reverse proxy (recommended)**

For production use, it's recommended to set up Nginx as a reverse proxy with SSL:

```bash
# Install Nginx if not already installed
apt update
apt install nginx certbot python3-certbot-nginx

# Configure Nginx reverse proxy
nano /etc/nginx/sites-available/rob-hutt-digital
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site and set up SSL:

```bash
ln -s /etc/nginx/sites-available/rob-hutt-digital /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Maintenance

### Updating the Application

To update the application:

```bash
# Stop the current containers
docker-compose down

# Pull the latest changes
git pull

# Rebuild and restart
docker-compose up --build -d
```

### Logs

Docker logs can be viewed with:

```bash
docker-compose logs -f
```

Application-specific logs are stored in the `logs` directory:

```bash
ls -la logs/
```

## NextMonth Ecosystem Integration

This application is integrated with the NextMonth ecosystem as an official Council Member:

- The SOT (Source of Truth) integration maintains synchronized data exchange
- Webhook notifications enable real-time updates
- Admin interface at `/admin/sot` provides management capabilities

## Template Structure

```
├── client/src/           # React frontend application
│   ├── components/       # Reusable UI components
│   ├── pages/           # Page components (Home, About, Services, Contact)
│   └── lib/             # Utilities and API client
├── server/              # Express backend (optional for full-stack deployment)
├── .github/workflows/   # GitHub Actions for automatic deployment
├── template-metadata.json # NextMonth Lab integration metadata
├── preview.png          # Template preview image
└── README.md           # This file
```

## Customization Guide

### Quick Start Customization

1. **Business Name**: Search and replace "Your Business" with your company name
2. **Services**: Edit `server/storage.ts` to update service offerings
3. **Colors**: Modify `theme.json` for brand colors
4. **Content**: Update hero section in `client/src/components/Hero.tsx`
5. **Contact**: Configure contact form and social media links

### Advanced Configuration

- **NextMonth Integration**: Configure SOT client ID and API endpoints
- **Webhook Setup**: Set up webhook URLs for form submissions
- **Custom Domain**: Configure custom domain for GitHub Pages
- **Analytics**: Add Google Analytics or other tracking scripts

## Support

This template is designed for NextMonth Lab integration. For customization assistance or technical support, use NextMonth Lab's AI-assisted customization tools.

## License

MIT License - Free to use for commercial and personal projects.