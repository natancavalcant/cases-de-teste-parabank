const user = require('../../fixtures/userDefault.json')

describe("Open account", ()=>{

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

  it('try to access open account', ()=>{
    cy.login(user.username, user.password)
    cy.get('#leftPanel ul li a').contains('Open New Account').click({force:true})

    cy.get('#rightPanel').contains('Open New Account').should('be.visible')
    cy.get('#rightPanel input[value="Open New Account"]').should('be.enabled')
  })

  it('try to open new checking account', ()=>{
    cy.login(user.username, user.password)
    cy.get('#leftPanel ul li a').contains('Open New Account').click({force:true})

    cy.get('#rightPanel form #type').select(0)

    cy.wait(150)

    cy.get('#rightPanel input[type="submit"]').click({force:true})
        
    cy.get('#rightPanel').contains('Account Opened!').should('be.visible')
    cy.get('#rightPanel').contains('Congratulations, your account is now open.').should('be.visible')
  })
  
})