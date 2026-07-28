// =====================================
// FOOTBALL AI PRO 3.1
// DASHBOARD
// =====================================

import Live from "./live.js";

class Dashboard {

    async afficher() {

        try {

            const analyses = await Live.actualiser();

            const container =
                document.getElementById("matchesContainer");

            if (container) {

                container.innerHTML = "";

            }

            analyses.forEach(resultat => {

                const match =
                    resultat.data.match;

                const prediction =
                    resultat.data.prediction;

                // ==========================
                // MISE À JOUR DU TABLEAU PRINCIPAL
                // ==========================

                const titre =
                    document.getElementById("matchTitle");

                if (titre) {

                    titre.textContent =
                        match.homeTeam +
                        " VS " +
                        match.awayTeam;

                }

                const score =
                    document.getElementById("scorePrediction");

                if (score) {

                    score.textContent =
                        prediction.scoreExact;

                }

                const miTemps =
                    document.getElementById("halfTimePrediction");

                if (miTemps && prediction.scoreMiTemps) {

                    miTemps.textContent =
                        prediction.scoreMiTemps;

                }

                const corners =
                    document.getElementById("cornerPrediction");

                if (corners && prediction.corners) {

                    corners.textContent =
                        prediction.corners;

                }

                const cartons =
                    document.getElementById("cardsPrediction");

                if (cartons && prediction.cartons) {

                    cartons.textContent =
                        prediction.cartons;

                }

                const fautes =
                    document.getElementById("foulsPrediction");

                if (fautes && prediction.fautes) {

                    fautes.textContent =
                        prediction.fautes;

                }

                const btts =
                    document.getElementById("bttsPrediction");

                if (btts && prediction.btts) {

                    btts.textContent =
                        prediction.btts;

                }

                const barre =
                    document.querySelector(".progress-value");

                if (barre) {

                    barre.style.width =
                        prediction.confiance + "%";

                    barre.textContent =
                        prediction.confiance + "%";

                }

                // ==========================
                // CARTE DU MATCH
                // ==========================

                if (container) {

                    const carte =
                        document.createElement("div");

                    carte.className =
                        "match-card";

                    carte.innerHTML = `

                        <h3>${match.homeTeam} VS ${match.awayTeam}</h3>

                        <p>🎯 Score : ${prediction.scoreExact}</p>

                        <p>📊 Confiance : ${prediction.confiance}%</p>

                        <p>🚩 Premier corner : ${prediction.events.premierCorner}</p>

                        <p>🟨 Premier carton : ${prediction.events.premierCarton}</p>

                        <p>❌ Première faute : ${prediction.events.premiereFaute}</p>

                    `;

                    container.appendChild(carte);

                }

                // ==========================
                // CONSOLE (DEBUG)
                // ==========================

                console.log("=================================");
                console.log(match.homeTeam + " VS " + match.awayTeam);
                console.log("Score :", prediction.scoreExact);
                console.log("Confiance :", prediction.confiance + "%");
                console.log("=================================");

            });

        }

        catch (erreur) {

            console.error(
                "Erreur Dashboard :",
                erreur
            );

        }

    }

}

const dashboard = new Dashboard();

dashboard.afficher();

export default dashboard;
