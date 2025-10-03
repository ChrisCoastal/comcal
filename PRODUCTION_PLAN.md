## Scheduler: Staged Plan to Production

### Objectives

- [ ] Deliver a secure, reliable, and performant Scheduler app for desktop and mobile.
- [ ] Support CRUD on entries with real-time updates, basic auth for phase 1, and a clean path to a production backend.

## Phase 0 — Current State Snapshot

- [x] Frontend: Next.js 15, TanStack Table, shadcn/ui, mock data, strong table UX groundwork.
- [x] Data: `mockData` powering UI locally; no real backend calls yet.
- [x] Types: Base `CommunicationEntry` model and unions appear defined.
- [ ] Testing: Set up Jest + React Testing Library for component testing; establish testing patterns and utilities.

### Current Code Walkthrough

- [x] `app/page.tsx`: Implements entries list using TanStack Table with sorting, filtering, pagination, and column pinning styles; reads from `mockData`; renders shadcn `Table`, `Badge`, `Card`, and filter controls; sets groundwork for replacing with GraphQL data and subscriptions.
- [x] `components/ui/`: Shadcn-derived primitives (`button.tsx`, `badge.tsx`, `card.tsx`, `input.tsx`, `select.tsx`, `table.tsx`) used by the list; suitable for reuse across forms/detail views.
- [x] `data/mockData.ts`: Provides `mockEntries` matching the Communications Object fields; used to simulate backend responses in UI.
- [x] `types/index.ts`: Defines `CommunicationEntry` and related unions such as `Category`, `ScheduleStatus`, `LeadOrganization`; this will align with backend schema.
- [x] `app/layout.tsx` and `app/providers.tsx`: App shell and provider setup; ready to add Query client, theme, and auth context providers.
- [x] `app/globals.css`: Tailwind base styles and custom tweaks; verify table pinning and responsiveness.
- [x] `lib/utils.ts`: Utility helpers (e.g., className utilities) shared by UI components.
- [x] `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`: Build/tooling configuration aligned with Next.js 15 and TypeScript; ensure strictness and path aliases match codegen later.
- [ ] Testing setup: Jest configuration, React Testing Library setup, test utilities, and initial component tests for UI primitives.

## Phase 1 — Product Scope & Architecture Hardening

- [ ] Clarify phase-1 scope: Entries list, calendar, new entry form, entry detail.
- [ ] Define authoritative domain model for the Communications Object (types and constraints).
- [ ] Decide real-time strategy and transport shape (GraphQL Subscriptions vs WebSocket events).
- [ ] Select auth approach for phase 1: mock vs Supabase Auth or NextAuth.js with an email provider.
- [ ] Document non-functional requirements: uptime SLO, latency targets, accessibility, browser support.
- [ ] Define testing strategy: unit test coverage targets, integration test scope, e2e test critical paths.

Deliverables:

- [ ] Architecture decision record (ADR) for: Backend framework, DB, GraphQL, subscriptions, auth.
- [ ] Updated `types/` reflecting the finalized schema and enums.

## Phase 2 — Backend Foundations (NestJS + GraphQL)

- [ ] Initialize NestJS app with GraphQL (code-first), Apollo driver, and class-validator.
- [ ] Add modules: `entries`, `health`, `auth` (stub), `realtime`.
- [ ] Design schema: Query, Mutation, Subscription for entries.
- [ ] Implement basic in-memory repository with DTOs and resolvers to unblock frontend integration.
- [ ] Set up backend testing: Jest + Supertest for API tests, test database setup, service unit tests.

Deliverables:

- [ ] NestJS service skeleton with `EntriesResolver`, `EntriesService`, `Entry` entity, and `HealthController`.
- [ ] GraphQL schema exposed at `/graphql` with playground disabled in prod.

## Phase 3 — Database & Persistence (Supabase Postgres)

