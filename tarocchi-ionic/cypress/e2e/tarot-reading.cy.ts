describe('Tarocchi reading flow', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('tarocchi-onboarding-v2', 'done');
  });

  it('loads four cards on start, flips one, and opens daily arcana', () => {
    cy.visit('/home');

    cy.get('[data-testid="memory-card"]', { timeout: 15000 }).should('have.length', 4);
    cy.get('[data-testid="memory-card"]').first().should('have.attr', 'data-flipped', 'true');
    cy.get('[data-testid="read-more-btn"]').should('not.exist');

    cy.get('[data-testid="memory-card"]').first().click();
    cy.get('[data-testid="memory-card"]').first().should('have.attr', 'data-flipped', 'false');
    cy.get('[data-testid="memory-card"]').first().should('have.attr', 'data-revealed', 'true');

    cy.get('[data-testid="arcana-btn"]').click();
    cy.get('[data-testid="arcana-modal"]').should('be.visible');
    cy.get('[data-testid="arcana-modal-title"]').should('not.be.empty');
    cy.contains('Chiudi').click();
    cy.get('[data-testid="arcana-modal"]').should('not.exist');
  });

  it('switches to three-card spread and shows three cards', () => {
    cy.visit('/home');
    cy.get('[data-testid="memory-card"]', { timeout: 15000 }).should('have.length', 4);
    cy.get('[data-testid="spread-three"]').click();
    cy.get('[data-testid="memory-card"]', { timeout: 15000 }).should('have.length', 3);
  });

  it('saves reading to history in settings after generation', () => {
    cy.visit('/home');
    cy.get('[data-testid="memory-card"]', { timeout: 15000 }).should('have.length', 4);
    cy.get('[data-testid="generate-btn"]').click();
    cy.get('[data-testid="memory-card"]', { timeout: 15000 }).should('have.length', 4);
    cy.visit('/settings');
    cy.get('[data-testid="reading-history"]').should('be.visible');
    cy.get('.settings-history__item').should('have.length.at.least', 1);
  });

  it('shows deal ritual with status above deck on regenerate', () => {
    cy.visit('/home');
    cy.get('[data-testid="memory-card"]', { timeout: 15000 }).should('have.length', 4);
    cy.get('[data-testid="generate-btn"]').click();
    cy.get('[data-testid="dealing-ritual"]', { timeout: 4000 }).should('be.visible');
    cy.get('[data-testid="dealing-status"]').should('not.be.empty');
    cy.get('[data-testid="card-deck-stack"]').should('be.visible');
    cy.get('[data-testid="dealing-ritual"]').then(($ritual) => {
      const children = $ritual.children().toArray();
      const statusIdx = children.findIndex((el) => el.getAttribute('data-testid') === 'dealing-status');
      const deckIdx = children.findIndex((el) => el.getAttribute('data-testid') === 'card-deck-stack');
      expect(statusIdx).to.be.greaterThan(-1);
      expect(deckIdx).to.be.greaterThan(-1);
      expect(statusIdx).to.be.lessThan(deckIdx);
    });
    cy.get('[data-testid="memory-card"]', { timeout: 15000 }).should('have.length', 4);
  });

  it('regenerates cards with backs visible', () => {
    cy.visit('/home');
    cy.get('[data-testid="memory-card"]', { timeout: 15000 }).should('have.length', 4);
    cy.get('[data-testid="memory-card"]').first().click();
    cy.get('[data-testid="generate-btn"]').click();
    cy.get('[data-testid="memory-card"]', { timeout: 15000 }).should('have.length', 4);
    cy.get('[data-testid="read-more-btn"]').should('not.exist');
    cy.get('[data-testid="memory-card"]').each(($card) => {
      cy.wrap($card).should('have.attr', 'data-flipped', 'true');
      cy.wrap($card).should('have.attr', 'data-revealed', 'false');
    });
  });

  it('opens settings with language and theme selectors', () => {
    cy.visit('/settings');
    cy.get('[data-testid="language-select"]').should('exist');
    cy.get('[data-testid="table-theme-select"]').should('exist');
    cy.get('[data-testid="deck-theme-select"]').should('exist');
  });
});
