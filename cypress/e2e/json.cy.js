describe("Test Affichage des fixtures User", () => {
    //récupération d'un json depuis fixture
    before(() => {
        cy.fixture("example.json").then(function (testData) {
            this.testData = testData.user;
        })
    })

    it("Users in console", function () {
        this.testData.forEach((user) => {
            cy.log(user.nom)
            cy.log(user.prenom)
            cy.log(user.mail)
            cy.log(user.password)
        })
    })
})

describe('Affichage des utilisateurs', () => {
    it('Afficher chaque utilisateur dans la console', () => {
        // Charger la fixture
        cy.fixture('example.json').then(users => {
            // Itérer sur chaque utilisateur
            users.user.forEach(oneUser => {
                // Afficher les détails de l'utilisateur dans la console
                cy.log(`Nom: ${oneUser.nom}, Prénom: ${oneUser.prenom}, Email: ${oneUser.mail}, Mot de passe: ${oneUser.password}`);
            });
        });
    });
});
  