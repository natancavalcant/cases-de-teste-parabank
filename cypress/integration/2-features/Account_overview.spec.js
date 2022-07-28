const user = require('../../fixtures/userDefault.json')

describe("Account overview", ()=>{

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

  it('try to access account overview', ()=>{
    cy.login(user.username, user.password)
    cy.get('#leftPanel ul li a').contains('Accounts Overview').click({force:true})

    cy.get('#rightPanel').contains('Accounts Overview').should('be.visible')
    cy.get('#rightPanel #accountTable').should('be.visible')
  })
  
  it('try to access account details', ()=>{
    cy.login(user.username, user.password)
    cy.get('#leftPanel ul li a').contains('Accounts Overview').click({force:true})

    cy.get('#rightPanel').contains('Accounts Overview').should('be.visible')
    cy.get('#rightPanel #accountTable tbody tr').first().find("td").first().click({force:true})

    cy.get('#rightPanel').contains('Account Details').should('be.visible')
    cy.get('#rightPanel').contains('Account Number').should('be.visible')
    cy.get('#rightPanel').contains('Account Type').should('be.visible')
    cy.get('#rightPanel').contains('Balance').should('be.visible')


  })

  it('try to access account activity', ()=>{
    cy.login(user.username, user.password)
    cy.get('#leftPanel ul li a').contains('Accounts Overview').click({force:true})

    cy.get('#rightPanel').contains('Accounts Overview').should('be.visible')
    cy.get('#rightPanel #accountTable tbody tr').first().find("td").first().click({force:true})

    cy.get('#rightPanel').contains('Account Details').should('be.visible')
    cy.get('#rightPanel').contains('Account Activity').should('be.visible')
    
    cy.get('#rightPanel').contains('No transactions found').should('be.visible')


  })
})