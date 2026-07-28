// =====================================
// FOOTBALL AI PRO 4.0
// DASHBOARD
// =====================================

import footballAIService from "./services/football-ai-service.js";

class Dashboard {

    async load() {

        const container =
            document.getElementById("matches");

        if (!container) {

            console.error("Conteneur introuvable.");

            return;

        }

        container.innerHTML =
            "<p>⏳ Analyse des matchs...</p>";

        try {

            const analyses =
                await footballAIService.analyzeTodayMatches();

            if (analyses.length === 0) {

                container.innerHTML =
                    "<p>Aucun match aujourd'hui.</p>";

                return;

            }

            container.innerHTML = "";

            analyses.forEach(match => {

                const card =
                    document.createElement("div");

                card.className = "match-card";

                card.innerHTML = `

                    <h2>
                        ${match.match.homeTeam}
                        vs
                        ${match.match.awayTeam}
                    </h2>

                    <p><strong>🏆 Ligue :</strong> ${match.league}</p>

                    <p><strong>⚽ Score prévu :</strong> ${match.prediction.scoreExact}</p>

                    <p><strong>🥇 Vainqueur :</strong> ${match.prediction.winner}</p>

                    <p><strong>📊 Confiance :</strong> ${match.prediction.confiance}%</p>

                    <p><strong>🚩 Corners :</strong> ${match.prediction.corners}</p>

                    <p><strong>🟨 Cartons :</strong> ${match.prediction.cartons}</p>

                    <p><strong>❌ Fautes :</strong> ${match.prediction.fautes}</p>

                `;

                container.appendChild(card);

            });

        }

        catch (error) {

            console.error(error);

            container.innerHTML =
                "<p>❌ Erreur lors du chargement.</p>";

        }

    }

}

const dashboard = new Dashboard();

dashboard.load();

export default dashboard;
