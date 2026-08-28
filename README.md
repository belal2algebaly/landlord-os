# Landlord OS

Landlord OS is a calm rental operating system for small landlords managing roughly 1–10 rentals.

## Production capabilities
- Public read-only live demo with isolated sample data
- Supabase email/password authentication and lifetime activation codes
- Private cloud portfolio with RLS and private file storage
- Home / Landlord Today action view
- Properties and property workspaces
- Tenants, leases and tenant ledger
- Rent tracking, partial payments and Smart Rent Chase
- Security deposit tracking
- Expenses, receipts, recurring costs and expense rules
- Maintenance triage and vendor memory
- Documents and alerts
- Property Health Score and Property Health Passport
- Move-in, move-out and routine inspections
- Vacancy Clock and estimated lost rent
- Property timeline
- Money Buckets and true profitability
- What-if Simulator and Rent Increase Planner
- Tax-ready CSV export, reports and JSON backup
- Intelligence Hub
- Mobile app-style responsive experience
- 11-language core UI; full in-app documentation maintained in English and Arabic

## Access control
Customer users can only access their own RLS-protected data. License generation, license listing, revocation and demo-reset controls are Admin-only. The public demo cannot write, upload, edit, delete or sync customer data.

## Deploy
Static frontend deployed to Vercel with Supabase as Auth / Database / Storage backend. No frontend build command is required.

_Last production documentation update: 2026-08-28_
