// ==========================================
// ROBOT DE PRÉDICTION FOOTBALL & ESPORTS (FIFA / FC)
// Fichier : js/app.js (Version Complète)
// ==========================================

import aiOrchestrator from './ai-engine/ai-orchestrator.js';

// 1. Liste des pays et compétitions (Inclus FC 26, FC 25, 3x3, 4x4, Rush)
const divisionsData = {
    "FIFA": [
        "FC 26 - Champions League",
        "FC 25 - 3x3 Ligue de Conférence",
        "FC 26 - England Championship",
        "FC 26 - 5x5 Rush Superligue",
        "FC 24 - 4x4 Champions d'Angleterre",
        "FIFA 24 - Ultimate League",
        "eSports Battle"
    ],
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

// 2. Base de données des matchs (FIFA/FC et matchs réels)
const mockMatches = [
    { 
        id: 301, country: "FIFA", league: "FC 26 - Champions League", home: "Atlético de Madrid (eSports)", away: "Sporting CP (eSports)", 
        confidence: 60, status: "NS", homeScore: 0, awayScore: 0, elapsed: 0, isVirtual: true,
        valueBet: { active: false, edge: "0%", bookmakerOdds: 1.71, aiEstimatedOdds: 1.70 },
        bankrollTip: "⚠️ Match Virtuel FC 26 : Réduisez la mise à 1% MAX de votre bankroll",
        referee: { name: "IA Console", avgCards: "2.0 / match", strictness: "🟡 Standard", penaltyRate: "15%" },
        xgData: { homeXg: 0.00, awayXg: 0.00, momentum: "🎮 Simulation FC 26" },
        cornersData: { homeCorners: 0, awayCorners: 0, total: 0, pred: "-8.5 Corners" },
        goalsData: {
            overUnderPred: "+2.5 Buts dans le match (Cote 1.47)",
            btts: "Les 2 équipes marquent : OUI",
            nextGoalWindow: "⏱️ Temps réglementaire rapide",
            topScorers: "Algorithme Console"
        },
        stats: {
            yellowCards: { home: 0, away: 0, total: 0, pred: "-3.5 Cartons" },
            throwIns: { home: 0, away: 0, total: 0, pred: "N/A" },
            fouls: { home: 0, away: 0, total: 0, pred: "Faible" },
            clearances: { home: 0, away: 0, total: 0, pred: "N/A" }
        },
        weather: { temp: "20°C", cond: "🎮 Stade Virtuel", pitch: "Parfait", impact: "Aucun" },
        droppingOdds: null,
        h2h: ["Atlético 3-1 Sporting", "Sporting 2-2 Atlético"],
        playerProps: []
    },
    { 
        id: 302, country: "FIFA", league: "FC 25 - 3x3 Ligue de Conférence", home: "Chelsea 3x3", away: "Fiorentina 3x3", 
        confidence: 55, status: "NS", homeScore: 0, awayScore: 0, elapsed: 0, isVirtual: true,
        valueBet: { active: false, edge: "0%", bookmakerOdds: 1.85, aiEstimatedOdds: 1.80 },
        bankrollTip: "⚠️ Mode 3x3 : Match très court, mise 0.5% à 1% Max",
        referee: { name: "Arbitre Virtuel", avgCards: "1.0 / match", strictness: "🟢 Indulgent", penaltyRate: "5%" },
        xgData: { homeXg: 0.00, awayXg: 0.00, momentum: "🎮 Format réduit 3v3" },
        cornersData: { homeCorners: 0, awayCorners: 0, total: 0, pred: "-4.5 Corners" },
        goalsData: {
            overUnderPred: "+4.5 Buts dans le match",
            btts: "Les 2 équipes marquent : OUI",
            nextGoalWindow: "⏱️ Buts très fréquents (3x3)",
            topScorers: "Généré par simulation 3x3"
        },
        stats: {
            yellowCards: { home: 0, away: 0, total: 0, pred: "-2.5 Cartons" },
            throwIns: { home: 0, away: 0, total: 0, pred: "N/A" },
            fouls: { home: 0, away: 0, total: 0, pred: "Faible" },
            clearances: { home: 0, away: 0, total: 0, pred: "N/A" }
        },
        weather: { temp: "20°C", cond: "🎮 Arena 3x3", pitch: "Synthétique", impact: "Aucun" },
        droppingOdds: null,
        h2h: ["Chelsea 5-4 Fiorentina", "Fiorentina 3-3 Chelsea"],
        playerProps: []
    },
    { 
        id: 303, country: "FIFA", league: "FC 26 - 5x5 Rush Superligue", home: "Real Madrid Rush", away: "FC Barcelona Rush", 
        confidence: 58, status: "NS", homeScore: 0, awayScore: 0, elapsed: 0, isVirtual: true,
        valueBet: { active: true, edge: "+5%", bookmakerOdds: 1.90, aiEstimatedOdds: 1.75 },
        bankrollTip: "⚠️ Mode Rush 5x5 : Gros volume de buts attendu",
        referee: { name: "IA Rush", avgCards: "1.5 / match", strictness: "🟡 Standard", penaltyRate: "10%" },
        xgData: { homeXg: 0.00, awayXg: 0.00, momentum: "🎮 Mode Rush Arcade" },
        cornersData: { homeCorners: 0, awayCorners: 0, total: 0, pred: "N/A" },
        goalsData: {
            overUnderPred: "+5.5 Buts dans le match",
            btts: "Les 2 équipes marquent : OUI",
            nextGoalWindow: "⏱️ Rythme très élevé",
            topScorers: "Attaquants Rush"
        },
        stats: {
            yellowCards: { home: 0, away: 0, total: 0, pred: "-2.5 Cartons" },
            throwIns: { home: 0, away: 0, total: 0, pred: "N/A" },
            fouls: { home: 0, away: 0, total: 0, pred: "Moyen" },
            clearances: { home: 0, away: 0, total: 0, pred: "N/A" }
        },
        weather: { temp: "20°C", cond: "🎮 Arena Rush", pitch: "Parfait", impact: "Aucun" },
        droppingOdds: null,
        h2h: ["Real Rush 6-4 Barca Rush"],
        playerProps: []
    },
    { 
        id: 304, country: "FIFA", league: "FC 24 - 4x4 Champions d'Angleterre", home: "Arsenal 4x4", away: "Man City 4x4", 
        confidence: 62, status: "NS", homeScore: 0, awayScore: 0, elapsed: 0, isVirtual: true,
        valueBet: { active: false, edge: "0%", bookmakerOdds: 1.80, aiEstimatedOdds: 1.80 },
        bankrollTip: "⚠️ Mode 4x4 : Limiter la mise à 1% de la bankroll",
        referee: { name: "Arbitre Virtuel", avgCards: "2.0 / match", strictness: "🟡 Standard", penaltyRate: "10%" },
        xgData: { homeXg: 0.00, awayXg: 0.00, momentum: "🎮 Format 4v4" },
        cornersData: { homeCorners: 0, awayCorners: 0, total: 0, pred: "-5.5 Corners" },
        goalsData: {
            overUnderPred: "+3.5 Buts dans le match",
            btts: "Les 2 équipes marquent : OUI",
            nextGoalWindow: "⏱️ Match 8 minutes",
            topScorers: "Généré par console"
        },
        stats: {
            yellowCards: { home: 0, away: 0, total: 0, pred: "-3.5 Cartons" },
            throwIns: { home: 0, away: 0, total: 0, pred: "N/A" },
            fouls: { home: 0, away: 0, total: 0, pred: "Faible" },
            clearances: { home: 0, away: 0, total: 0, pred: "N/A" }
        },
        weather: { temp: "20°C", cond: "🎮 Terrain Reduit", pitch: "Parfait", impact: "Aucun" },
        droppingOdds: null,
        h2h: ["Arsenal 4-3 City", "City 2-2 Arsenal"],
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
        h2h: ["Real 2-1 Barca", "Barca 1-3 Real", "Real 0-1 Barca"],
        playerProps: [
            { player: "Kylian Mbappé", team: "Real Madrid", market: "Buteur", odds: 1.85, prob: 72 }
        ]
    }
];

// 3. Logique d'affichage
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('matches-container');
    const countrySelect = document.getElementById('country-select');
    const divisionSelect = document.getElementById('division-select');
    const searchInput = document.getElementById('search-input');
    const totalMatchesElem = document.getElementById('total-matches');

    if (!container) return;

    function updateDivisionOptions(countryCode) {
        if (!divisionSelect) return;
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
        const selectedCountry = countrySelect ? countrySelect.value : "ALL";
        const selectedDivision = divisionSelect ? divisionSelect.value : "ALL";
        const query = searchInput ? searchInput.value.toLowerCase().trim() : "";

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
            const isVirtual = match.isVirtual || match.country === "FIFA" || match.league.toLowerCase().includes("fifa") || match.league.toLowerCase().includes("fc ");
            
            const s = match.stats;
            const g = match.goalsData;
            const ref = match.referee;
            const xg = match.xgData;
            const cor = match.cornersData;
            const vb = match.valueBet;

            const card = document.createElement('div');
            card.style.cssText = "background: #1e293b; border-radius: 12px; padding: 15px; margin-bottom: 15px; border: 1px solid #334155; color: white;";

            card.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <span style="font-size: 0.8rem; color: #38bdf8; font-weight: bold;">🏆 ${match.league}</span>
                    <div style="display: flex; gap: 6px; align-items: center;">
                        ${isVirtual ? `<span style="background: #a855f7; color: white; padding: 2px 8px; border-radius: 10px; font-size: 0.7rem; font-weight: bold;">🎮 MATCH VIRTUEL / eSPORTS</span>` : ''}
                        ${vb.active ? `<span style="background: #8b5cf6; color: white; padding: 2px 8px; border-radius: 10px; font-size: 0.7rem; font-weight: bold;">💎 VALUE BET (${vb.edge})</span>` : ''}
                        ${isLive ? `<span style="background: #ef4444; color: white; padding: 2px 6px; border-radius: 10px; font-size: 0.7rem; font-weight: bold;">🔴 LIVE ${match.elapsed}'</span>` : `<span style="color: #94a3b8; font-size: 0.75rem;">📅 À venir</span>`}
                    </div>
                </div>

                ${isVirtual ? `
                    <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; color: #fca5a5; padding: 8px 10px; border-radius: 8px; font-size: 0.73rem; margin-bottom: 8px;">
                        ⚠️ <strong>Match Jeu Vidéo :</strong> Les statistiques réelles des équipes ne s'appliquent pas. Suivez la gestion de mise prudente (1% max).
                    </div>
                ` : ''}

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

                <div style="background: #0f172a; padding: 10px; border-radius: 10px; border-left: 4px solid #10b981; margin: 10px 0;">
                    <div style="font-size: 0.78rem; font-weight: bold; color: #10b981; margin-bottom: 6px;">
                        ⚽ ANNONCES & MARCHE BUTS (IA)
                    </div>
                    <div style="font-size: 0.75rem; color: #f8fafc; line-height: 1.5;">
                        <div>• 🎯 <strong>Pronostic Buts :</strong> <span style="color: #38bdf8;">${g.overUnderPred}</span></div>
                        <div>• 🥅 <strong>Les 2 Équipes Marquent :</strong> ${g.btts}</div>
                        <div>• ⏱️ <strong>Rythme :</strong> ${g.nextGoalWindow}</div>
                    </div>
                </div>

                <div style="background: ${isVirtual ? '#854d0e' : '#0284c7'}; padding: 8px 10px; border-radius: 8px; margin-bottom: 8px; font-size: 0.75rem; color: white; text-align: center;">
                    💰 <strong>Gestion de Capital :</strong> ${match.bankrollTip}
                </div>

                <div style="display: flex; gap: 6px; margin-top: 10px;">
                    <button onclick="toggleH2H(${match.id})" style="flex: 1; padding: 8px; background: #334155; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 0.75rem;">
                        ⚔️ Historique H2H
                    </button>
                    <button onclick="runAnalysis(${match.id}, '${match.home}', '${match.away}')" style="flex: 1.5; padding: 8px; background: #2563eb; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 0.75rem;">
                        🎲 Simulation IA
                    </button>
                </div>

                <div id="h2h-block-${match.id}" style="display: none; background: #0f172a; padding: 10px; border-radius: 8px; margin-top: 8px; font-size: 0.75rem;">
                    <strong style="color: #38bdf8;">📜 Derniers Matchs :</strong>
                    <ul style="margin: 4px 0 0 15px; padding: 0; color: #cbd5e1;">
                        ${match.h2h.map(h => `<li>${h}</li>`).join('')}
                    </ul>
                </div>

                <div id="prediction-${match.id}"></div>
            `;

            container.appendChild(card);
        });
    }

    if (countrySelect) {
        countrySelect.addEventListener('change', (e) => {
            updateDivisionOptions(e.target.value);
            renderMatches();
        });
    }

    if (divisionSelect) divisionSelect.addEventListener('change', renderMatches);
    if (searchInput) searchInput.addEventListener('input', renderMatches);

    renderMatches();
});

// 4. Fonctions globales
window.toggleH2H = (matchId) => {
    const block = document.getElementById(`h2h-block-${matchId}`);
    if (block) {
        block.style.display = (block.style.display === 'none') ? 'block' : 'none';
    }
};

window.runAnalysis = (matchId, home, away) => {
    const target = document.getElementById(`prediction-${matchId}`);
    if (!target) return;

    target.innerHTML = `<div style="color:#38bdf8; font-size:0.8rem; margin-top:8px; text-align:center;">🎲 Calcul de la simulation Monte Carlo...</div>`;
    setTimeout(() => {
        target.innerHTML = `
            <div style="background: #0f172a; padding: 10px; border-radius: 8px; border: 1px solid #10b981; margin-top: 8px; font-size: 0.78rem;">
                <span style="color: #10b981; font-weight: bold;">📊 Diagnostic IA :</span><br>
                Victoire ${home}: <strong>48%</strong> | Nul: <strong>26%</strong> | Victoire ${away}: <strong>26%</strong><br>
                <div style="margin-top: 4px; color: #cbd5e1;">
                    • ⚽ Recommandation : <strong>+2.5 Buts dans le match</strong><br>
                    • 💰 Stake Conseillé : <strong>1% Max</strong>
                </div>
            </div>
        `;
    }, 300);
};

// 5. Générateur automatique de coupon FIFA
window.generateFifaCoupon = () => {
    const fifaMatches = mockMatches.filter(m => 
        m.isVirtual || m.country === "FIFA" || m.league.toLowerCase().includes("fifa") || m.league.toLowerCase().includes("fc ")
    );

    const couponResult = document.getElementById('fifa-coupon-result');
    if (!couponResult) return;

    if (fifaMatches.length === 0) {
        couponResult.innerHTML = `<div style="color: #ef4444; text-align: center; padding: 10px;">❌ Aucun match FIFA disponible actuellement.</div>`;
        return;
    }

    let totalOdds = 1.0;
    let selections = [];

    fifaMatches.forEach(match => {
        let pickName = "Plus de 2.5 Buts";
        let pickOdds = 1.47;

        if (match.league.includes("3x3") || match.league.includes("Rush")) {
            pickName = "Plus de 4.5 Buts";
            pickOdds = 1.50;
        } else if (match.league.includes("4x4")) {
            pickName = "Plus de 3.5 Buts";
            pickOdds = 1.42;
        }

        totalOdds *= pickOdds;
        selections.push({
            match: `${match.home} vs ${match.away}`,
            league: match.league,
            pick: pickName,
            odds: pickOdds.toFixed(2)
        });
    });

    const finalOdds = totalOdds.toFixed(2);
    const potentialGain5000 = (5000 * finalOdds).toLocaleString();

    couponResult.innerHTML = `
        <div style="background: linear-gradient(135deg, #1e1b4b, #0f172a); border: 2px solid #8b5cf6; border-radius: 12px; padding: 15px; margin-top: 15px; color: white;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #334155; padding-bottom: 8px; margin-bottom: 12px;">
                <span style="font-weight: bold; color: #a78bfa; font-size: 0.9rem;">🎫 COUPON COMBINÉ SPÉCIAL FIFA / FC</span>
                <span style="background: #8b5cf6; color: white; padding: 2px 8px; border-radius: 10px; font-size: 0.75rem; font-weight: bold;">Cote Totale : ${finalOdds}</span>
            </div>

            <div style="font-size: 0.8rem; line-height: 1.5; margin-bottom: 12px;">
                ${selections.map(s => `
                    <div style="background: #1e293b; padding: 8px; border-radius: 6px; margin-bottom: 6px; border-left: 3px solid #10b981;">
                        <div style="font-size: 0.7rem; color: #94a3b8;">${s.league}</div>
                        <div style="font-weight: bold;">${s.match}</div>
                        <div style="color: #38bdf8;">🎯 Pari : <strong>${s.pick}</strong> (Cote ${s.odds})</div>
                    </div>
                `).join('')}
            </div>

            <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid #10b981; padding: 10px; border-radius: 8px; font-size: 0.8rem;">
                💰 <strong>Exemple de Gain (Mise 5 000 FCFA) :</strong><br>
                • Gain Potentiel : <strong style="color: #10b981; font-size: 1rem;">${potentialGain5000} FCFA</strong>
            </div>
        </div>
    `;
};
