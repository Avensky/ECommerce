/// <reference types="cypress" /> 

describe('login and logout', () => {
    it('login', () => {
    cy.visit('/');
    cy.wait(3000);
    cy.get('.mobile-login').click();
    cy.get('input[name=email').type('test2@gmail.com');
    cy.get('input[name=password').type('Password90#');
    cy.get('.auth-btn').click();
    cy.wait(3000);
    cy.get('.mobile-logout').click();
    //cy.getByTestId('username').type('user123');
    //cy.getByTestId('password').type('pass123');
    //cy.getByTestId('submit').click();
    });
 });