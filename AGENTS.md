# Repository Guidelines

## Project Structure & Module Organization
- Application routes and UI live in `src/app` and `src/components`, while Payload CMS schemas and server logic sit under `src/collections`, `src/blocks`, and the root `src/payload.config.ts`.
- Shared utilities, hooks, and providers are grouped in `src/utilities`, `src/hooks`, and `src/providers`. Design assets live in `src/assets` and global styles in `src/styles`.
- Static files ship from `public/`. Automated tests are split into `tests/int` (Vitest integration specs) and `tests/e2e` (Playwright flows).

## Build, Test, and Development Commands
- `pnpm dev` — run Next.js and Payload locally with hot reloading.
- `pnpm build` — create an optimized production build; follow with `pnpm start` to serve it.
- `pnpm lint` / `pnpm lint:fix` — apply the ESLint + Next.js rule set; run before submitting changes.
- `pnpm test`, `pnpm run test:int`, `pnpm run test:e2e` — execute the full suite or target Vitest and Playwright separately.
- `pnpm run generate:types` and `pnpm run generate:importmap` — regenerate Payload TypeScript bindings and import maps after schema updates.

## Coding Style & Naming Conventions
- TypeScript is the default; keep modules ESM and favor `async`/`await`. Components and blocks use `PascalCase` filenames; hooks start with `use`. Utility files in `src/utilities` stay `camelCase`.
- Stick to 2-space indentation as enforced by Prettier (run via editor integration) and the project ESLint config (`eslint.config.mjs`). Keep Tailwind class order logical; rely on `tailwind-merge` helpers when composing variants.
- Place Next.js route handlers and server actions in `src/app/**/route.ts`, and co-locate component-specific styles or tests where it reduces churn.

## Testing Guidelines
- Write integration specs in `tests/int` using Vitest (`*.int.spec.ts`) and cover API contracts exposed in `src/endpoints` and Payload collections. Mock external services with the shared setup in `vitest.setup.ts`.
- Record end-to-end scenarios in `tests/e2e` (`*.e2e.spec.ts`) using Playwright; update selectors via `data-testid` attributes instead of brittle DOM queries.
- Keep new features covered by at least one Vitest spec and one Playwright journey when they affect user flows. Always run `pnpm test` before opening a PR.

## Commit & Pull Request Guidelines
- Use imperative, descriptive commit messages following `type(scope): summary` (e.g., `feat(blocks): add hero carousel variant`). Avoid generic messages like `update`.
- For pull requests, include a concise summary, link related issues, list validation commands (`pnpm lint`, `pnpm test`), and attach UI screenshots or recordings when the change affects front-end visuals.
- Rebase onto the latest `main` before requesting review, ensure CI passes, and highlight any migrations or config changes that require deploy coordination.

## Environment & Configuration Tips
- Copy environment variables from `test.env` when bootstrapping local development, then override sensitive values in a private `.env`. Do not commit secrets.
- The repository provides `docker-compose.yml` for local Postgres; run it when testing Payload features that rely on database state persistence.
