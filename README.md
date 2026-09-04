Candidate Register
A lightweight, isolated web application designed to help HR teams and hiring managers track job applicants through every stage of the recruitment pipeline.

Setup Instructions
Prerequisites
Node.js: v18.0.0 or higher

npm: v9.0.0 or higher (or yarn / pnpm)

Installation & Local Development
Clone the repository & navigate to project directory

Bash
git clone <repository-url>
cd candidate-register
Install dependencies

Bash
npm install
Start the development server

Bash
npm run dev
Access the application
Open your browser and navigate to http://localhost:5173 (or the local URL provided in your terminal).

Technical Decisions & Architecture

1. Component Modularization & Architecture
   Separation of Concerns: Extracted individual UI entities from the monolithic implementation into dedicated component modules (CandidateCard, CandidateForm, DetailPanel). This simplifies maintenance, component isolation, and future unit testing.

Reusable UI Components: Abstracted common elements—such as Modal containers and the interactive Stars rating module—into isolated UI primitives under src/components/UI/ to keep core component logic lean.

Centralized Domain Constants: Consolidated stage configurations, tone color mappings, initial mock data, and utility functions (uid) into src/constants/candidates.js to ensure a single source of truth across components.

2. State Management & Data Persistence
   Standardized Web LocalStorage: Replaced proprietary or non-standard window.storage calls with native localStorage APIs wrapped in defensive try/catch blocks.

Optimistic Local Persistence: Implemented a non-blocking persistence flow via React useEffect hooks, preserving state seamlessly across page reloads with inline error feedback if storage fails.

3. Performance & Usability Optimizations
   Memoized Filtering & Aggregation: Utilized React's useMemo hook for search filtering (name, email, position) and dynamic tag listings to prevent unnecessary recalculations during renders.

Contextual Modals & Forms: Combined creation and updating logic inside a single CandidateForm component powered by optional chaining (initial?.id ?? uid()), minimizing redundant form logic while supporting full CRUD operations.
