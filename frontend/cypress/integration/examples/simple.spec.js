describe('My first Cypress Test', ()=>{
    it('Load correct url', ()=>{
        cy.visit('https://avensky.com/', {timeout:10000});
    });
//    it('should check correct url', ()=>{
//        cy.url().should('include', 'avensky');
//    });
});
