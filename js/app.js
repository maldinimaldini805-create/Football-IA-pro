// js/app.js
import aiOrchestrator from './ai-engine/ai-orchestrator.js';

document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('matches-container');
    const totalMatchesElem = document.getElementById('total-matches');

    if (!container) return;

    // Matchs de démonstration
    const mockMatches = [
        { fixture: { id: 101, date: new Date().toISOString() }, league: { name: "Premier League" }, teams: { home: { id: 42, name: "Arsenal" }, away: { id: 49, name: "Chelsea" } } },
        { fixture: { id: 102, date: new Date().toISOString() }, league: { name: "La Liga" }, teams: { home: { id: 529, name: "FC Barcelone" }, away: { id: 541, name: "Real Madrid" } } },
        { fixture: { id: 103, date: new Date().toISOString() }, league: { name: "Ligue 1" }, teams: { home: { id: 85, name: "PSG" }, away: { id: 91, name: "Marseille" } } }
    ];

    if (totalMatchesElem) totalMatchesElem.textContent = `${mockMatches.length} Matchs au programme`;

    container.innerHTML = '';
    mockMatches.forEach(match => {
        const home = match.teams.home.name;
        const away = match.teams.away.name;
        const league = match.league.name;
        const time = new Date(match.fixture.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const matchCard = document.createElement('div');
        matchCard.className = 'match-card';
        matchCard.style.cssText = "background: #1e293b; border-radius: 12px; padding: 15px; margin-bottom: 20px; border: 1px solid #334155; color: white;";
        
        matchCard.innerHTML = `
            <div style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 8px;">🏆 ${league} — ${time}</div>
            <div style="font-size: 1.2rem; font-weight: bold; text-align: center; margin-bottom: 12px;">
                ${home} <span style="color:#38bdf8;">vs</span> ${away}
            </div>
            <button onclick="analyzeMatch(${match.fixture.id}, ${match.teams.home.id}, ${match.teams.away.id})" 
                    style="width: 100%; padding: 10px; background: #2563eb; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">
                🤖 Calculer les 9 Prédictions IA
            </button>
            <div id="prediction-${match.fixture.id}" style="margin-top: 12px;"></div>
        `;
        container.appendChild(matchCard);
    });
});

window.analyzeMatch = async (fixtureId, homeId, awayId) => {
    const resultDiv = document.getElementById(`prediction-${fixtureId}`);
    resultDiv.innerHTML = `<div style="text-align: center; color: #38bdf8;">⏳ Analyse des algorithmes en cours...</div>`;

    const analysis = await aiOrchestrator.analyzeMatch(fixtureId, homeId, awayId);

    setTimeout(() => {
        resultDiv.innerHTML = `
            <div style="background: #0f172a; padding: 12px; border-radius: 10px; border-left: 4px solid #10b981;">
                
                <!-- 1. Résultat & Probabilités -->
                <div style="margin-bottom: 10px; border-bottom: 1px solid #334155; padding-bottom: 8px;">
                    <p style="margin: 3px 0; color: #10b981; font-weight: bold;">🎯 Pronostic : ${analysis.mainBet}</p>
                    <p style="margin: 3px 0; font-size: 0.85rem; color: #cbd5e1;">📊 Probabilités : Domicile ${analysis.probabilities.home}% | Nul ${analysis.probabilities.draw}% | Extérieur ${analysis.probabilities.away}%</p>
                </div>

                <!-- 2. Buts & xG -->
                <div style="margin-bottom: 10px; border-bottom: 1px solid #334155; padding-bottom: 8px;">
                    <p style="margin: 3px 0;">⚽ <strong>xG Estimé :</strong> ${analysis.goals.homeXG} - ${analysis.goals.awayXG} (Total: ${analysis.goals.totalExp})</p>
                    <p style="margin: 3px 0;">🔥 <strong>Plus de 2.5 Buts :</strong> ${analysis.goals.over25Prob}% de chance</p>
                    <p style="margin: 3px 0;">🤝 <strong>Les 2 équipes marquent :</strong> ${analysis.goals.bttsProb}%</p>
                </div>

                <!-- 3. Statistiques Détaillées -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.85rem;">
                    <div>🚩 <strong>Corners :</strong> ${analysis.stats.corners}</div>
                    <div>🟨 <strong>Cartons :</strong> ${analysis.stats.yellowCards}</div>
                    <div>⚠️ <strong>Fautes :</strong> ${analysis.stats.fouls}</div>
                    <div>🤾 <strong>Touches :</strong> ${analysis.stats.throwIns}</div>
                    <div>👟 <strong>Tirs :</strong> ${analysis.stats.shots}</div>
                    <div>🧤 <strong>Dégagements :</strong> ${analysis.stats.goalKicks}</div>
                </div>

                <!-- 4. Premier Evénement -->
                <div style="margin-top: 10px; background: #1e293b; padding: 6px; border-radius: 6px; font-size: 0.8rem; text-align: center; color: #f59e0b;">
                    ⚡ <strong>Premier Événement estimé :</strong> ${analysis.stats.firstEvent}
                </div>

            </div>
        `;
    }, 600);
};
