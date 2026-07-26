const API_URL = "https://football-api.maldinimaldini805-4cd.workers.dev/";
const fs = require('fs');
const path = require('path');

async function recupererMatchs() {
    try {
        const reponse = await fetch(API_URL);

        if (!reponse.ok) {
            throw new Error("Impossible de récupérer les données.");
        }

        const donnees = await reponse.json();

        console.log("Données reçues :", donnees);

        // Enregistrer les données dans un fichier
        sauvegarderDonnees(donnees);

        return donnees;

    } catch (erreur) {
        console.error(erreur);
        alert("Erreur de connexion avec Football AI Pro.");
    }
}

// Fonction pour sauvegarder les données dans un fichier
function sauvegarderDonnees(donnees) {
    try {
        const cheminFichier = path.join(__dirname, 'donnees_matchs.json');
        const contenuJSON = JSON.stringify(donnees, null, 2);
        
        fs.writeFileSync(cheminFichier, contenuJSON, 'utf8');
        console.log("Données sauvegardées avec succès dans donnees_matchs.json");
    } catch (erreur) {
        console.error("Erreur lors de la sauvegarde des données :", erreur);
    }
}

module.exports = { recupererMatchs };
