///<reference types="cypress" />

const user = require('../../fixtures/userDefault.json')

describe('signup', ()=>{
  beforeEach(()=>{

    cy.visit('https://parabank.parasoft.com/parabank/')
  })

  it('verify if in login page', ()=>{
    cy.get('#leftPanel h2').contains('Customer Login')

    cy.get('#loginPanel .login input[name=username]').should('be.visible')
    cy.get('#loginPanel .login input[name=password]').should('be.visible')
    cy.get('#loginPanel .login input[type=submit]').should('be.enabled')

  })

  it('access register page', ()=>{
    cy.get('a[href="register.htm"]').should('be.visible')

    cy.get('a[href="register.htm"]').click({force:true})
    
    cy.get('#rightPanel').contains('Signing up is easy!')
  })

  it('create account without required fields', ()=>{
    cy.get('a[href="register.htm"]').click({force:true})
    cy.get('#customerForm').should('be.visible')

    cy.get('#customerForm table tr td input[type=submit]').should('be.enabled')
    cy.get('#customerForm table tr td input[type=submit]').click({force:true})

    cy.get('#customerForm').contains('is required')

    cy.get('#customerForm table tr').find('.error').should('have.length', 10)
  })

  it('create account with unconfirmed password', ()=>{

    //reset data
    
    cy.get('#mainPanel a[href="admin.htm"').click({force:true})
    cy.get('#rightPanel button[value="CLEAN"]').click({force:true})
    cy.visit('https://parabank.parasoft.com/parabank/')

    //try to create account

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
    cy.get('#customerForm input[name="repeatedPassword"]').type(user.password + 'none')

    cy.get('#customerForm table tr td input[type=submit]').click({force:true})

    cy.get('#rightPanel').contains(`Passwords did not match.`)
  })

  it('create account', ()=>{

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

    cy.get('#rightPanel').contains(`Welcome ${user.username}`)

  })

  it('create a existent account', ()=>{
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

    cy.get('#rightPanel').contains('This username already exists.')
  })
})