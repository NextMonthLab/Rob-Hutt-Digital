# Business Site Template - Generic Business Web Application

## Overview

Business Site Template is a generic, professional web application template designed for service-oriented businesses. Originally based on Rob Hutt Digital, this template has been completely converted to provide neutral, customizable placeholder content suitable for any business. The application maintains NextMonth ecosystem integration while serving as a reusable template for NextMonth Lab.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent, professional design
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Animations**: Framer Motion for smooth animations and transitions
- **Forms**: React Hook Form with Zod validation for robust form handling

### Backend Architecture
- **Runtime**: Node.js 20 with Express.js framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **API Design**: RESTful API structure with modular route organization
- **Middleware**: Custom logging, error handling, and request processing
- **Session Management**: Express sessions with PostgreSQL store (when database is configured)

### Build System
- **Bundler**: Vite for fast development and optimized production builds
- **Build Process**: Dual build system - Vite for frontend, esbuild for backend
- **Development**: Hot module replacement and runtime error overlay in development
- **Production**: Optimized builds with code splitting and asset optimization

## Key Components

### Content Management System
- **Highlight Cards**: Key value propositions and differentiators
- **Services**: Business offerings with icons, descriptions, and automation flags
- **About Section**: Personal bio, credentials, skills visualization
- **Contact System**: Form submissions with validation and webhook notifications

### NextMonth Integration
- **SOT (Source of Truth) Integration**: Real-time business profile synchronization
- **Webhook System**: Event-driven notifications for form submissions and content updates
- **Client Profile Management**: Comprehensive business metadata tracking
- **Audit Logging**: Activity tracking and system health monitoring

### Admin Interface
- **SOT Dashboard**: Monitor integration status and client profile data
- **Health Checks**: System status and connectivity monitoring
- **Profile Management**: Initialize and update SOT client profiles

## Data Flow

### Frontend Data Flow
1. **Component Level**: React components fetch data using TanStack Query hooks
2. **API Communication**: Centralized API client with error handling and caching
3. **State Management**: Server state cached and synchronized across components
4. **Fallback System**: Default content provided when API calls fail

### Backend Data Flow
1. **Request Processing**: Express middleware handles logging and validation
2. **Route Handling**: Modular API routes process business logic
3. **Database Operations**: Drizzle ORM with PostgreSQL for data persistence
4. **External Integration**: NextMonth API communication and webhook delivery

### SOT Integration Flow
1. **Profile Initialization**: Automatic SOT client profile creation on startup
2. **Event Triggers**: Form submissions and content updates trigger webhook notifications
3. **Real-time Sync**: Business data synchronized with NextMonth ecosystem
4. **Audit Trail**: All SOT interactions logged for monitoring and debugging

## External Dependencies

### Core Dependencies
- **Database**: PostgreSQL with Drizzle ORM for data modeling and queries
- **UI Components**: Radix UI primitives with shadcn/ui design system
- **HTTP Client**: Axios for external API communication
- **Validation**: Zod schemas for runtime type checking and validation

### NextMonth Ecosystem
- **API Endpoint**: `https://api.nextmonth.co` for SOT communication
- **Client ID**: `rob-hutt-digital` for ecosystem identification
- **Webhook Integration**: Real-time event notifications
- **Council Member Status**: Official NextMonth ecosystem participant

### Development Tools
- **TypeScript**: Static type checking and enhanced development experience
- **ESLint/Prettier**: Code quality and formatting (configurable)
- **Replit Integration**: Development environment optimizations

## Deployment Strategy

### Docker Containerization
- **Multi-stage Build**: Optimized production Docker image
- **Port Configuration**: Application runs on port 5000
- **Volume Mounts**: Persistent logs directory
- **Health Checks**: Container health monitoring

### Environment Configuration
- **Development**: Local development with hot reloading
- **Production**: Optimized builds with environment-specific configurations
- **Environment Variables**: Secure configuration management
- **Database**: PostgreSQL connection with migration support

### Hosting Options
- **Replit**: Primary development and hosting platform
- **Hetzner VPS**: Production deployment option with Docker Compose
- **Static Deployment**: Frontend can be deployed as static site
- **Auto-scaling**: Deployment target configured for automatic scaling

### Database Management
- **Schema**: Defined in `shared/schema.ts` with Drizzle ORM
- **Migrations**: Automatic migration generation and execution
- **Connection**: Environment-based database URL configuration
- **Backup**: Standard PostgreSQL backup procedures

## Changelog

```
Changelog:
- June 14, 2025. Initial setup as Rob Hutt Digital personal brand
- June 14, 2025. Converted to generic business template
  - Replaced all personal branding with placeholder content
  - Updated template name to "business-site-template"
  - Implemented generic services ("Service Name 1", "Service Name 2", etc.)
  - Updated storage system with generic business data
  - Fixed frontend components for template compatibility
  - Eliminated all remaining personal references in Hero, navigation, and metadata
  - Updated Hero section with generic business content and professional imagery
  - Template now completely generic and ready for NextMonth Lab deployment
  - Added complete GitHub Pages deployment support with GitHub Actions workflow
  - Created custom build script and comprehensive deployment documentation
  - Installed gh-pages package for manual deployment option
  - Template ready for static site deployment and NextMonth Lab integration
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```