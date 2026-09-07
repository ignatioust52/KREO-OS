# KREO Architecture

KREO is built as a **Modular Monolith** using the Next.js App Router.

## Domain-Driven Structure
The codebase is structured around core business domains to prevent a "giant everything" architecture.

```text
/src
  /domains
    /auth         # Authentication & User Management
    /businesses   # Business/Organization Management, Business Switcher
    /clients      # Client CRM, Portals
    /projects     # Project Workspaces, Tasks, Deliverables
    /finance      # Quotes, Invoices, Payments, Expenses
    /ai           # KAI (KREO AI) interactions
```

## Technology Stack
- **Frontend/Backend**: Next.js (App Router, Server Actions)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Styling**: Tailwind CSS & shadcn/ui

## The Central Data Model: PROJECT
The `Project` is the central object where business activity becomes concrete. All tasks, deliverables, money, and client communications tie back to the Project.

## Multi-Tenant Security
Organizations (Businesses) are strictly isolated. A User can belong to multiple Businesses, but data from one Business never leaks into another.
Server-side authorization validates that a user has the appropriate Role within the current Business context before allowing access to Projects, Clients, or Financial data.
