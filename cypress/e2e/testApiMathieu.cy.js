describe('Register', () => {
    //Test ajout d'un compte ok

    //Test doublon compte utilisateur

    //Test les champs ne sont pas remplis

    //Exemple test du contenu d'un élément du DOM
    //Exemple requête, réponse et alias
    it('api status 200 ?', ()=>{
      cy.visit('https://testing.adrardev.fr/test')
      const url = "https://www.googleapis.com/books/v1/volumes?q=seigneur"
      cy.request('GET',url).as('requete')
      cy.get('@requete').should((response) => {
        expect(response.status).to.eq(200)
      })
    })
    //Test ajout de compte et requête API
    it('addUserApi', ()=>{
      //paramétrage de la page web
      cy.visit('https://testing.adrardev.fr/addUser')
      //récupération et saisie dans les inputs
      cy.get(':input[name="nom"]').type('Mithridate')
      cy.get(':input[name="prenom"]').type('Mathieu')
      cy.get(':input[name="mail"]').type('test2@test.com')
      cy.get('[type="password"]').type('1234')
      //clic sur le bouton submit
      cy.get(':input[name="submit"]').click()
      //Récupération du message d'erreur
      cy.get('#msgzone').invoke("text").then((text => {
        //paramétre JSON (nom du test, date, statut)
        //Nom du test
        const name = 'addUser';
        //Date courante
        let date = new Date()
        //formatage de la date (2023-01-01)
        date = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
        const url = "https://testing.adrardev.fr/testingv3/api/addTest"
        //Vérification le compte à été ajouté en BDD
        if(text == "Le compte a été ajouté en BDD"){
          //Statut du test ok
          const valid = true
          //Construction du JSON
          const json = JSON.stringify({name:name, valid:valid, date:date})
          //Requête API 
          cy.request({
            method: 'POST',
            url: url, 
            body: json,
          })
        }
        //Vérification le compte existe déja (doublon)
        if(text == "Les informations sont incorrectes"){
          //Statut du test echec
          const valid = false
          //Construction du JSON
          const json = JSON.stringify({name:name, valid:valid, date:date})
          //Requête API
          cy.request({
            method: 'POST',
            url: url, 
            body: json,
          });
        }
      }))
    })
    //Tableau utilisateur
    const tabUser = [
      {"nom": "Test1", "prenom":"Test1", "mail":"test124@test.fr", "password":"1234"},
      {"nom": "Test2", "prenom":"Test2", "mail":"test125@test.fr", "password":"1234"},
      {"nom": "Test3", "prenom":"Test3", "mail":"test126@test.fr", "password":"1234"},
      {"nom": "Test4", "prenom":"Test4", "mail":"test127@test.fr", "password":"1234"},
      {"nom": "Test5", "prenom":"Test5", "mail":"test128@test.fr", "password":"1234"},
    ]
    //Ajout utilisateur API
    it('addUser API', ()=>{
      //url de l'API
      const url = "https://testing.adrardev.fr/api/addTest"
      //nom du test
      const name = "addUserAPI"
      //date du test
      let date = new Date()
      //formatage de la date du test au format 0000-00-00 (année, numéro du mois, numéro du jour)
      date = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
      let valid = true;
      cy.visit('https://testing.adrardev.fr/addUser')
      //boucle pour itérer 5 utilisateurs
      for(let i=0; i<tabUser.length; i++){
        //récupération et saisie dans les inputs
        cy.get(':input[name="nom"]').type(tabUser[i].nom)
        cy.get(':input[name="prenom"]').type(tabUser[i].prenom)
        cy.get(':input[name="mail"]').type(tabUser[i].mail)
        cy.get(':input[name="mdp"]').type(tabUser[i].password)
        //clic sur le bouton submit
        cy.get(':input[name="submit"]').click()
        cy.get('#msgzone').invoke("text").then(text=>{
          //test du message enregistrement ok
          if(text=="Le compte a été ajouté en BDD"){
            valid = true;
          }
          //test du message autre erreur
          else{
            valid = false;
          }
          const json = JSON.stringify({name:name, valid:valid, date:date})
          //Requête API 
          cy.request({
            method: 'POST',
            url: url, 
            body: json,
          })
        })
      }
    })
  
    //Connexion utilisateur API
    it('connexionUser API', ()=>{
      //paramétrage api
      //url de l'API
      const url = "https://testing.adrardev.fr/api/addTest"
      //nom du test
      const name = "Connexion"
      //date du test
      let date = new Date()
      //formatage de la date du test au format 0000-00-00 (année, numéro du mois, numéro du jour)
      date = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
      let valid = true;
      cy.visit('https://testing.adrardev.fr/connexion')
      //boucle pour itérer 5 utilisateurs
      for(let i=0; i<tabUser.length; i++){
      cy.get(':input[name="mail"]').type(tabUser[i].mail)
      cy.get(':input[name="mdp"]').type(tabUser[i].password)
      cy.get(':input[name="submit"]').click()
      cy.get('#msgzone').invoke("text").then(text=>{
        //test du message enregistrement ok
        if(text=="Connecté"){
          valid = true;
        }
        //test du message autre erreur
        else{
          valid = false;
        }
        const json = JSON.stringify({name:name, valid:valid, date:date})
        //Requête API 
        cy.request({
          method: 'POST',
          url: url, 
          body: json,
        })
      })
    }
    })
  })
  