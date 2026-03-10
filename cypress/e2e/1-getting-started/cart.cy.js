// cypress/e2e/cart.cy.js

describe('Cart Functionality - SauceDemo', () => {
  const baseUrl = 'https://www.saucedemo.com/';

  beforeEach(() => {
    // Login before each test
    cy.visit(baseUrl);
  cy.get('#user-name').type(Cypress.env('username'));   // ✅ ab string milegi
  cy.get('#password').type(Cypress.env('password'));
    cy.get('#login-button').click();

    // Verify login success
    cy.url().should('include', '/inventory.html');
  });

  it('TC_CART_01 - Add single item', () => {
    // Add one product
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Verify cart badge shows 1
    cy.get('.shopping_cart_badge').should('contain', '1');
  });

  it('TC_CART_02 - Add multiple items', () => {
    // Add three products
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

    // Verify cart badge shows 3
    cy.get('.shopping_cart_badge').should('contain', '3');
  });

  it('TC_CART_03 - Remove item', () => {
    // Add then remove one product
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();

    // Verify cart badge disappears
    cy.get('.shopping_cart_badge').should('not.exist');
  });

  it('TC_CART_04 - Remove all items', () => {
    // Add two products
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    // Remove both
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();
    cy.get('[data-test="remove-sauce-labs-bike-light"]').click();

    // Verify cart badge disappears
    cy.get('.shopping_cart_badge').should('not.exist');
  });

  it('TC_CART_05 - View cart', () => {
    // Add two products
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    // Open cart
    cy.get('.shopping_cart_link').click();

    // Verify cart shows correct items
    cy.get('.cart_item').should('have.length', 2);
    cy.get('.inventory_item_name').should('contain', 'Sauce Labs Backpack');
    cy.get('.inventory_item_name').should('contain', 'Sauce Labs Bike Light');
  });

  it('TC_CART_06 - Cart persistence after logout/login', () => {
    // Add one product
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Logout
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').click();

    // Login again
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    // Verify cart should not resets to empty
    cy.get('.shopping_cart_badge').should('exist');
  });
});



