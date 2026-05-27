describe('Tarocchi reading flow', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('generates four cards, flips one, and opens daily arcana', () => {
    cy.visit('/home');

    cy.get('[data-testid="generate-btn"]').click();
    cy.get('[data-testid="memory-card"]').should('have.length', 4);
    cy.get('[data-testid="memory-card"]').first().should('have.attr', 'data-flipped', 'true');

    cy.get('[data-testid="memory-card"]').first().click();
    cy.get('[data-testid="memory-card"]').first().should('have.attr', 'data-flipped', 'false');

    cy.get('[data-testid="arcana-btn"]').click();
    cy.get('[data-testid="arcana-modal"]').should('be.visible');
    cy.get('[data-testid="arcana-modal-title"]').should('not.be.empty');
    cy.contains('Chiudi').click();
    cy.get('[data-testid="arcana-modal"]').should('not.exist');
  });

  it('regenerates cards with backs visible', () => {
    cy.visit('/home');
    cy.get('[data-testid="generate-btn"]').click();
    cy.get('[data-testid="memory-card"]').first().click();
    cy.get('[data-testid="generate-btn"]').click();
    cy.get('[data-testid="memory-card"]').should('have.length', 4);
    cy.get('[data-testid="memory-card"]').each(($card) => {
      cy.wrap($card).should('have.attr', 'data-flipped', 'true');
    });
  });
});
