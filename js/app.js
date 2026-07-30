// js/app.js
import apiManager from './services/api-manager.js';
import aiOrchestrator from './ai-engine/ai-orchestrator.js';

document.addEventListener('DOMContentLoaded', async () => {
    console.log("🚀 Initialisation de Football-IA-pro...");

    // 1. Charger les matchs du jour
    const matches = await apiManager.getTodayMatches();
    const container = document.getElementById('matches-container'); // Assurez-vous d'avoir cet ID dans votre index.html

    if (!container) {
        console.warn("⚠️ Élément HTML '#matches-container' introuvable.");
        return;
    }

    if (matches.length === 0) {
        container.innerHTML = "<p>Aucun match disponible aujourd'hui ou limite d'API atteinte.</p>";
        return;
    }

    // 2. Afficher chaque match
    container.innerHTML = '';
    matches.slice(0, 10).forEach(match => { // On affiche les 10 premiers matchs
        const home = match.teams.home.name;
        const away = match.teams.away.name;
        const league = match.league.name;
        const time = new Date(match.fixture.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const matchCard = document.createElement('div');
        matchCard.className = 'match-card';
        matchCard.innerHTML = `
            <div class="match-header">${league} - ${time}</div>
            <div class="match-body">
                <span><strong>${home}</strong> vs <strong>${away}</strong></span>
                <button onclick="analyzeMatch(${match.fixture.id}, ${match.teams.home.id}, ${match.teams.away.id})" class="btn-predict">
                    🤖 Analyser par l'IA
                </button>
            </div>
            <div id="prediction-${match.fixture.id}" class="prediction-result"></div>
        `;
        container.appendChild(matchCard);
    });
});

// Fonction globale pour lancer l'analyse IA au clic sur un match
window.analyzeMatch = async (fixtureId, homeId, awayId) => {
    const resultDiv = document.getElementById(`prediction-${fixtureId}`);
    resultDiv.innerHTML = "⏳ Analyse des données en cours...";

    try {
        const prediction = await aiOrchestrator.analyzeMatch(fixtureId, homeId, awayId);
        resultDiv.innerHTML = `
            <hr>
            <p><strong>🎯 Pronostic IA :</strong> ${prediction.recommendedBet}</p>
            <p><strong>📊 xG estimé :</strong> ${prediction.expectedGoals.lambdaHome.toFixed(2)} - ${prediction.expectedGoals.lambdaAway.toFixed(2)}</p>
        `;
    } catch (err) {
        console.error("Erreur d'analyse :", err);
        resultDiv.innerHTML = "❌ Erreur lors du calcul du pronostic.";
    }
};
