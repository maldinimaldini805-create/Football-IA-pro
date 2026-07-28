// =====================================
// FOOTBALL AI PRO 3.1
// DASHBOARD
// =====================================

import Live from "./live.js";

class Dashboard {

    async afficher() {

        const loading =
            document.getElementById("loadingMessage");

        const error =
            document.getElementById("errorContainer");

        try {

            const analyses =
                await Live.actualiser();

            if (loading) {

                loading.style.display = "none";

            }

            if (!analyses.length) {

                if (error) {

                    error.innerHTML =
                        "❌ Aucun match disponible.";

                }

                return;

            }

            const resultat =
                analyses[0].data;

            document.getElementById("matchTitle").textContent =
                resultat.match.homeTeam +
                " VS " +
                resultat.match.awayTeam;

            document.getElementById("scorePrediction").textContent =
                resultat.prediction.scoreExact;

            document.getElementById("halfTimePrediction").textContent =
                resultat.prediction.scoreMiTemps;

            document.getElementById("cornerPrediction").textContent =
                resultat.prediction.corners;

            document.getElementById("cardsPrediction").textContent =
                resultat.prediction.cartons;

            document.getElementById("foulsPrediction").textContent =
                resultat.prediction.fautes;

            document.getElementById("bttsPrediction").textContent =
                resultat.prediction.btts;

            const confiance =
                resultat.prediction.confiance;

            document.getElementById("confidenceBar").style.width =
                confiance + "%";

            document.getElementById("confidenceBar").textContent =
                confiance + "%";

            const container =
                document.getElementById("matchesContainer");

            container.innerHTML = "";

            analyses.forEach(match => {

                const card =
                    document.createElement("div");

                card.className =
                    "match-card";

                card.innerHTML = `

                    <h3>
                        ${match.data.match.homeTeam}
                        VS
                        ${match.data.match.awayTeam}
                    </h3>

                    <p><strong>🎯 Score :</strong>
                    ${match.data.prediction.scoreExact}</p>

                    <p><strong>📊 Confiance :</strong>
                    ${match.data.prediction.confiance}%</p>

                    <p><strong>🚩 Corners :</strong>
                    ${match.data.prediction.corners}</p>

                    <p><strong>🟨 Cartons :</strong>
                    ${match.data.prediction.cartons}</p>

                    <p><strong>❌ Fautes :</strong>
                    ${match.data.prediction.fautes}</p>

                `;

                container.appendChild(card);

            });

        }

        catch (e) {

            console.error(e);

            if (loading) {

                loading.style.display = "none";

            }

            if (error) {

                error.innerHTML =
                    "❌ Erreur lors du chargement des analyses.";

            }

        }

    }

}

const dashboard = new Dashboard();

dashboard.afficher();

export default dashboard;
