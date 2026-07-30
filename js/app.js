// js/app.js
import aiOrchestrator from './ai-engine/ai-orchestrator.js';

document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('matches-container');
    const totalMatchesElem = document.getElementById('total-matches');
    const searchInput = document.getElementById('search-input');

    if (!container) return;

    // Base de données augmentée (Forme, Confiance, Momentum Live)
    const mockMatches = [
        { 
            fixture: { id: 201, status: "LIVE", elapsed: 34 }, 
            league: { name: "UEFA Champions League" }, 
            teams: { 
                home: { id: 1, name: "Real Madrid", form: ["W", "W", "D", "W", "W"] }, 
                away: { id: 2, name: "Man City", form: ["W", "L", "W", "W", "D"] } 
            }, 
            score: { home: 1, away: 0 },
            confidence: 88,
            liveMomentum: { home: 75, away: 25, alert: "🔥 BUT IMMINENT (Real Madrid)" }
        },
        { 
            fixture: { id: 202, status: "NS", elapsed: 0 }, 
            league: { name: "Premier League" }, 
            teams: { 
                home: { id: 3, name: "Arsenal", form: ["W", "W", "W", "D", "L"] }, 
                away: { id: 4, name: "Liverpool", form: ["D", "W", "W", "W", "W"] } 
            }, 
            score: { home: 0, away: 0 },
            confidence: 79,
            liveMomentum: null
        },
        { 
            fixture: { id: 203, status: "NS", elapsed: 0 }, 
            league: { name: "Ligue 1" }, 
            teams: { 
                home: { id: 5, name: "PSG", form: ["W", "W", "W", "W", "D"] }, 
                away: { id: 6, name: "Marseille", form: ["L", "D", "W", "L", "W"] } 
            }, 
            score: { home: 0, away: 0 },
            confidence: 86,
            liveMomentum: null
        }
    ];

    // Générateur de badges pour la forme des 5 derniers matchs
    function renderFormBadges(formArray) {
        return formArray.map(res => {
            if (res === 'W') return `<span style="background:#10b981; color:white; padding:1px 5px; border-radius:3px; font-size:0.65rem; font-weight:bold;">V</span>`;
            if (res === 'D') return `<span style="background:#f59e0b; color:white; padding:1px 5px; border-radius:3px; font-size:0.65rem; font-weight:bold;">N</span>`;
            return `<span style="background:#ef4444; color:white; padding:1px 5px; border-radius:3px; font-size:0.65rem; font-weight:bold;">D</span>`;
        }).join(' ');
    }

    // Rendu dynamique avec filtres et badges
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
            container.innerHTML = `<div style="text-align: center; color: #94a3b8; padding: 30px 10px;">🔍 Aucun match trouvé pour "${filterText}".</div>`;
            return;
        }

        filtered.forEach(match => {
            const home = match.teams.home.name;
            const away = match.teams.away.name;
            const league = match.league.name;
            const isLive = match.fixture.status === "LIVE";
            const isPepite = match.confidence >= 85;

            const statusBadge = isLive 
                ? `<span style="background: #ef4444; padding: 2px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: bold; color: white;">🔴 LIVE ${match.fixture.elapsed}' [${match.score.home}-${match.score.away}]</span>` 
                : `<span style="color: #94a3b8;">📅 À venir</span>`;

            const pepiteBadge = isPepite 
                ? `<div style="background: linear-gradient(135deg, #f59e0b, #dc2626); color: white; padding: 3px 10px; border-radius: 20px; font-size: 0.7rem; font-weight: bold; display: inline-block; margin-bottom: 8px; box-shadow: 0 0 10px rgba(245, 158, 11, 0.4);">🔥 PÉPITE IA (${match.confidence}% Confiance)</div>`
                : '';

            // Section Radar de Pression Live si disponible
            let momentumHtml = '';
            if (isLive && match.liveMomentum) {
                momentumHtml = `
                    <div style="background: #0f172a; padding: 10px; border-radius: 8px; margin: 10px 0; border: 1px solid #ef4444;">
                        <div style="display: flex; justify-content: space-between; font-size: 0.75rem; margin-bottom: 4px;">
                            <span>⚡ Radar Pression Live</span>
                            <span style="color: #ef4444; font-weight: bold;">${match.liveMomentum.alert}</span>
                        </div>
                        <div style="background: #334155; height: 8px; border-radius: 4px; overflow: hidden; display: flex;">
                            <div style="width: ${match.liveMomentum.home}%; background: #38bdf8;"></div>
                            <div style="width: ${match.liveMomentum.away}%; background: #ef4444;"></div>
                        </div>
                    </div>
                `;
            }

            const matchCard = document.createElement('div');
            matchCard.style.cssText = "background: #1e293b; border-radius: 12px; padding: 15px; margin-bottom: 20px; border: 1px solid #334155; color: white;";
            
            matchCard.innerHTML = `
                ${pepiteBadge}
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <span style="font-size: 0.85rem; color: #94a3b8;">🏆 ${league}</span>
                    ${statusBadge}
                </div>
                
                <div style="font-size: 1.1rem; font-weight: bold; text-align: center; margin: 8px 0 4px 0;">
                    ${home} <span style="color:#38bdf8;">vs</span> ${away}
                </div>

                <!-- ⚔️ Forme récente 5 matchs -->
                <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #94a3b8; margin-bottom: 10px; background: #0f172a; padding: 6px 10px; border-radius: 6px;">
                    <div>${home}: ${renderFormBadges(match.teams.home.form)}</div>
                    <div>${away}: ${renderFormBadges(match.teams.away.form)}</div>
                </div>

                ${momentumHtml}

                <button onclick="runAdvancedAnalysis(${match.fixture.id}, '${home}', '${away}', ${isLive}, ${match.fixture.elapsed}, ${match.score.home}, ${match.score.away})" 
                        style="width: 100%; padding: 12px; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">
                    🤖 Analyser Tout (Live, Score, MT, Apprentissage)
                </button>
                <div id="prediction-${match.fixture.id}" style="margin-top: 12px;"></div>
            `;
            container.appendChild(matchCard);
        });
    }

    if (searchInput) searchInput.addEventListener('input', (e) => renderMatches(e.target.value));
    renderMatches();
});

