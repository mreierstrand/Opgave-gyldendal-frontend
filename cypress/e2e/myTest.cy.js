describe('My First Test', () => {
  it('loads the homepage and checks for text', () => {
    cy.visit('http://localhost:5173');
    cy.contains('Elvis Presley');
  });
});