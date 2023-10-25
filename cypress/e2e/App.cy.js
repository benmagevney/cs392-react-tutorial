/* globals cy */

describe('Test App', () => {

    it('launches', () => {
        cy.visit('/');
    });

    it('opens with Fall CS courses', () => {
        cy.visit('/');
        cy.get('[data-cy=course]').should('contain', 'Fall CS');
    });

    it('shows Winter courses when Winter is selected', () => {
        cy.visit('/');
        cy.get('[data-cy=winter]').click();
        cy.get('[data-cy=course]').should('contain', 'Winter');
    });
});