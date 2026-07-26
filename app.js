document.addEventListener("DOMContentLoaded", chargerMatchs);

async function chargerMatchs() {
    const zoneAnalyse = document.getElementById("analyse");

    zoneAnalyse.innerHTML = "⏳ Chargement des matchs...";

    try {
        const reponse = await fetch("https://football-api.maldinimaldini805-4cd.workers.dev/matches");

        if (!reponse.ok) {
            throw new Error("Impossible de récupérer les matchs.");
        }

        const donnees = await reponse.json();

        if (!donnees || !donnees.response || donnees.response.length === 0) {
            zoneAnalyse.innerHTML = "⚠️ Aucun match disponible.";
            return;
        }

        let html = "";

        donnees.response.forEach(match => {
            html += `
                <div style="padding:10px;border-bottom:1px solid #333;">
                    ⚽ <strong>${match.teams.home.name}</strong>
                    vs
                    <strong>${match.teams.away.name}</strong><br>
                    🏆 ${match.league.name}
                </div>
            `;
        });

        zoneAnalyse.innerHTML = html;

    } catch (erreur) {
        console.error(erreur);
        zoneAnalyse.innerHTML = "❌ Erreur de connexion au serveur.";
    }
}
 
