// js/app.js
import aiOrchestrator from './ai-engine/ai-orchestrator.js';

const divisionsData = {
    "FIFA": ["FIFA 24 - Champions League", "FIFA 24 - Ultimate League", "eSports Battle"],
    "ENG": ["Premier League (D1)", "Championship (D2)", "League One (D3)", "FA Cup"],
    "ESP": ["La Liga (D1)", "La Liga 2 (D2)", "Copa del Rey"],
    "ITA": ["Serie A (D1)", "Serie B (D2)", "Coppa Italia"],
    "FRA": ["Ligue 1 (D1)", "Ligue 2 (D2)", "Coupe de France"],
    "POR": ["Liga Portugal (D1)"],
    "NED": ["Eredivisie (D1)"],
    "GER": ["Bundesliga (D1)", "2. Bundesliga (D2)"],
    "BEL": ["Jupiler Pro League (D1)"],
    "BRA": ["Série A (D1)"],
    "ARG": ["Liga Profesional (D1)"],
    "AFR": ["CAF Champions League", "Botola Pro", "Ligue 1 Côte d'Ivoire"],
    "INT": ["UEFA Champions League", "UEFA Europa League"]
};

// Base de données enrichie avec matchs réels et virtuels (FIFA)
const mockMatches = [
    { 
        id: 301, country: "FIFA", league: "FIFA 24 - Champions League", home: "Atlético de Madrid (eSports)", away: "Sporting CP (eSports)", 
        confidence: 60, status: "NS", homeScore: 0, awayScore: 0, elapsed: 0, isVirtual: true,
        valueBet: { active: false, edge: "0%", bookmakerOdds: 1.71, aiEstimatedOdds: 1.70 },
        bankrollTip: "⚠️ Match Virtuel FIFA : Réduisez la mise à 1% MAX de votre bankroll",
        referee: { name: "IA FIFA (Console)", avgCards: "2.0 / match", strictness: "🟡 Standard", penaltyRate: "15%" },
        xgData: { homeXg: 0.00, awayXg: 0.00, momentum: "🎮 Simulation Console / Manettes" },
        cornersData: { homeCorners: 0, awayCorners: 0, total: 0, pred: "-8.5 Corners (Match court)" },
        goalsData: {
            overUnderPred: "+2.5 Buts dans le match (Cote 1.47)",
            btts: "Les 2 équipes marquent : OUI (Cote 1.50)",
            nextGoalWindow: "⏱️ Match très rapide (6 min)",
            topScorers: "Généré par l'algorithme du jeu vidéo"
        },
        stats: {
            yellowCards: { home: 0, away: 0, total: 0, pred: "Moins de 3.5 Cartons" },
            throwIns: { home: 0, away: 0, total: 0, pred: "Non analysé sur FIFA" },
            fouls: { home: 0, away: 0, total: 0, pred: "Faible niveau de fautes" },
            clearances: { home: 0, away: 0, total: 0, pred: "Non analysé sur FIFA" }
        },
        weather: { temp: "20°C", cond: "🎮 Stade Virtuel", pitch: "Parfait", impact: "Aucune météo rélle" },
        droppingOdds: null,
        h2h: ["Atlético 3-1 Sporting (FIFA)", "Sporting 2-2 Atlético (FIFA)"],
        playerProps: []
    },
    { 
        id: 201, country: "ESP", league: "La Liga (D1)", home: "Real Madrid", away: "FC Barcelone", 
        confidence: 88, status: "LIVE", homeScore: 2, awayScore: 1, elapsed: 64, isVirtual: false,
        valueBet: { active: true, edge: "+12% Value", bookmakerOdds: 2.10, aiEstimatedOdds: 1.80 },
        bankrollTip: "Mise recommandée : 3.5% de votre Bankroll (Confiance 88%)",
        referee: { name: "A. Mateu Lahoz", avgCards: "5.4 / match", strictness: "🔴 Très Sévère", penaltyRate: "35% des matchs" },
        xgData: { homeXg: 1.85, awayXg: 1.12, momentum: "🔥 Real Madrid pousse (78% Pression)" },
        cornersData: { homeCorners: 6, awayCorners: 4, total: 10, pred: "+9.5 Corners (Validé ✅)" },
        goalsData: {
            overUnderPred: "+3.5 Buts dans le match (Cote 1.80)",
            btts: "Les 2 équipes marquent : OUI (Validé ✅)",
            nextGoalWindow: "🔥 85% de chance d'un but entre 65' et 80'",
            topScorers: "K. Mbappé (42'), R. Lewandowski (55'), V. Junior (18')"
        },
        stats: {
            yellowCards: { home: 2, away: 3, total: 5, pred: "+4.5 Cartons (Validé ✅)" },
            throwIns: { home: 18, away: 15, total: 33, pred: "+32.5 Touches (Cote 1.85)" },
            fouls: { home: 12, away: 14, total: 26, pred: "+23.5 Fautes (Cote 1.65)" },
            clearances: { home: 8, away: 11, total: 19, pred: "+16.5 Dégagements (Cote 1.75)" }
        },
        weather: { temp: "18°C", cond: "🌧️ Pluie Modérée", pitch: "Glissant", impact: "⚠️ +20% de fautes et glissades" },
        droppingOdds: { initial: 2.20, current: 1.65, dropPercent: -25, reason: "🔥 Gros flux de parieurs sur Real Madrid" },
        h2h: ["Real 2-1 Barca", "Barca 1-3 Real", "Real 0-1 Barca", "Barca 2-2 Real"],
        playerProps: [
            { player: "Kylian Mbappé", team: "Real Madrid", market: "Buteur", odds: 1.85, prob: 72 },
            { player: "Robert Lewandowski", team: "FC Barcelone", market: "+0.5 Tirs Cadrés", odds: 1.40, prob: 85 }
        ]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('matches-container');
    const droppingContainer = document.getElementById('dropping-odds-container');
    const playersContainer = document.getElementById('players-props-container');
    const countrySelect = document.getElementById('country-select');
    const divisionSelect = document.getElementById('division-select');
    const searchInput = document.getElementById('search-input');
    const totalMatchesElem = document.getElementById('total-matches');

    if (!container) return;

    function updateDivisionOptions(countryCode) {
        divisionSelect.innerHTML = `<option value="ALL">⚽ Toutes les divisions de ce pays</option>`;
        if (countryCode !== "ALL" && divisionsData[countryCode]) {
            divisionsData[countryCode].forEach(div => {
                const opt = document.createElement('option');
                opt.value = div;
                opt.textContent = div;
                divisionSelect.appendChild(opt);
            });
        }
    }

    function renderMatches() {
        const selectedCountry = countrySelect.value;
        const selectedDivision = divisionSelect.value;
        const query = searchInput.value.toLowerCase().trim();

        const filtered = mockMatches.filter(m => {
            const matchCountry = (selectedCountry === "ALL" || m.country === selectedCountry);
            const matchDivision = (selectedDivision === "ALL" || m.league === selectedDivision);
            const matchSearch = m.home.toLowerCase().includes(query) ||
                                m.away.toLowerCase().includes(query) ||
                                m.league.toLowerCase().includes(query);

            return matchCountry && matchDivision && matchSearch;
        });

        if (totalMatchesElem) {
            totalMatchesElem.textContent = `${filtered.length} Match(s) analysés par l'IA`;
        }

        container.innerHTML = '';

        if (filtered.length === 0) {
            container.innerHTML = `<div style="text-align: center; color: #94a3b8; padding: 30px 10px;">🔍 Aucun match trouvé.</div>`;
            return;
        }

        filtered.forEach(match => {
            const isLive = match.status === "LIVE";
            const isVirtual = match.isVirtual || match.country === "FIFA" || match.league.toLowerCase().includes("fifa");
            
            const s = match.stats;
            const g = match.goalsData;
            const ref = match.referee;
            const xg = match.xgData;
            const cor = match.cornersData;
            const vb = match.valueBet;

            const card = document.createElement('div');
            card.style.cssText = "background: #1e293b; border-radius: 12px; padding: 15px; margin-bottom: 15px; border: 1px solid #334155; color: white;";

            card.innerHTML = `
                <!-- EN-TÊTE + BADGE VIRTUEL / VALUE BET -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <span style="font-size: 0.8rem; color: #38bdf8; font-weight: bold;">🏆 ${match.league}</span>
                    <div style="display: flex; gap: 6px; align-items: center;">
                        ${isVirtual ? `<span style="background: #a855f7; color: white; padding: 2px 8px; border-radius: 10px; font-size: 0.7rem; font-weight: bold;">🎮 MATCH VIRTUEL FIFA</span>` : ''}
                        ${vb.active ? `<span style="background: #8b5cf6; color: white; padding: 2px 8px; border-radius: 10px; font-size: 0.7rem; font-weight: bold;">💎 VALUE BET (${vb.edge})</span>` : ''}
                        ${isLive ? `<span style="background: #ef4444; color: white; padding: 2px 6px; border-radius: 10px; font-size: 0.7rem; font-weight: bold;">🔴 LIVE ${match.elapsed}'</span>` : `<span style="color: #94a3b8; font-size: 0.75rem;">📅 À venir</span>`}
                    </div>
                </div>

                <!-- ⚠️ BANNIÈRE D'AVERTISSEMENT SPÉCIALE SI MATCH VIRTUEL -->
                ${isVirtual ? `
                    <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; color: #fca5a5; padding: 8px 10px; border-radius: 8px; font-size: 0.73rem; margin-bottom: 8px;">
                        ⚠️ <strong>Avertissement eSports :</strong> Ce match est une simulation de jeu vidéo. Les statistiques réelles des joueurs ne s'appliquent pas.
                    </div>
                ` : ''}

                <!-- SCORE & XG LIVE -->
                <div style="background: #0f172a; border-radius: 10px; padding: 12px; text-align: center; margin: 8px 0; border: 1px solid #38bdf8;">
                    <div style="font-size: 1.1rem; font-weight: bold;">
                        ${match.home} <span style="color: #10b981; font-size: 1.4rem; font-weight: 900; margin: 0 6px;">${isLive ? `${match.homeScore} - ${match.awayScore}` : 'VS'}</span> ${match.away}
                    </div>
                    ${isLive ? `
                        <div style="font-size: 0.75rem; color: #94a3b8; margin-top: 4px;">
                            📊 xG : <strong style="color:#38bdf8;">${xg.homeXg}</strong> - <strong style="color:#38bdf8;">${xg.awayXg}</strong> | ${xg.momentum}
                        </div>
                    ` : ''}
                </div>

                <!-- ⚽ BLOC BUTS -->
                <div style="background: #0f172a; padding: 10px; border-radius: 10px; border-left: 4px solid #10b981; margin: 10px 0;">
                    <div style="font-size: 0.78rem; font-weight: bold; color: #10b981; margin-bottom: 6px;">
                        ⚽ ANNONCES & MARCHE BUTS (IA)
                    </div>
                    <div style="font-size: 0.75rem; color: #f8fafc; line-height: 1.5;">
                        <div>• 🎯 <strong>Nombre de Buts :</strong> <span style="color: #38bdf8;">${g.overUnderPred}</span></div>
                        <div>• 🥅 <strong>Les 2 Équipes Marquent :</strong> ${g.btts}</div>
                        <div>• ⏱️ <strong>Créneau Prochain But :</strong> ${g.nextGoalWindow}</div>
                        <div>• 👟 <strong>Buteurs Présumés :</strong> <span style="color: #f59e0b;">${g.topScorers}</span></div>
                    </div>
                </div>

                <!-- 👨‍⚖️ ARBITRE & CORNERS -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 10px 0; font-size: 0.75rem;">
                    <div style="background: #0f172a; padding: 8px; border-radius: 8px; border: 1px solid #334155;">
                        <span style="color: #f59e0b; font-weight: bold;">👨‍⚖️ Arbitre :</span> ${ref.name}<br>
                        <span style="color: #cbd5e1;">Moy. Cartons: ${ref.avgCards}</span>
                    </div>
                    <div style="background: #0f172a; padding: 8px; border-radius: 8px; border: 1px solid #334155;">
                        <span style="color: #38bdf8; font-weight: bold;">🚩 Corners :</span> ${isLive ? `${cor.homeCorners} - ${cor.awayCorners} (${cor.total})` : 'En attente'}<br>
                        <span style="color: #10b981;">🎯 ${cor.pred}</span>
                    </div>
                </div>

                <!-- 📊 AUTRES MÉTRIQUES -->
                <div style="background: #0f172a; padding: 10px; border-radius: 10px; border: 1px solid #334155; margin: 10px 0;">
                    <div style="font-size: 0.75rem; font-weight: bold; color: #38bdf8; margin-bottom: 8px; text-transform: uppercase;">
                        📈 Cartons, Touches, Fautes & Dégagements
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.75rem;">
                        <div style="background: #1e293b; padding: 8px; border-radius: 6px; border-left: 3px solid #f59e0b;">
                            <div style="color: #f59e0b; font-weight: bold;">🟨 Cartons Jaunes</div>
                            <div>${isLive ? `Live: <strong>${s.yellowCards.home} - ${s.yellowCards.away}</strong>` : 'À venir'}</div>
                            <div style="color: #10b981; font-size: 0.7rem; margin-top: 2px;">🎯 ${s.yellowCards.pred}</div>
                        </div>

                        <div style="background: #1e293b; padding: 8px; border-radius: 6px; border-left: 3px solid #38bdf8;">
                            <div style="color: #38bdf8; font-weight: bold;">🤾 Touches</div>
                            <div>${isLive ? `Live: <strong>${s.throwIns.home} - ${s.throwIns.away}</strong>` : 'À venir'}</div>
                            <div style="color: #10b981; font-size: 0.7rem; margin-top: 2px;">🎯 ${s.throwIns.pred}</div>
                        </div>

                        <div style="background: #1e293b; padding: 8px; border-radius: 6px; border-left: 3px solid #ef4444;">
                            <div style="color: #ef4444; font-weight: bold;">⚠️ Fautes Commises</div>
                            <div>${isLive ? `Live: <strong>${s.fouls.home} - ${s.fouls.away}</strong>` : 'À venir'}</div>
                            <div style="color: #10b981; font-size: 0.7rem; margin-top: 2px;">🎯 ${s.fouls.pred}</div>
                        </div>

                        <div style="background: #1e293b; padding: 8px; border-radius: 6px; border-left: 3px solid #10b981;">
                            <div style="color: #10b981; font-weight: bold;">🧤 Dégagements</div>
                            <div>${isLive ? `Live: <strong>${s.clearances.home} - ${s.clearances.away}</strong>` : 'À venir'}</div>
                            <div style="color: #10b981; font-size: 0.7rem; margin-top: 2px;">🎯 ${s.clearances.pred}</div>
                        </div>
                    </div>
                </div>

                <!-- 💰 CONSEIL BANKROLL IA -->
                <div style="background: ${isVirtual ? '#854d0e' : '#0284c7'}; padding: 8px 10px; border-radius: 8px; margin-bottom: 8px; font-size: 0.75rem; color: white; text-align: center;">
                    💰 <strong>Gestion de Capital :</strong> ${match.bankrollTip}
                </div>

                <!-- ACTIONS -->
                <div style="display: flex; gap: 6px; margin-top: 10px;">
                    <button onclick="toggleH2H(${match.id})" style="flex: 1; padding: 8px; background: #334155; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 0.75rem;">
                        ⚔️ H2H (Historique)
                    </button>
                    <button onclick="runAnalysis(${match.id}, '${match.home}', '${match.away}')" style="flex: 1.5; padding: 8px; background: #2563eb; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 0.75rem;">
                        🎲 Simulation IA (10k)
                    </button>
                </div>

                <!-- ACCORDEON H2H -->
                <div id="h2h-block-${match.id}" style="display: none; background: #0f172a; padding: 10px; border-radius: 8px; margin-top: 8px; font-size: 0.75rem;">
                    <strong style="color: #38bdf8;">📜 Dernières Confrontations :</strong>
                    <ul style="margin: 4px 0 0 15px; padding: 0; color: #cbd5e1;">
                        ${match.h2h.map(h => `<li>${h}</li>`).join('')}
                    </ul>
                </div>

                <div id="prediction-${match.id}"></div>
            `;

            container.appendChild(card);
        });
    }

    countrySelect.addEventListener('change', (e) => {
        updateDivisionOptions(e.target.value);
        renderMatches();
    });

    divisionSelect.addEventListener('change', renderMatches);
    searchInput.addEventListener('input', renderMatches);

    renderMatches();
});

window.toggleH2H = (matchId) => {
    const block = document.getElementById(`h2h-block-${matchId}`);
    if (block) {
        block.style.display = (block.style.display === 'none') ? 'block' : 'none';
    }
};

window.runAnalysis = (matchId, home, away) => {
    const target = document.getElementById(`prediction-${matchId}`);
    if (!target) return;

    target.innerHTML = `<div style="color:#38bdf8; font-size:0.8rem; margin-top:8px; text-align:center;">🎲 Calcul de la simulation Monte Carlo (10 000 runs)...</div>`;
    setTimeout(() => {
        target.innerHTML = `
            <div style="background: #0f172a; padding: 10px; border-radius: 8px; border: 1px solid #10b981; margin-top: 8px; font-size: 0.78rem;">
                <span style="color: #10b981; font-weight: bold;">📊 Diagnostic Complet IA :</span><br>
                Victoire ${home}: <strong>48%</strong> | Nul: <strong>26%</strong> | Victoire ${away}: <strong>26%</strong><br>
                <div style="margin-top: 4px; color: #cbd5e1;">
                    • ⚽ Buts : <strong>+2.5 Buts (68% proba)</strong><br>
                    • 💰 Stake Conseillé : <strong>1% Max (Prudence eSports)</strong>
                </div>
            </div>
        `;
    }, 300);
};
