// cypress/e2e/login.cy.js

describe('Login Tests - SauceDemo', () => {
  const baseUrl = 'https://www.saucedemo.com/';

  const testCases = [
    { id: 'TC01', username: 'standard_user', password: 'secret_sauce', expected: 'success' },
    { id: 'TC02', username: 'locked_out_user', password: 'secret_sauce', expected: 'locked' },
    { id: 'TC03', username: 'problem_user', password: 'secret_sauce', expected: 'success' },
    { id: 'TC04', username: 'performance_glitch_user', password: 'secret_sauce', expected: 'success' },
    { id: 'TC05', username: 'error_user', password: 'secret_sauce', expected: 'success' },
    { id: 'TC06', username: 'visual_user', password: 'secret_sauce', expected: 'success' },
    { id: 'TC07', username: 'standard_user', password: 'wrong password', expected: 'error' },
    { id: 'TC08', username: '', password: 'secret_sauce', expected: 'error' },
    { id: 'TC09', username: 'standard_user', password: '', expected: 'error' },
    { id: 'TC10', username: '', password: '', expected: 'error' },
    { id: 'TC11', username: 'invalid_user', password: 'secret_sauce', expected: 'error' },
    { id: 'TC12', username: 'Standard_User', password: 'secret_sauce', expected: 'error' },
  ];

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  testCases.forEach(tc => {
    it(`${tc.id} - Login with ${tc.username || 'blank username'} / ${tc.password || 'blank password'}`, () => {
      if (tc.username) cy.get('#user-name').type(tc.username);
      if (tc.password) cy.get('#password').type(tc.password);
      cy.get('#login-button').click();

      if (tc.expected == 'success') {
        cy.url().should('include', '/inventory.html');
      } else if (tc.expected === 'locked') {
        cy.get('[data-test="error"]').should('contain', 'locked out');
      } else if (tc.expected === 'error') {
        cy.get('[data-test="error"]').should('be.visible');
      }
    });
  });
});
