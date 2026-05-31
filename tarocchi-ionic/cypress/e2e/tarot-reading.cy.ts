describe('Tarocchi reading flow', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('tarocchi-onboarding-v1', 'done');
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

  it('generates three cards with past-present-future spread', () => {
    cy.visit('/home');
    cy.get('[data-testid="spread-three"]').click();
    cy.get('[data-testid="generate-btn"]').click();
    cy.get('[data-testid="memory-card"]').should('have.length', 3);
  });

  it('saves reading to history in settings', () => {
    cy.visit('/home');
    cy.get('[data-testid="generate-btn"]').click();
    cy.get('[data-testid="memory-card"]').should('have.length', 4);
    cy.visit('/settings');
    cy.get('[data-testid="reading-history"]').should('be.visible');
    cy.get('.settings-history__item').should('have.length.at.least', 1);
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

  it('opens settings with language and theme selectors', () => {
    cy.visit('/settings');
    cy.get('[data-testid="language-select"]').should('exist');
    cy.get('[data-testid="table-theme-select"]').should('exist');
    cy.get('[data-testid="deck-theme-select"]').should('exist');
  });
});
