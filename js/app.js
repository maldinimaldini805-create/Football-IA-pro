// js/app.js
import aiOrchestrator from './ai-engine/ai-orchestrator.js';

document.addEventListener('DOMContentLoaded', async () => {
    console.log("🚀 Initialisation de Football-IA-pro...");

    const container = document.getElementById('matches-container');
    const totalMatchesElem = document.getElementById('total-matches');

    if (!container) return;

    // 💡 Matchs de démonstration pour tester le design et l'IA
    const mockMatches = [
        {
            fixture: { id: 101, date: new Date().toISOString() },
            league: { name: "Premier League" },
            teams: {
                home: { id: 42, name: "Arsenal" },
                away: { id: 49, name: "Chelsea" }
            }
        },
        {
            fixture: { id: 102, date: new Date().toISOString() },
            league: { name: "La Liga" },
            teams: {
                home: { id: 529, name: "FC Barcelone" },
                away: { id: 541, name: "Real Madrid" }
            }
        }
    ];

    if (totalMatchesElem) totalMatchesElem.textContent = `${mockMatches.length} Matchs (Mode Démo)`;

    container.innerHTML = '';
    mockMatches.forEach(match => {
        const home = match.teams.home.name;
        const away = match.teams.away.name;
        const league = match.league.name;
        const time = new Date(match.fixture.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const matchCard = document.createElement('div');
        matchCard.className = 'match-card';
        matchCard.innerHTML = `
            <div class="match-header">🏆 ${league} — ${time}</div>
            <div class="match-body" style="margin: 15px 0;">
                <p style="font-size: 1.1rem; text-align: center;">
                    <strong>${home}</strong> <span style="color:#38bdf8;">vs</span> <strong>${away}</strong>
                </p>
                <button onclick="analyzeMatch(${match.fixture.id}, ${match.teams.home.id}, ${match.teams.away.id})" class="btn-predict">
                    🤖 Analyser par l'IA
                </button>
            </div>
            <div id="prediction-${match.fixture.id}" class="prediction-result"></div>
        `;
        container.appendChild(matchCard);
    });
});

window.analyzeMatch = async (fixtureId, homeId, awayId) => {
    const resultDiv = document.getElementById(`prediction-${fixtureId}`);
    resultDiv.innerHTML = "⏳ Calcul des statistiques et xG...";

    setTimeout(() => {
        resultDiv.innerHTML = `
            <div style="background: #0f172a; padding: 12px; border-radius: 8px; margin-top: 10px; border-left: 4px solid #10b981;">
                <p style="margin: 4px 0; color: #10b981;"><strong>🎯 Pronostic IA :</strong> Victoire Domicile</p>
                <p style="margin: 4px 0;"><strong>⚽ xG Attendu :</strong> 1.85 - 0.92</p>
                <p style="margin: 4px 0;"><strong>📈 Probabilité :</strong> 58% - 24% - 18%</p>
            </div>
        `;
    }, 800);
};