// 🎟️ GÉNÉRATEUR DE TICKETS
window.generateTicket = (type) => {
    const resultDiv = document.getElementById('ticket-result');
    resultDiv.innerHTML = `<div style="color: #38bdf8;">⚡ Calcul du combiné optimisé en cours...</div>`;

    setTimeout(() => {
        let title = "🛡️ Ticket Sécurisé";
        let totalOdds = "1.95";
        let matches = [
            { match: "Real Madrid vs Man City", pick: "Plus de 1.5 Buts", odds: "1.25" },
            { match: "PSG vs Marseille", pick: "Victoire PSG ou Nul", odds: "1.22" }
        ];

        if (type === 'balanced') {
            title = "⚖️ Ticket Équilibré";
            totalOdds = "3.85";
            matches = [
                { match: "Real Madrid vs Man City", pick: "Plus de 2.5 Buts", odds: "1.65" },
                { match: "PSG vs Marseille", pick: "PSG gagne & +1.5 buts", odds: "1.58" }
            ];
        } else if (type === 'risk') {
            title = "🚀 Ticket Jackpot";
            totalOdds = "8.90";
            matches = [
                { match: "Real Madrid vs Man City", pick: "Real gagne & +2.5 Buts", odds: "2.80" },
                { match: "Arsenal vs Liverpool", pick: "Score exact 2-1", odds: "8.50" }
            ];
        }

        let html = `<div style="text-align: left;"><h4 style="margin: 0 0 10px 0; color: #10b981;">${title} (Cote: ${totalOdds})</h4>`;
        let shareText = `⚽ *FOOTBALL IA PRO - ${title}*%0A*Cote: ${totalOdds}*%0A%0A`;

        matches.forEach(m => {
            html += `<div style="background: #1e293b; padding: 8px; border-radius: 6px; margin-bottom: 6px; font-size: 0.8rem;">
                        <strong>${m.match}</strong><br><span style="color: #38bdf8;">📌 ${m.pick}</span> (Cote: ${m.odds})
                     </div>`;
            shareText += `• ${m.match} ➔ ${m.pick} (${m.odds})%0A`;
        });

        html += `<a href="https://wa.me/?text=${shareText}" target="_blank" 
                    style="display: block; width: 100%; text-align: center; margin-top: 10px; padding: 10px; background: #25D366; color: white; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 0.85rem; box-sizing: border-box;">
                    📲 Partager sur WhatsApp
                 </a></div>`;

        resultDiv.innerHTML = html;
    }, 300);
};
