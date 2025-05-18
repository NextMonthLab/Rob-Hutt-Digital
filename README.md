# Rob Hutt Digital - Personal Brand Web App

A modular personal brand web application for Rob Hutt showcasing his expertise with integration capabilities for the NextMonth Developer ecosystem.

## Features

- Modern, responsive design with Tailwind CSS
- NextMonth ecosystem integration as an official Council Member
- Source of Truth (SOT) integration for synchronized data exchange
- Webhook notification system for real-time updates
- Admin interface for SOT integration management

## Tech Stack

- Frontend: React, TypeScript, Tailwind CSS, shadcn/ui
- Backend: Express, Node.js
- Integration: NextMonth API, Webhooks
- Deployment: Docker, Hetzner VPS

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

## License

Copyright © 2025 Rob Hutt Digital. All rights reserved.