describe("Ajout de compte et API", () => {
    it("Vérifier le message de retour du formulaire d'ajout", () => {
        cy.fixture("example.json").then(users => {
            // Itérer sur chaque utilisateur
            users.user.forEach(oneUser => {
                cy.visit("https://testing.adrardev.fr/addUser");
                cy.get("form").within(() => {
                    cy.get('[name="nom"]').type(oneUser.nom);
                    cy.get('[name="prenom"]').type(oneUser.prenom);
                    cy.get('[name="mail"]').type(oneUser.mail);
                    cy.get('[name="mdp"]').type(oneUser.password);
                    cy.get('[type="submit"]').click();
                    if (
                        cy.get("#msgzone").invoke("text") ===
                        "Le compte a été ajouté en BDD"
                    ) {
                        cy.request(
                            "POST",
                            "https://testing.adrardev.fr/api/addTest",
                            {
                                date: Date.now(),
                                name: "luigi-passe-le-test",
                                valid: true,
                            }
                        );
                    } else if (
                        cy.get("#msgzone").invoke("text") ===
                        "Les informations sont incorrectes"
                    ) {
                        cy.request(
                            "POST",
                            "https://testing.adrardev.fr/api/addTest",
                            {
                                date: Date.now(),
                                name: "luigi-passe-pas-le-test",
                                valid: false,
                            }
                        );
                    }
                });
            });
        });
    });
});