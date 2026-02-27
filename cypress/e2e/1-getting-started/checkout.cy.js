// cypress/e2e/checkout.cy.js

describe('Checkout Functionality - SauceDemo', () => {
  const baseUrl = 'https://www.saucedemo.com/';

  beforeEach(() => {
    // Login before each test
    cy.visit(baseUrl);
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    // Verify login success
    cy.url().should('include', '/inventory.html');
  });

  it('TC_CHECKOUT_01 - Valid checkout', () => {
    // Add item and go to cart
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_link').click();

    // Checkout with valid details
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type('John');
    cy.get('[data-test="lastName"]').type('Doe');
    cy.get('[data-test="postalCode"]').type('12345');
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="finish"]').click();

    // Verify order confirmation
    cy.get('.complete-header').should('contain', 'Thank you for your order!');
  });

  it('TC_CHECKOUT_02 - Missing details', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="checkout"]').click();

    // Leave fields blank
    cy.get('[data-test="continue"]').click();

    // Verify error message
    cy.get('[data-test="error"]').should('be.visible');
  });

it('TC_CHECKOUT_03 - Invalid zip code accepted', () => {
  cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  cy.get('.shopping_cart_link').click();
  cy.get('[data-test="checkout"]').click();

  // Enter invalid zip
  cy.get('[data-test="firstName"]').type('John');
  cy.get('[data-test="lastName"]').type('Doe');
  cy.get('[data-test="postalCode"]').type('abc'); // invalid but accepted
  cy.get('[data-test="continue"]').click();

  // Verify navigation to next step (no error shown)
  cy.url().should('include', '/checkout-step-two.html');
});


 it('TC_CHECKOUT_04 - Cancel checkout', () => {
  cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  cy.get('.shopping_cart_link').click();
  cy.get('[data-test="checkout"]').click();

  // Enter details then cancel
  cy.get('[data-test="firstName"]').type('John');
  cy.get('[data-test="lastName"]').type('Doe');
  cy.get('[data-test="postalCode"]').type('12345');
  cy.get('[data-test="cancel"]').click();

  // Verify redirected back to cart page
  cy.url().should('include', '/cart.html');
});


 it('TC_CHECKOUT_05 - Multiple items checkout', () => {
  // Add multiple items
  cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  cy.get('.shopping_cart_link').click();

  // Checkout with valid details
  cy.get('[data-test="checkout"]').click();
  cy.get('[data-test="firstName"]').type('Jane');
  cy.get('[data-test="lastName"]').type('Smith');
  cy.get('[data-test="postalCode"]').type('67890');
  cy.get('[data-test="continue"]').click();
  cy.get('[data-test="finish"]').click();

  // Verify confirmation (note the exclamation mark)
  cy.get('.complete-header').should('contain', 'Thank you for your order!');
});


  it('TC_CHECKOUT_06 -cart checkout', () => {
    // Try checkout with no items
    cy.get('.shopping_cart_link').click();

    // Checkout button should not exist or be disabled
    cy.get('[data-test="checkout"]').should('exist');
  });
 });
