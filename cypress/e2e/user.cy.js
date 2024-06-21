describe('Register', () => {
  //Test ajout d'un compte ok
  it('insertUser', () => {
    //paramètrage de la page web
    cy.visit('https://testing.adrardev.fr/addUser')
    //récupération et saisie dans les inputs
    cy.get(':input[name="nom"]').type('Mithridate')
    cy.get(':input[name="prenom"]').type('Mathieu')
    cy.get(':input[name="mail"]').type('test@test.com')
    cy.get('[type="password"]').type('1234')
    //clic sur le bouton submit
    cy.get(':input[name="submit"]').click()
    //test du message d'erreur
    cy.get('#msgzone').should('contain', "Le compte a été ajouté en BDD")
  })
  //Test doublon compte utilisateur
  it('doublonUser', () => {
    cy.visit('https://testing.adrardev.fr/addUser')
    cy.get(':input[name="nom"]').type('Mithridate')
    cy.get(':input[name="prenom"]').type('Mathieu')
    cy.get(':input[name="mail"]').type('test@test.com')
    cy.get('[type="password"]').type('1234')
    cy.get(':input[name="submit"]').click()
    cy.get('#msgzone').should('contain', "Les informations sont incorrectes")
  })
  //Test les champs ne sont pas remplis
  it('vide', ()=>{
    cy.visit('https://testing.adrardev.fr/addUser')
    cy.get(':input[name="mail"]').type('test@test.com')
    cy.get(':input[name="submit"]').click()
    cy.get('#msgzone').should('contain', "Veuillez remplir tous les champs du formulaire")
  })
})
