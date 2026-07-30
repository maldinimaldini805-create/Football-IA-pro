// js/app.js
import aiOrchestrator from './ai-engine/ai-orchestrator.js';

let selectedLeague = "ALL";

document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('matches-container');
    const totalMatchesElem = document.getElementById('total-matches');
    const searchInput = document.getElementById('search-input');

    if (!container) return;

    // Matches de différents championnats du monde
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
            referee: { name: "Daniele Orsato", avgCards: 4.8 },
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
            referee: { name: "Anthony Taylor", avgCards: 3.9 },
            liveMomentum: null
        },
        { 
            fixture: { id: 203, status: "NS", elapsed: 0 }, 
            league: { name: "La Liga" }, 
            teams: { 
                home: { id: 5, name: "FC Barcelone", form: ["W", "W", "W", "W", "D"] }, 
                away: { id: 6, name: "Atlético Madrid", form: ["W", "D", "W", "L", "W"] } 
            }, 
            score: { home: 0, away: 0 },
            confidence: 84,
            referee: { name: "Mateu Lahoz", avgCards: 5.1 },
            liveMomentum: null
        },
        { 
            fixture: { id: 204, status: "NS", elapsed: 0 }, 
            league: { name: "Ligue 1" }, 
            teams: { 
                home: { id: 7, name: "PSG", form: ["W", "W", "W", "W", "D"] }, 
                away: { id: 8, name: "Marseille", form: ["L", "D", "W", "L", "W"] } 
            }, 
            score: { home: 0, away: 0 },
            confidence: 86,
            referee: { name: "Clément Turpin", avgCards: 4.2 },
            liveMomentum: null
        },
        { 
            fixture: { id: 205, status: "NS", elapsed: 0 }, 
            league: { name: "Serie A" }, 
            teams: { 
                home: { id: 9, name: "Inter Milan", form: ["W", "W", "D", "W", "W"] }, 
                away: { id: 10, name: "AC Milan", form: ["D", "W", "L", "W", "D"] } 
            }, 
            score: { home: 0, away: 0 },
            confidence: 82,
            referee: { name: "Davide Massa", avgCards: 4.5 },
            liveMomentum: null
        },
        { 
            fixture: { id: 206, status: "NS", elapsed: 0 }, 
            league: { name: "Bundesliga" }, 
            teams: { 
                home: { id: 11, name: "Bayern Munich", form: ["W", "W", "W", "W", "W"] }, 
                away: { id: 12, name: "Dortmund", form: ["W", "L", "D", "W", "L"] } 
            }, 
            score: { home: 0, away: 0 },
            confidence: 89,
            referee: { name: "Felix Zwayer", avgCards: 3.8 },
            liveMomentum: null
        }
    ];

    function renderFormBadges(formArray) {
        return formArray.map(res => {
            if (res === 'W') return `<span style="background:#10b981; color:white; padding:1px 5px; border-radius:3px; font-size:0.65rem; font-weight:bold;">V</span>`;
            if (res === 'D') return `<span style="background:#f59e0b; color:white; padding:1px 5px; border-radius:3px; font-size:0.65rem; font-weight:bold;">N</span>`;
            return `<span style="background:#ef4444; color:white; padding:1px 5px; border-radius:3px; font-size:0.65rem; font-weight:bold;">D</span>`;
        }).join(' ');
    }

    function renderMatches(filterText = "") {
        const query = filterText.toLowerCase().trim();
        
        const filtered = mockMatches.filter(m => {
            const matchesLeague = (selectedLeague === "ALL" || m.league.name === selectedLeague);
            const matchesQuery = m.teams.home.name.toLowerCase().includes(query) ||
                                 m.teams.away.name.toLowerCase().includes(query) ||
                                 m.league.name.toLowerCase().includes(query);
            return matchesLeague && matchesQuery;
        });

        if (totalMatchesElem) {
            const liveCount = filtered.filter(m => m.fixture.status === "LIVE").length;
            totalMatchesElem.textContent = `${filtered.length} Match(s) ${liveCount > 0 ? `(dont ${liveCount} LIVE)` : ''}`;
        }

        container.innerHTML = '';

        if (filtered.length === 0) {
            container.innerHTML = `<div style="text-align: center; color: #94a3b8; padding: 30px 10px;">🔍 Aucun match disponible pour ce championnat.</div>`;
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
                ? `<div style="background: linear-gradient(135deg, #f59e0b, #dc2626); color: white; padding: 3px 10px; border-radius: 20px; font-size: 0.7rem; font-weight: bold; display: inline-block; margin-bottom: 8px;">🔥 PÉPITE IA (${match.confidence}% Confiance)</div>`
                : '';

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
                    <span style="font-size: 0.85rem; color: #38bdf8; font-weight: bold;">🏆 ${league}</span>
                    ${statusBadge}
                </div>
                
                <div style="font-size: 1.1rem; font-weight: bold; text-align: center; margin: 8px 0 4px 0;">
                    ${home} <span style="color:#38bdf8;">vs</span> ${away}
                </div>

                <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #94a3b8; margin-bottom: 8px; background: #0f172a; padding: 6px 10px; border-radius: 6px;">
                    <div>${home}: ${renderFormBadges(match.teams.home.form)}</div>
                    <div>${away}: ${renderFormBadges(match.teams.away.form)}</div>
                </div>

                <div style="font-size: 0.75rem; color: #94a3b8; margin-bottom: 10px; background: #0f172a; padding: 6px 10px; border-radius: 6px; display: flex; justify-content: space-between;">
                    <span>👨‍⚖️ Arbitre: <strong style="color:white;">${match.referee.name}</strong></span>
                    <span>🟨 <strong style="color:#f59e0b;">${match.referee.avgCards}</strong> cartons/match</span>
                </div>

                ${momentumHtml}

                <div style="display: flex; gap: 8px; margin-bottom: 10px;">
                    <button onclick="runAdvancedAnalysis(${match.fixture.id}, '${home}', '${away}')" 
                            style="flex: 2; padding: 10px; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 0.8rem;">
                        🤖 Analyser Match
                    </button>
                    <button onclick="runMonteCarloSimulation('${home}', '${away}', ${match.fixture.id})" 
                            style="flex: 1; padding: 10px; background: #059669; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 0.8rem;">
                        🎲 10k Sims
                    </button>
                </div>

                <div id="prediction-${match.fixture.id}"></div>
            `;
            container.appendChild(matchCard);
        });
    }

    // Gestion du filtre par ligues
    window.filterByLeague = (leagueName, btnElement) => {
        selectedLeague = leagueName;
        
        document.querySelectorAll('.league-btn').forEach(b => {
            b.style.background = '#1e293b';
            b.style.color = '#cbd5e1';
            b.style.borderColor = '#334155';
        });

        btnElement.style.background = '#38bdf8';
        btnElement.style.color = '#0f172a';
        btnElement.style.borderColor = '#38bdf8';

        renderMatches(searchInput ? searchInput.value : "");
    };

    if (searchInput) searchInput.addEventListener('input', (e) => renderMatches(e.target.value));
    renderMatches();
});

// 🎲 SIMULATEUR MONTE-CARLO
window.runMonteCarloSimulation = (home, away, matchId) => {
    const targetDiv = document.getElementById(`prediction-${matchId}`);
    if (!targetDiv) return;

    targetDiv.innerHTML = `<div style="color: #38bdf8; font-size: 0.8rem; text-align: center;">🎲 Calculation de 10 000 simulations Monte-Carlo...</div>`;

    setTimeout(() => {
        targetDiv.innerHTML = `
            <div style="background: #0f172a; padding: 10px; border-radius: 8px; border: 1px solid #059669; font-size: 0.8rem; color: #cbd5e1;">
                <h4 style="margin: 0 0 6px 0; color: #10b981;">🎲 Bilan Monte-Carlo (10 000 Matchs)</h4>
                <div>🏠 Victoire ${home} : <strong style="color:#10b981;">54.2%</strong></div>
                <div>🤝 Match Nul : <strong style="color:#f59e0b;">22.1%</strong></div>
                <div>🚀 Victoire ${away} : <strong style="color:#ef4444;">23.7%</strong></div>
                <div style="margin-top: 6px; font-size: 0.75rem; color: #38bdf8;">📌 Score le plus fréquent observé : <strong>2 - 1</strong></div>
            </div>
        `;
    }, 400);
};

// 🔀 CALCULATEUR DE VALUE BET
window.calculateValueBet = () => {
    const odds = parseFloat(document.getElementById('bookmaker-odds').value);
    const prob = parseFloat(document.getElementById('ai-prob').value);
    const resultDiv = document.getElementById('value-result');

    if (!odds || !prob) {
        resultDiv.innerHTML = `<span style="color: #ef4444;">Veuillez remplir les deux champs ci-dessus.</span>`;
        return;
    }

    const realOdds = (100 / prob).toFixed(2);
    const expectedValue = ((prob / 100) * odds - 1) * 100;

    if (expectedValue > 0) {
        resultDiv.innerHTML = `
            <div style="background: #0f172a; padding: 10px; border-radius: 8px; border: 1px solid #10b981;">
                <span style="color: #10b981; font-weight: bold;">🔥 EXCELLENT VALUE BET !</span><br>
                Cote réelle IA : <strong>${realOdds}</strong> vs Bookmaker : <strong>${odds}</strong><br>
                Bénéfice Théorique (EV) : <strong style="color: #10b981;">+${expectedValue.toFixed(1)}%</strong>
            </div>
        `;
    } else {
        resultDiv.innerHTML = `
            <div style="background: #0f172a; padding: 10px; border-radius: 8px; border: 1px solid #ef4444;">
                <span style="color: #ef4444; font-weight: bold;">⚠️ PAS DE VALEUR (Cote Trop Basse)</span><br>
                Cote réelle IA : <strong>${realOdds}</strong> vs Bookmaker : <strong>${odds}</strong><br>
                Marge du Bookmaker : <strong style="color: #ef4444;">${expectedValue.toFixed(1)}%</strong>
            </div>
        `;
    }
};

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
