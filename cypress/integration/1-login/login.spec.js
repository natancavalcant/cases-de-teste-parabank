/// <reference types="cypress" />

const user = require('../../fixtures/userDefault.json')

describe("login", ()=>{
  beforeEach(()=>{

    cy.visit('https://parabank.parasoft.com/parabank/')
  })

  it('verify if in login page', ()=>{
    cy.get('#leftPanel h2').contains('Customer Login')

    cy.get('#loginPanel .login input[name=username]').should('be.visible')
    cy.get('#loginPanel .login input[name=password]').should('be.visible')
    cy.get('#loginPanel .login input[type=submit]').should('be.enabled')

  })

  it('try to get error on login without username and password', () => {
    cy.get('#loginPanel .login input[type=submit]').click({force:true})

    cy.get('#rightPanel').contains('Error!')
    cy.get('#rightPanel').contains('Please enter a username and password.')
  })

  it('try to logging in with a nonexitent account', ()=>{

    cy.get('#loginPanel .login input[name=username]').type('nonexistentUser')
    cy.get('#loginPanel .login input[name=password]').type('nonexistentPass')
    cy.get('#loginPanel .login input[type=submit]').click({force:true})

    cy.get('#rightPanel').contains('Error!')
    cy.get('#rightPanel').contains('The username and password could not be verified.')
  })

  it('try to logging in a account', ()=>{
    cy.signup(user)

    cy.get('#loginPanel .login input[name=username]').type(user.username)
    cy.get('#loginPanel .login input[name=password]').type(user.password)
    cy.get('#loginPanel .login input[type=submit]').click({force:true})

    cy.get('#leftPanel').contains('Welcome')

  })
})