# Product Research Dashboard (Enterprise Overview)

## Strategic Context
This application is an **Enterprise-Grade Product Research Platform** designed to analyze e-commerce market trends, calculate profitability risks, and identify high-growth opportunities.

Unlike standard dashboard demos, this project is engineered as a **Scalable System** rather than just a User Interface. It focuses on Architecture, Security, Data Integrity, and Technical Governance, demonstrating the standards required for high-growth startups and unicorns.

---

## 🏛️ System Architecture

### Core Tech Stack
*   **Framework**: Next.js 16 (App Router + React Server Components)
*   **Language**: JavaScript (Strict Mode + Zod Validation)
*   **Styling**: Tailwind CSS + Shadcn UI (Design System Tokenization)
*   **State Management**: Server Actions + URL-Driven State + Optimistic UI
*   **Testing**: Vitest (Unit Testing)

### Key Architectural Patterns
1.  **Service Layer Pattern (`src/lib/services`)**:
    *   **Decision**: Decoupled Data Access Logic from UI Components.
    *   **Benefit**: Allows swapping the underlying data source (JSON -> PostgreSQL) without refactoring any UI code.
2.  **Edge Security (`middleware.js`)**:
    *   **Decision**: Implemented Strict Content Security Policy (CSP), HSTS, and X-Frame-Options at the middleware level.
    *   **Benefit**: Protects the entire application surface area from XSS and Clickjacking attacks by default.
3.  **Structured Observability (`src/lib/logger.js`)**:
    *   **Decision**: Replaced console logs with a standardized JSON Logger.
    *   **Benefit**: Logs are machine-parsable and ready for ingestion by enterprise tools like Datadog or Splunk.
4.  **Architecture Decision Records (ADRs)**:
    *   See `ADR.md`. We document the "Why" behind every major technical choice to manage Technical Debt and provide context for future teams.

---

## 💼 Business Intelligence Features

### Executive Summary Widget
A top-level strategic view aggregating:
*   **Total Addressable Market (TAM)**: Real-time calculation based on search volume and pricing.
*   **Risk Analysis**: auto-flagging of SKUs with saturation risks (defined as High Competition + Low Margin).

### Profitability Simulator
Interactive financial modeling tool allowing users to stress-test unit economics by adjusting:
*   Cost of Goods Sold (COGS)
*   Advertising Spend (CPA)
*   Shipping & Logistics Costs

### Competitive Intelligence
Deterministic competitor analysis engine that generates comparative market data based on product heuristics.

---

## 🚀 Advanced UX & Performance

*   **Optimistic UI**: "Add to Watchlist" actions are instant (0ms latency perception), using `useOptimistic` to update the UI before the server responds.
*   **URL-Driven State**: All filters, search queries, and sort orders are persisted in the URL, ensuring the dashboard state is shareable and bookmarkable (Deep Linking).
*   **Global Command Palette**: System-wide `Cmd+K` navigation for power users.
*   **Skeleton Streaming**: Suspense boundaries ensure the UI remains responsive while data loads.

---

## 🛠️ Operating Instructions

### Prerequisites
*   Node.js 18+
*   npm or yarn

### Installation
```bash
git clone https://github.com/Pusri27/market-intelligence-platform.git
cd product-research-dashboard
npm install
```

### Development
```bash
npm run dev
# The dashboard will be available at http://localhost:3000
```

### Testing
```bash
npm test
# Runs the Vitest suite against the Service Layer
```

### Production Build
```bash
npm run build
npm start
```

---

## 🛡️ Governance & Quality
*   **Linting**: Strict ESLint configuration.
*   **Error Handling**: Global Error Boundaries (`error.js`) catch and log runtime exceptions without crashing the entire application.
*   **Validation**: All user inputs (mutations) are validated extensively using **Zod** schemas to prevent database corruption.

---

*This project is engineered by **[Pusri Ananda Handal](https://github.com/Pusri27)** to demonstrate Executive-Level capabilities in Frontend Architecture and System Design.*
