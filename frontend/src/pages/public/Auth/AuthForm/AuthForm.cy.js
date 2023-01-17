import React from 'react';
import AuthForm from './AuthForm';

describe('<AuthForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AuthForm />);
  });
});