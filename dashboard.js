// =====================================
// FOOTBALL AI PRO 3.1
// DASHBOARD
// =====================================

import Live from "./live.js";

class Dashboard {

    async afficher() {

        const analyses = await Live.actualiser();

        analyses.forEach(resultat => {

            console.log("===================================");

            console.log(
                resultat.data.match.homeTeam +
                " VS " +
                resultat.data.match.awayTeam
            );

            console.log("-----------------------------------");

            console.log(
                "Score exact :",
                resultat.data.prediction.scoreExact
            );

            console.log(
                "Confiance :",
                resultat.data.prediction.confiance + "%"
            );

            console.log(
                "Premier tir cadré :",
                resultat.data.prediction.events.premierTirCadre
            );

            console.log(
                "Première touche :",
                resultat.data.prediction.events.premiereTouche
            );

            console.log(
                "Premier corner :",
                resultat.data.prediction.events.premierCorner
            );

            console.log(
                "Premier carton :",
                resultat.data.prediction.events.premierCarton
            );

            console.log(
                "Première faute :",
                resultat.data.prediction.events.premiereFaute
            );

            console.log("===================================");

        });

    }

}

const dashboard = new Dashboard();

dashboard.afficher();

export default dashboard;
