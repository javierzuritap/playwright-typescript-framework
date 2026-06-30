# proyecto-playwright-ts

Suite de automatización E2E para [SauceDemo](https://www.saucedemo.com) construida con Playwright + TypeScript, siguiendo el patrón Page Object Model, con fixtures personalizadas, reporte Allure y pipeline de CI/CD en GitHub Actions.

## Stack

- Playwright + @playwright/test
- TypeScript
- Page Object Model (elements / methods / data separados por página)
- Fixtures personalizadas (`fixtures/fixtures.ts`)
- Allure Report (`allure-playwright`)
- ESLint + typescript-eslint
- GitHub Actions (CI + publicación en GitHub Pages)

## Estructura del proyecto

```
.
├── .github/workflows/playwright.yml   Pipeline de CI/CD
├── fixtures/fixtures.ts               Fixtures de Playwright (test y authenticatedTest)
├── interfaces/                        Interfaces TypeScript (User, Product, CheckoutInformation)
├── pages/                             Page Objects (separados en elements/methods/data)
│   ├── common-page/
│   ├── login-page/
│   ├── products-page/
│   ├── product-detail-page/
│   ├── cart-page/
│   ├── checkout-page/
│   └── checkout-overview-page/
├── tests/                             Suites de test (test01 Login, test02 Products, test03 Cart, test04 Checkout)
├── utils/logger.ts                    Logger reutilizable
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

## Instalación

### Requisitos previos

- Node.js 18 o superior (recomendado 22)
- npm

### Pasos desde una carpeta vacía

```bash
git clone https://github.com/javierzuritap/proyecto-playwright-ts.git
cd proyecto-playwright-ts
npm install
npx playwright install --with-deps
```

Si solo necesitas un navegador concreto:

```bash
npx playwright install chromium --with-deps
```

Para generar y visualizar el reporte Allure en local necesitas además tener Java instalado (Allure Commandline lo requiere). La dependencia `allure-commandline` ya queda instalada con `npm install`.

## Ejecución de los tests

```bash
npm test                       # Todos los tests, todos los navegadores
npm run test:chromium          # Solo Chromium
npm run test:firefox           # Solo Firefox
npm run test:webkit            # Solo WebKit
npm run test:headed            # Con navegador visible
npm run test:debug             # Modo debug paso a paso
npm run test:ui                # Playwright UI Mode

npm run test:login             # Solo la suite de Login (test01)
npm run test:products          # Solo la suite de Products (test02)
npm run test:cart              # Solo la suite de Cart (test03)
npm run test:checkout          # Solo la suite de Checkout (test04)
```

Ejecutar un test concreto por nombre:

```bash
npx playwright test -g "should login successfully with standard_user"
```

Ejecutar un archivo concreto:

```bash
npx playwright test tests/test02.spec.ts
```

## Reporte Allure

```bash
npm run allure:clean       # Limpia allure-results y allure-report
npm run allure:generate    # Genera el reporte HTML a partir de allure-results
npm run allure:open        # Abre el reporte ya generado
npm run allure:serve       # Genera y abre el reporte en un solo paso
```

El script `pretest` limpia automáticamente los resultados antes de cada ejecución y `posttest` genera el reporte al finalizar, así que tras un `npm test` normal basta con `npm run allure:open`.

## Calidad de código

```bash
npm run typecheck    # Compilación TypeScript sin generar archivos
npm run lint          # ESLint sobre todo el proyecto
```

## CI/CD

El workflow `.github/workflows/playwright.yml` se ejecuta en:

- Push a `main`, `master` y `feature/**`
- Pull requests contra `main` o `master`
- Manualmente mediante `workflow_dispatch`

En cada ejecución: instala dependencias, instala los navegadores, compila TypeScript, pasa ESLint, ejecuta los tests, genera el reporte Allure, sube como artifacts el reporte HTML de Playwright, el reporte Allure y los resultados crudos, y publica el reporte Allure en GitHub Pages cuando la ejecución es sobre `main`.

### Activar GitHub Pages (solo la primera vez)

1. Entra en el repositorio en GitHub → **Settings** → **Pages**.
2. En **Source**, selecciona **GitHub Actions**.
3. Guarda. No hace falta seleccionar ninguna rama ni carpeta adicional: el workflow ya se encarga de publicar el artifact correcto.
4. Tras el primer `push` a `main` con el workflow activo, la URL del reporte aparecerá en la pestaña **Actions**, dentro del job `deploy`, y también en Settings → Pages.

## Usuarios de prueba (SauceDemo)

| Usuario | Contraseña | Comportamiento |
|---|---|---|
| `standard_user` | `secret_sauce` | Usuario válido estándar |
| `locked_out_user` | `secret_sauce` | Usuario bloqueado |
| `problem_user` | `secret_sauce` | Usuario con bugs visuales intencionados |
| `performance_glitch_user` | `secret_sauce` | Usuario con lentitud intencionada |
