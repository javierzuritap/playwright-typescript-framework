# playwright-project-ts

End-to-end (E2E) automation suite for SauceDemo built with **Playwright + TypeScript**, following the **Page Object Model (POM)** pattern, featuring custom fixtures, Allure reporting, and a complete CI/CD pipeline using GitHub Actions.

---

# Tech Stack

- Playwright + @playwright/test
- TypeScript
- Page Object Model (separate elements / methods / data per page)
- Custom Playwright Fixtures (`fixtures/fixtures.ts`)
- Allure Report (`allure-playwright`)
- ESLint + typescript-eslint
- GitHub Actions (CI/CD + GitHub Pages deployment)

---

# Project Structure

```text
.
├── .github/workflows/playwright.yml   CI/CD pipeline
├── fixtures/fixtures.ts               Playwright fixtures (test & authenticatedTest)
├── interfaces/                        TypeScript interfaces (User, Product, CheckoutInformation)
├── pages/                             Page Objects (split into elements/methods/data)
│   ├── common-page/
│   ├── login-page/
│   ├── products-page/
│   ├── product-detail-page/
│   ├── cart-page/
│   ├── checkout-page/
│   └── checkout-overview-page/
├── tests/                             Test suites (Login, Products, Cart, Checkout)
├── utils/logger.ts                    Reusable logger
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

---

# Installation

## Prerequisites

- Node.js 18 or later (Node.js 22 recommended)
- npm

## Clone the repository

```bash
git clone https://github.com/javierzuritap/proyecto-playwright-ts.git
cd proyecto-playwright-ts
```

## Install dependencies

```bash
npm install
```

## Install Playwright browsers

```bash
npx playwright install --with-deps
```

If you only need a specific browser:

```bash
npx playwright install chromium --with-deps
```

To generate and view Allure reports locally, Java must also be installed because Allure Commandline requires it. The `allure-commandline` dependency is installed automatically when running `npm install`.

---

# Running the Tests

```bash
npm test                       # Run all tests on all browsers
npm run test:chromium          # Chromium only
npm run test:firefox           # Firefox only
npm run test:webkit            # WebKit only
npm run test:headed            # Run with browser UI
npm run test:debug             # Debug mode
npm run test:ui                # Playwright UI Mode

npm run test:login             # Login suite
npm run test:products          # Products suite
npm run test:cart              # Cart suite
npm run test:checkout          # Checkout suite
```

Run a specific test by name:

```bash
npx playwright test -g "should login successfully with standard_user"
```

Run a specific test file:

```bash
npx playwright test tests/test02.spec.ts
```

---

# Allure Report

```bash
npm run allure:clean       # Remove previous reports
npm run allure:generate    # Generate HTML report
npm run allure:open        # Open generated report
npm run allure:serve       # Generate and open report
```

The `pretest` script automatically cleans previous results before each execution, while `posttest` generates the report after the test run. Therefore, after running `npm test`, simply execute:

```bash
npm run allure:open
```

---

# Code Quality

```bash
npm run typecheck    # TypeScript compilation without emitting files
npm run lint         # Run ESLint across the project
```

---

# CI/CD

The workflow located at:

```text
.github/workflows/playwright.yml
```

runs automatically on:

- Push to `main`, `master`, and `feature/**`
- Pull Requests targeting `main` or `master`
- Manual execution via `workflow_dispatch`

Each execution performs the following steps:

- Installs dependencies
- Installs Playwright browsers
- Runs TypeScript type checking
- Executes ESLint
- Runs all Playwright tests
- Generates the Allure report
- Uploads the following artifacts:
  - Playwright HTML Report
  - Allure HTML Report
  - Raw Allure Results
- Deploys the Allure report to GitHub Pages when running from the `main` branch

---

# Enable GitHub Pages (First Time Only)

1. Open your repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Source**, select **GitHub Actions**.
4. Save the configuration.

No branch or folder selection is required—the workflow automatically publishes the correct artifact.

After the first successful push to `main`, the report URL will be available:

- In the **Actions** tab, inside the **Deploy** job.
- Under **Settings → Pages**.

---

# SauceDemo Test Users

| Username | Password | Description |
|----------|----------|-------------|
| standard_user | secret_sauce | Standard valid user |
| locked_out_user | secret_sauce | Locked user |
| problem_user | secret_sauce | User with intentional UI issues |
| performance_glitch_user | secret_sauce | User with intentional performance delays |
