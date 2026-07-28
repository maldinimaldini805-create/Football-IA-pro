// =====================================
// FOOTBALL AI PRO 3.2
// DASHBOARD
// =====================================

import Live from "./live.js";

class Dashboard {

    async afficher() {

        try {

            const analyses =
                await Live.actualiser();

            if (!analyses || analyses.length === 0) {

                console.log("Aucun match disponible.");

                return;

            }

            const resultat =
                analyses[0].data;

            document.getElementById("matchTitle").textContent =
                `${resultat.match.homeTeam} VS ${resultat.match.awayTeam}`;

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

            const confidenceBar =
                document.getElementById("confidenceBar");

            if (confidenceBar) {

                confidenceBar.style.width =
                    resultat.prediction.confiance + "%";

                confidenceBar.textContent =
                    resultat.prediction.confiance + "%";

            }

            const container =
                document.getElementById("matchesContainer");

            if (!container) return;

            container.innerHTML = "";

            analyses.forEach(match => {

                const card =
                    document.createElement("div");

                card.className = "match-card";

                card.innerHTML = `

                    <h3>${match.data.match.homeTeam} VS ${match.data.match.awayTeam}</h3>

                    <p><strong>🎯 Score :</strong> ${match.data.prediction.scoreExact}</p>

                    <p><strong>📊 Confiance :</strong> ${match.data.prediction.confiance}%</p>

                    <p><strong>🚩 Corners :</strong> ${match.data.prediction.corners}</p>

                    <p><strong>🟨 Cartons :</strong> ${match.data.prediction.cartons}</p>

                    <p><strong>❌ Fautes :</strong> ${match.data.prediction.fautes}</p>

                `;

                container.appendChild(card);

            });

        }

        catch (error) {

            console.error("Dashboard :", error);

        }

    }

}

const dashboard = new Dashboard();

dashboard.afficher();

export default dashboard;
