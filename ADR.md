# Architecture Decision Records (ADR)

This document records the architectural decisions made for the **Product Research Dashboard**, serving as a historical context for future maintainers and stakeholders.

## ADR-001: Next.js App Router & Server Actions
* **Status**: Accepted
* **Date**: 2025-12-09
* **Context**: We needed a framework that supports both static dashboard views and dynamic data interaction (mutations) with minimal client-side bundle size.
* **Decision**: Use **Next.js 15+ App Router** with **React Server Components (RSC)**.
* **Consequences**:
    *   (+) **Performance**: Heavy dependencies (filtering logic, data parsing) stay on the server.
    *   (+) **Security**: Environment variables for "DB" access never leak to the client.
    *   (-) **Complexity**: Requires understanding of the Client/Server boundary.

## ADR-002: Service Layer Abstraction
* **Status**: Accepted
* **Date**: 2025-12-09
* **Context**: While currently using local JSON files, the business roadmap may require migration to Postgres or Supabase. Tying components directly to file-system logic would make migration painful.
* **Decision**: Encapsulate all data access in `src/lib/services/*.js`.
* **Consequences**:
    *   (+) **Maintainability**: The UI components don't care *where* data comes from.
    *   (+) **Testability**: We can easily mock the service layer for unit tests.

## ADR-003: Zod for Runtime Validation
* **Status**: Accepted
* **Context**: JavaScript is loosely typed. User inputs (Settings, Watchlist) could corrupt data integrity.
* **Decision**: Adopt **Zod** for strict schema validation on all Server Action inputs.
* **Consequences**:
    *   (+) **Reliability**: Crashing early with clear errors is better than silent data corruption.
    *   (+) **DX**: Shared schemas can potentially be used for frontend form validation too.

## ADR-004: Client-Side "Thin Backend" (MVP Phase)
* **Status**: Provisional (To be revisited)
* **Context**: Rapid prototyping needed without incurring cloud database costs or cold-starts.
* **Decision**: Use `src/data/*.json` with `fs/promises` as the persistence layer.
* **Consequences**:
    *   (+) **Speed**: Instant setup, zero latency (disk I/O only).
    *   (-) **Scalability**: Not suitable for multi-user concurrent writes (race conditions).
    *   (-) **Deployment**: Data is reset on Vercel deployments (ephemeral file system). *Acceptable for Portfolio Demo context.*