- [ ] Provision Supabase project and database.
- [ ] Define schema: `entries`, `locations`, junctions if needed, with indexes for common filters/sorts.
- [ ] Add migrations (e.g., using Prisma or Knex). Prefer Prisma for DX and type-safety.
- [ ] Implement repository layer with Prisma; map to GraphQL types.
- [ ] Seed sample data for dev.
- [ ] Add database integration tests: test migrations, repository layer tests with test database.

Deliverables:

- [ ] Prisma schema and migrations; `prisma migrate` workflows.
- [ ] Data access layer with pagination, sorting, and filtering.

## Phase 4 — Real-time Updates

- [ ] Choose GraphQL Subscriptions via WebSockets or use Supabase Realtime channels.
- [ ] If GraphQL Subscriptions: configure `@nestjs/graphql` + `graphql-ws` and pub/sub (e.g., Redis for multi-instance).
- [ ] Emit subscription events on create/update/delete; subscribe on frontend to update table and calendar.
- [ ] Add subscription testing: WebSocket connection tests, subscription event tests, real-time integration tests.

Deliverables:

- [ ] Subscriptions: `entryCreated`, `entryUpdated`, `entryDeleted`.
- [ ] Frontend integration with TanStack Query + subscription cache updates.

## Phase 5 — Authentication & Authorization (Minimal for Phase 1)

- [ ] Start with mock users; structure code for future providers.
- [ ] Add role model: event owner, admin, executive; gate mutations accordingly.
- [ ] If time permits, wire Supabase Auth or NextAuth.js with JWT sessions.
- [ ] Add auth testing: role-based access tests, JWT validation tests, auth flow integration tests.

Deliverables:

- [ ] Auth guard stubs in NestJS; role-based checks in resolvers/services.
- [ ] Frontend session context with basic user role handling.

## Phase 6 — Frontend Integration (Queries, Mutations, Forms)

- [ ] Replace mock data with GraphQL queries/mutations.
- [ ] Implement create/update/delete flows with React Hook Form + Zod validation matching backend validators.
- [ ] Add optimistic updates for snappy UX; reconcile with server via queries/subscriptions.
- [ ] Introduce the calendar view (day/week/month) fed by the same dataset.
- [ ] Add frontend integration tests: form validation tests, GraphQL query/mutation tests, optimistic update tests.

Deliverables:

- [ ] `useQuery`/`useMutation` hooks (can use codegen) for entries.
- [ ] Form schemas shared or duplicated carefully to match server.

## Phase 7 — Testing Strategy & Coverage

- [ ] Backend: unit tests (services), integration tests (resolvers with test DB), e2e tests (GraphQL endpoints).
- [ ] Frontend: unit tests (components), integration tests (forms, table interactions), and minimal e2e (Playwright or Cypress) for core flows.
- [ ] Add contract tests for GraphQL schema with codegen type checks.
- [ ] Establish testing standards: minimum coverage thresholds, test naming conventions, test data factories.
- [ ] Performance testing: load tests for critical endpoints, frontend performance budgets.

Deliverables:

- [ ] CI test matrix with clear pass/fail gates.
- [ ] Test coverage reports and quality gates.
- [ ] Automated test data setup and teardown.

## Phase 8 — CI/CD & Environments

- [ ] Environments: `dev` (preview), `staging`, `production`.
- [ ] CI: lint, typecheck, test, build front and back; generate GraphQL types.
- [ ] CD: deploy frontend to Vercel; backend to a managed environment (Fly.io, Render, or AWS ECS/Fargate). Supabase hosts Postgres.
- [ ] Use environment-specific secrets; no secrets in repo.
- [ ] Testing in CI: parallel test execution, test result reporting, coverage tracking, flaky test detection.

Deliverables:

- [ ] GitHub Actions (or equivalent) workflows for CI and CD with caching.

## Phase 9 — Observability & Operations

