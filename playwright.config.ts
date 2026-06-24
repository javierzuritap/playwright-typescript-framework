import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Directorio donde están los tests
  testDir: './tests',

  // Ejecutar tests en paralelo dentro de cada archivo
  fullyParallel: true,

  // Fallar el build si hay un test.only accidentalmente en CI
  forbidOnly: !!process.env.CI,

  // Número de reintentos en caso de fallo (0 en local, 2 en CI)
  retries: process.env.CI ? 2 : 0,

  // Número de workers paralelos (undefined = automático según CPUs)
  workers: process.env.CI ? 1 : undefined,

  // Reporter: html genera el reporte visual en playwright-report/
  reporter: [['html', { open: 'never' }], ['list']],

  use: {
    // URL base para usar con page.goto('/')
    baseURL: 'https://www.saucedemo.com',

    // Capturar trace en el primer reintento de un test fallido
    trace: 'on-first-retry',

    // Screenshot solo cuando falla
    screenshot: 'only-on-failure',

    // Video solo cuando falla
    video: 'on-first-retry',

    // Timeout de cada acción (click, fill, etc.) en ms
    actionTimeout: 10_000,

    // Timeout de navegación en ms
    navigationTimeout: 30_000,

    // Ejecutar en modo headless (false para ver el navegador)
    headless: true,
  },

  // Timeout global de cada test en ms
  timeout: 30_000,

  // Timeout para expect() en ms
  expect: {
    timeout: 5_000,
  },

  // Proyectos: un proyecto por navegador/dispositivo
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Dispositivos móviles (descomenta si los necesitas)
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  // Carpeta de salida para screenshots, videos y traces
  outputDir: './test-results',
});
