import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://restful-booker.herokuapp.com',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    // The public demo API is shared and occasionally slow; retry once in CI.
    retries: { runMode: 1, openMode: 0 },
    env: {
      // Public demo credentials from the API docs. Override with
      // CYPRESS_API_USERNAME / CYPRESS_API_PASSWORD for other environments.
      API_USERNAME: 'admin',
      API_PASSWORD: 'password123',
      // Public SauceDemo credentials. Override with CYPRESS_UI_USERNAME / CYPRESS_UI_PASSWORD.
      UI_USERNAME: 'standard_user',
      UI_PASSWORD: 'secret_sauce',
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
