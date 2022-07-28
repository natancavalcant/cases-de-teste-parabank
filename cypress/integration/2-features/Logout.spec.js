const user = require('../../fixtures/userDefault.json')

describe("Find transactions", ()=>{

  beforeEach(()=>{
    cy.visit('https://parabank.parasoft.com/parabank')
  })

  it('prepare a user accout and do login', ()=>{
    cy.visit('https://parabank.parasoft.com/parabank')
    cy.signup(user)
  })

  it('verify can access home page', ()=>{
    cy.login(user.username, user.password)

    cy.get('#leftPanel').contains('Welcome')

    cy.get('#leftPanel ul li a').should('have.length', 8)

  })

  it('do log out', ()=>{
    cy.login(user.username, user.password)

    cy.get('#leftPanel ul li a').contains('Log Out').click({force:true})

    cy.get('#leftPanel h2').contains('Customer Login').should('be.visible')
  })

})