- [ ] Logging: structured JSON logs; correlate request IDs across FE/BE.
- [ ] Metrics: basic RED/USE metrics for API; capture p95 latencies.
- [ ] Tracing: OpenTelemetry where possible.
- [ ] Health checks and readiness probes for backend.

Deliverables:

- [ ] Dashboards/alerts for API errors, latency, and subscription disconnects.

## Phase 10 — Security, Compliance, and Hardening

- [ ] Input validation on both client and server.
- [ ] Rate limiting on mutations and auth endpoints.
- [ ] CORS, HTTPS-only, HSTS in production.
- [ ] Secure headers on frontend (Next.js headers) and backend (Helmet).
- [ ] Secrets management via platform KMS/secret store.
- [ ] Access logs and minimal PII handling.

Deliverables:

- [ ] Security checklist completed; automated dependency scanning.

## Phase 11 — Performance & Accessibility

- [ ] Performance budgets for FE; analyze with Lighthouse and Web Vitals.
- [ ] Optimize table virtualization, memoization, and bundle size (code splitting, selective imports).
- [ ] Accessibility review for forms, table, and calendar. Target WCAG 2.1 AA.
- [ ] Revisit table state management: persist filters/sort/pinning (URL/localStorage) and centralize state.

Deliverables:

- [ ] Actioned perf and a11y issues with before/after metrics.

## Phase 12 — Data Migration & Rollout

- [ ] Define initial dataset import path (CSV/JSON) if needed.
- [ ] Backfill scripts and idempotent migrations.
- [ ] Staged rollout: internal testing → pilot users → prod; feature flags for risky features.
- [ ] Incident playbook and rollback plan.

Deliverables:

- [ ] Runbooks for deploy/rollback; data migration scripts.

## Phase 13 — Production Readiness Checklist

- [ ] All ADRs merged; schema stable
- [ ] Lint, typecheck, tests green on main
- [ ] FE and BE have health checks and dashboards
- [ ] Error budgets and alerts configured
- [ ] Secrets rotated and documented
- [ ] Security headers, CORS, HSTS verified
- [ ] E2E happy-path tests pass in staging
- [ ] SLOs documented and met in staging
- [ ] Backups enabled and tested for DB
- [ ] Runbook linked from README
- [ ] Test coverage meets minimum thresholds (80%+ unit, 60%+ integration)
- [ ] All critical user journeys covered by e2e tests
- [ ] Performance tests pass with acceptable thresholds

## Work Breakdown (Week-by-Week Outline)

Week 1: Architecture decisions, backend skeleton, schema draft, Prisma setup, testing foundation
Week 2: DB migrations, core CRUD resolvers, FE queries/mutations wiring, unit test coverage
Week 3: Real-time subscriptions, optimistic UI, calendar view, integration tests
Week 4: Auth/roles baseline, testing coverage, CI stabilization, e2e test suite
Week 5: Perf/a11y pass, security hardening, observability, performance testing
Week 6: Staging soak, pilot rollout, production go-live, test validation

## Open Questions for You

1. Hosting preference for backend? (Fly.io, Render, AWS, other)
2. Auth provider for phase 1 vs phase 2? (Mock now → Supabase/NextAuth later)
3. Any compliance or data residency constraints?
4. Expected user volume and concurrency targets (p95 latency goals)?
5. Real-time preference: GraphQL Subscriptions vs Supabase Realtime channels?
6. Calendar requirements: must-have interactions and views at launch?
7. Roles/permissions nuance beyond owner/admin/executive?
8. Error reporting tool preference (Sentry, OpenTelemetry backend)?
9. Incident response expectations (paging, SLAs, maintenance windows)?
10. Migration/seed data sources we should plan to import?
11. Date formatting utility preference? (date-fns, dayjs, or native Intl.DateTimeFormat)

## Next Steps (Once Questions Are Resolved)

- Lock ADRs and update schema/types.
- Implement backend modules and FE integration per phases above.
- Stand up CI/CD and staging; begin test runs and perf/a11y passes.
