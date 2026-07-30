// js/app.js
import aiOrchestrator from './ai-engine/ai-orchestrator.js';

document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('matches-container');
    const totalMatchesElem = document.getElementById('total-matches');

    if (!container) return;

    // Matchs d'exemples incluant des matchs En Direct (Live)
    const mockMatches = [
        { fixture: { id: 201, status: "LIVE", elapsed: 34 }, league: { name: "UEFA Champions League" }, teams: { home: { id: 1, name: "Real Madrid" }, away: { id: 2, name: "Man City" } }, score: { home: 1, away: 0 } },
        { fixture: { id: 202, status: "NS", elapsed: 0 }, league: { name: "Premier League" }, teams: { home: { id: 3, name: "Arsenal" }, away: { id: 4, name: "Liverpool" } }, score: { home: 0, away: 0 } },
        { fixture: { id: 203, status: "NS", elapsed: 0 }, league: { name: "Ligue 1" }, teams: { home: { id: 5, name: "PSG" }, away: { id: 6, name: "Marseille" } }, score: { home: 0, away: 0 } }
    ];

    if (totalMatchesElem) totalMatchesElem.textContent = `${mockMatches.length} Matchs (dont 1 LIVE)`;

    container.innerHTML = '';
    mockMatches.forEach(match => {
        const home = match.teams.home.name;
        const away = match.teams.away.name;
        const league = match.league.name;
        const isLive = match.fixture.status === "LIVE";
        const statusBadge = isLive ? `<span style="background: #ef4444; padding: 2px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: bold; color: white;">🔴 LIVE ${match.fixture.elapsed}' [${match.score.home}-${match.score.away}]</span>` : `<span style="color: #94a3b8;">📅 A venir</span>`;

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
});

window.runAdvancedAnalysis = async (fixtureId, home, away, isLive, elapsed, scoreHome, scoreAway) => {
    const resultDiv = document.getElementById(`prediction-${fixtureId}`);
    resultDiv.innerHTML = `<div style="text-align: center; color: #38bdf8; padding: 10px;">⚡ Moteur IA : Recalcul des matrices en cours...</div>`;

    const data = await aiOrchestrator.analyzeMatch(fixtureId, home, away, isLive, elapsed, { home: scoreHome, away: scoreAway });

    setTimeout(() => {
        resultDiv.innerHTML = `
            <div style="background: #0f172a; padding: 14px; border-radius: 10px; border-left: 4px solid #38bdf8; font-size: 0.88rem;">
                
                <!-- 📊 Mode Live / Stats xG -->
                <div style="background: #1e293b; padding: 8px; border-radius: 6px; margin-bottom: 10px; text-align: center;">
                    <span style="color: #38bdf8; font-weight: bold;">⚽ xG Total Estimé :</span> ${data.xg.home} - ${data.xg.away}
                </div>

                <!-- 🎯 Scores Exacts Probables -->
                <div style="margin-bottom: 10px;">
                    <p style="margin: 2px 0; font-weight: bold; color: #f59e0b;">🎯 Scores Exacts les plus probables :</p>
                    <div style="display: flex; gap: 8px; margin-top: 4px;">
                        ${data.exactScores.map(s => `<span style="background: #334155; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">${s.score} (${s.prob})</span>`).join('')}
                    </div>
                </div>

                <!-- ⏱️ Analyses Mi-Temps & HT/FT -->
                <div style="margin-bottom: 10px; border-top: 1px solid #334155; padding-top: 8px;">
                    <p style="margin: 2px 0;">⚽ <strong>Buts 1ère MT :</strong> ~${data.halftime.goals1st} | <strong>2nde MT :</strong> ~${data.halftime.goals2nd}</p>
                    <p style="margin: 2px 0;">📊 <strong>Score Estimé 1ère MT :</strong> ${data.halftime.score1st}</p>
                    <p style="margin: 2px 0;">🔄 <strong>Mi-Temps / Fin (HT/FT) :</strong> ${data.halftime.htFt}</p>
                </div>

                <!-- ⚡ Événements Précis & Buteurs -->
                <div style="margin-bottom: 10px; border-top: 1px solid #334155; padding-top: 8px; display: grid; grid-template-columns: 1fr; gap: 4px;">
                    <p style="margin: 2px 0;">⏰ <strong>Moment 1er but :</strong> ${data.events.firstGoalTime}</p>
                    <p style="margin: 2px 0;">🚩 <strong>Équipe 1er buteur :</strong> ${data.events.firstGoalTeam}</p>
                    <p style="margin: 2px 0;">🏁 <strong>Équipe dernier buteur :</strong> ${data.events.lastGoalTeam}</p>
                    ${isLive ? `<p style="margin: 2px 0; color: #ef4444;">🔥 <strong>Prochain But estimé par :</strong> ${data.events.nextGoalTeam}</p>` : ''}
                    <p style="margin: 2px 0;">🏆 <strong>Qualification :</strong> ${data.events.qualification}</p>
                    <p style="margin: 2px 0;">⚡ <strong>Gagne au moins une MT :</strong> ${home} (${data.events.winAnyHalf.home})</p>
                </div>

                <!-- 🧠 Auto-apprentissage & Recalibration bi-hebdomadaire -->
                <div style="margin-top: 10px; background: #0284c722; border: 1px solid #0284c7; padding: 6px; border-radius: 6px; font-size: 0.75rem; color: #38bdf8;">
                    🤖 <strong>Module ML Auto-Apprenant :</strong> Pondération à domicile (${data.mlStatus.homeAdvantageWeight}). Prochaine mise à jour auto des algorithmes planifiée.
                </div>

            </div>
        `;
    }, 500);
};
