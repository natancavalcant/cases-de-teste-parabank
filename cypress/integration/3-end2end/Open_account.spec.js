describe("Open account", ()=>{

  beforeEach(()=>{
    cy.visit('https://parabank.parasoft.com/parabank')
    cy.signup(user)
  })

  it('try to open new checking account', ()=>{
    cy.visit('https://parabank.parasoft.com/parabank')

    cy.login(user.username, user.password)

    cy.get('#leftPanel ul li a').contains('Open New Account').click({force:true})

    cy.get('#rightPanel form #type').select(0)

    cy.wait(150)

    cy.get('#rightPanel input[type="submit"]').click({force:true})
        
    cy.get('#rightPanel').contains('Account Opened!').should('be.visible')
    cy.get('#rightPanel').contains('Congratulations, your account is now open.').should('be.visible')

    cy.get('#leftPanel ul li a').contains('Log Out').click({force:true})

    cy.get('#leftPanel h2').contains('Customer Login').should('be.visible')
  })
  
})