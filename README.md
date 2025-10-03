# Scheduler

A full-stack scheduling application for coordinating communications between
organizations and the public. Built with Next.js 15, TypeScript, and modern web
technologies.

## Overview

The Scheduler application supports the coordination, scheduling, and task
management of various kinds of communications (events, news releases, social
media) between organizations and the public.

### Key Features

- **Real-time Updates**: Live synchronization across multiple clients
- **Responsive Design**: Optimized for both desktop and mobile devices
- **User Roles**: Support for event owners, scheduler admins, and executives
- **CRUD Operations**: Full create, read, update, delete functionality for
  entries
- **Advanced Table**: Sortable, filterable, and paginated data views
- **Calendar Integration**: Multiple calendar views (day/week/month)

## Tech Stack

### Frontend

- **Next.js 15** - React framework with SSR
- **TypeScript** - Type-safe JavaScript
- **TanStack Query** - Data fetching and caching
- **TanStack Table** - Advanced table functionality
- **shadcn/ui** - Modern UI components
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library

### Backend (Planned)

- **NestJS** - Node.js framework
- **GraphQL** - API layer
- **Supabase** - Database and authentication
- **WebSockets** - Real-time communication

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm or yarn
- Git

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd schedule
```

2. Install dependencies:

```bash
npm install
```

3. Set up Git hooks:

```bash
./scripts/setup-git-hooks.sh
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run commit` - Interactive commit message creation
- `npm test` - Run tests

### Code Quality

This project enforces high code quality standards:

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking
- **Husky** - Git hooks
- **Commitlint** - Commit message validation
- **Lint-staged** - Pre-commit file processing

### Commit Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/) for
consistent commit messages. See [COMMIT_GUIDELINES.md](./COMMIT_GUIDELINES.md)
for detailed information.

#### Quick Commit Examples

```bash
# Interactive commit (recommended)
npm run commit

# Manual commits
git commit -m "feat(calendar): add month view toggle"
git commit -m "fix(table): resolve sorting issue with date columns"
git commit -m "test(forms): add validation tests for entry form"
git commit -m "wip(forms): implement entry validation logic"
git commit -m "ui(components): improve button hover states"
git commit -m "db(schema): add indexes for entry queries"
git commit -m "docs(api): update GraphQL schema documentation"
```

## Automated Workflows

### CI/CD Pipeline

GitHub Actions automatically:

- **Lint and Type Check** - On every push and PR
- **Build Verification** - Ensures code compiles
- **Security Audit** - Checks for vulnerabilities
- **Test Execution** - Runs test suite

### Automated Commits

Scheduled maintenance tasks:

- **Dependency Updates** - Weekly dependency updates
- **Security Patches** - Automated security fixes
- **Documentation Updates** - Keep docs current
- **Code Cleanup** - Format and optimize code

## Contributing

**TODO**

## Documentation

- [Commit Guidelines](./COMMIT_GUIDELINES.md) - Detailed commit standards
- [Production Plan](./PRODUCTION_PLAN.md) - Development roadmap
- [Project Prompt](./PROJECT_PROMPT.md) - Original project requirements

## License

This project is private and proprietary.

---

**Last updated**: 2024-12-19
