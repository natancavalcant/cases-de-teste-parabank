// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
  cy.get('#loginPanel .login input[name=username]').type(username)
  cy.get('#loginPanel .login input[name=password]').type(password)
  cy.get('#loginPanel .login input[type=submit]').click({force:true})
})

Cypress.Commands.add('signup', (user) => {
  //reset data

  cy.get('#mainPanel a[href="admin.htm"').click({force:true})
  cy.get('#rightPanel button[value="CLEAN"]').click({force:true})
  cy.visit('https://parabank.parasoft.com/parabank/')

  //create account
  
  cy.get('a[href="register.htm"]').click({force:true})

  cy.get('#customerForm input[name="customer.firstName"]').type(user.name)
  cy.get('#customerForm input[name="customer.lastName"]').type(user.surname)
  cy.get('#customerForm input[name="customer.address.street"]').type(user.address)
  cy.get('#customerForm input[name="customer.address.city"]').type(user.city)
  cy.get('#customerForm input[name="customer.address.state"]').type(user.state)
  cy.get('#customerForm input[name="customer.address.zipCode"]').type(user.zip_code)
  cy.get('#customerForm input[name="customer.phoneNumber"]').type(user.phone)
  cy.get('#customerForm input[name="customer.ssn"]').type(user.ssn)

  cy.get('#customerForm input[name="customer.username"]').type(user.username)
  cy.get('#customerForm input[name="customer.password"]').type(user.password)
  cy.get('#customerForm input[name="repeatedPassword"]').type(user.password)

  cy.get('#customerForm table tr td input[type=submit]').click({force:true})

  cy.visit('https://parabank.parasoft.com/parabank/logout.htm')
})