// js/app.js
import aiOrchestrator from './ai-engine/ai-orchestrator.js';

document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('matches-container');
    const totalMatchesElem = document.getElementById('total-matches');
    const searchInput = document.getElementById('search-input');

    if (!container) return;

    // Base de données des matchs
    const mockMatches = [
        { fixture: { id: 201, status: "LIVE", elapsed: 34 }, league: { name: "UEFA Champions League" }, teams: { home: { id: 1, name: "Real Madrid" }, away: { id: 2, name: "Man City" } }, score: { home: 1, away: 0 } },
        { fixture: { id: 202, status: "NS", elapsed: 0 }, league: { name: "Premier League" }, teams: { home: { id: 3, name: "Arsenal" }, away: { id: 4, name: "Liverpool" } }, score: { home: 0, away: 0 } },
        { fixture: { id: 203, status: "NS", elapsed: 0 }, league: { name: "Ligue 1" }, teams: { home: { id: 5, name: "PSG" }, away: { id: 6, name: "Marseille" } }, score: { home: 0, away: 0 } },
        { fixture: { id: 204, status: "NS", elapsed: 0 }, league: { name: "La Liga" }, teams: { home: { id: 7, name: "FC Barcelone" }, away: { id: 8, name: "Atletico Madrid" } }, score: { home: 0, away: 0 } }
    ];

    // Fonction de rendu dynamique avec filtre
    function renderMatches(filterText = "") {
        const query = filterText.toLowerCase().trim();
        const filtered = mockMatches.filter(m => 
            m.teams.home.name.toLowerCase().includes(query) ||
            m.teams.away.name.toLowerCase().includes(query) ||
            m.league.name.toLowerCase().includes(query)
        );

        if (totalMatchesElem) {
            const liveCount = filtered.filter(m => m.fixture.status === "LIVE").length;
            totalMatchesElem.textContent = `${filtered.length} Match(s) ${liveCount > 0 ? `(dont ${liveCount} LIVE)` : ''}`;
        }

        container.innerHTML = '';

        if (filtered.length === 0) {
            container.innerHTML = `<div style="text-align: center; color: #94a3b8; padding: 30px 10px;">🔍 Aucun match ne correspond à "${filterText}".</div>`;
            return;
        }

        filtered.forEach(match => {
            const home = match.teams.home.name;
            const away = match.teams.away.name;
            const league = match.league.name;
            const isLive = match.fixture.status === "LIVE";
            const statusBadge = isLive 
                ? `<span style="background: #ef4444; padding: 2px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: bold; color: white;">🔴 LIVE ${match.fixture.elapsed}' [${match.score.home}-${match.score.away}]</span>` 
                : `<span style="color: #94a3b8;">📅 À venir</span>`;

            const matchCard = document.createElement('div');
            matchCard.style.cssText = "background: #1e293b; border-radius: 12px; padding: 15px; margin-bottom: 20px; border: 1px solid #334155; color: white;";
            
            matchCard.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <span style="font-size: 0.85rem; color: #94a3b8;">🏆 ${league}</span>
                    ${statusBadge}
                </div>
                <div style="font-size: 1.2rem; font-weight: bold; text-align: center; margin: 10px 0;">
                    ${home} <span style="color:#38bdf8;">vs</span> ${away}
                </div>
                <button onclick="runAdvancedAnalysis(${match.fixture.id}, '${home}', '${away}', ${isLive}, ${match.fixture.elapsed}, ${match.score.home}, ${match.score.away})" 
                        style="width: 100%; padding: 12px; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3);">
                    🤖 Analyser Tout (Live, Score, MT, Apprentissage)
                </button>
                <div id="prediction-${match.fixture.id}" style="margin-top: 12px;"></div>
            `;
            container.appendChild(matchCard);
        });
    }

    // Écouteur de frappe dans le champ de recherche
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderMatches(e.target.value);
        });
    }

    // Affichage initial
    renderMatches();
});
