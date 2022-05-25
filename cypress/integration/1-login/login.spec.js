/// <reference types="cypress" />

describe("login", ()=>{
  beforeEach(()=>{

    cy.visit('https://parabank.parasoft.com/')
  })

  it('verify if in login page', ()=>{
    cy.get('#leftPanel h2').contains('Customer Login')

    cy.get('#loginPanel .login input[name=username]').should('be.visible')
    cy.get('#loginPanel .login input[name=password]').should('be.visible')
    cy.get('#loginPanel .login input[type=submit]').should('be.enabled')

  })

  it('try to logging in with a nonexitent account', ()=>{

    cy.get('#loginPanel .login input[name=username]').type('nonexistentUser')
    cy.get('#loginPanel .login input[name=password]').type('nonexistentPass')
    cy.get('#loginPanel .login input[type=submit]').click({force:true})

    cy.get('#rightPanel').contains('Error!')
    cy.get('#rightPanel').contains('The username and password could not be verified.')
  })
})