// =====================================
// FOOTBALL AI PRO 3.1
// DASHBOARD UI
// =====================================

import Dashboard from "./dashboard.js";

class DashboardUI {

    async render() {

        const analyses = await Dashboard.afficher();

        const container = document.getElementById("matches");

        if (!container) return;

        container.innerHTML = "";

        analyses.forEach(resultat => {

            const card = document.createElement("div");

            card.className = "match-card";

            card.innerHTML = `

                <h2>
                    ${resultat.data.match.homeTeam}
                    vs
                    ${resultat.data.match.awayTeam}
                </h2>

                <p><strong>Score exact :</strong> ${resultat.data.prediction.scoreExact}</p>

                <p><strong>Confiance :</strong> ${resultat.data.prediction.confiance}%</p>

                <p><strong>Premier tir cadré :</strong> ${resultat.data.prediction.events.premierTirCadre}</p>

                <p><strong>Première touche :</strong> ${resultat.data.prediction.events.premiereTouche}</p>

                <p><strong>Premier corner :</strong> ${resultat.data.prediction.events.premierCorner}</p>

                <p><strong>Premier carton :</strong> ${resultat.data.prediction.events.premierCarton}</p>

                <p><strong>Première faute :</strong> ${resultat.data.prediction.events.premiereFaute}</p>

            `;

            container.appendChild(card);

        });

    }

}

const dashboardUI = new DashboardUI();

dashboardUI.render();

export default dashboardUI;
