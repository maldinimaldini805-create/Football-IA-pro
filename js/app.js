// js/app.js (Version API Réelle)
import apiManager from './services/api-manager.js';
import aiOrchestrator from './ai-engine/ai-orchestrator.js';

document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('matches-container');
    const totalMatchesElem = document.getElementById('total-matches');

    if (!container) return;

    try {
        const matches = await apiManager.getTodayMatches();
        
        if (totalMatchesElem) {
            totalMatchesElem.textContent = `${matches.length} Matchs au programme`;
        }

        if (matches.length === 0) {
            container.innerHTML = `<p class="no-matches">Aucun match disponible aujourd'hui.</p>`;
            return;
        }

        container.innerHTML = '';
        matches.forEach(match => {
            const home = match.teams.home.name;
            const away = match.teams.away.name;
            const league = match.league.name;
            const time = new Date(match.fixture.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            const matchCard = document.createElement('div');
            matchCard.className = 'match-card';
            matchCard.innerHTML = `
                <div class="match-header">🏆 ${league} — ${time}</div>
                <div class="match-body">
                    <p><strong>${home}</strong> vs <strong>${away}</strong></p>
                    <button class="btn-predict" data-fixture="${match.fixture.id}" data-home="${match.teams.home.id}" data-away="${match.teams.away.id}">
                        🤖 Analyser par l'IA
                    </button>
                </div>
                <div id="prediction-${match.fixture.id}" class="prediction-result"></div>
            `;
            container.appendChild(matchCard);
        });

        // Gestion des clics d'analyse
        document.querySelectorAll('.btn-predict').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const { fixture, home, away } = e.target.dataset;
                const resultDiv = document.getElementById(`prediction-${fixture}`);
                resultDiv.innerHTML = "⏳ Analyse en cours...";

                const analysis = await aiOrchestrator.analyzeMatch(fixture, home, away);
                resultDiv.innerHTML = `
                    <div style="background: #0f172a; padding: 12px; border-radius: 8px; margin-top: 10px; border-left: 4px solid #10b981;">
                        <p><strong>🎯 Pronostic :</strong> ${analysis.recommendedBet}</p>
                        <p><strong>⚽ xG Attendu :</strong> ${analysis.expectedGoals.lambdaHome} - ${analysis.expectedGoals.lambdaAway}</p>
                    </div>
                `;
            });
        });

    } catch (error) {
        console.error("Erreur de chargement :", error);
        container.innerHTML = `<p class="error">Impossible de charger les matchs en direct.</p>`;
    }
});
