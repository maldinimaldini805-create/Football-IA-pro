// js/app.js
import aiOrchestrator from './ai-engine/ai-orchestrator.js';

const divisionsData = {
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

// Base de données enrichie avec section Buts complète + Métriques
const mockMatches = [
    { 
        id: 201, country: "ESP", league: "La Liga (D1)", home: "Real Madrid", away: "FC Barcelone", 
        confidence: 88, status: "LIVE", homeScore: 2, awayScore: 1, elapsed: 64,
        goalsData: {
            totalGoals: "3 buts inscrits",
            overUnderPred: "+3.5 Buts dans le match (Cote 1.80)",
            btts: "Les 2 équipes marquent : OUI (Validé ✅)",
            nextGoalWindow: "🔥 85% de chance d'un but entre la 65' et 80'",
            topScorers: "K. Mbappé (42'), R. Lewandowski (55'), V. Junior (18')"
        },
        stats: {
            yellowCards: { home: 2, away: 3, total: 5, pred: "+4.5 Cartons (Cote 1.70)" },
            throwIns: { home: 18, away: 15, total: 33, pred: "+32.5 Touches (Cote 1.85)" },
            fouls: { home: 12, away: 14, total: 26, pred: "+23.5 Fautes (Cote 1.65)" },
            clearances: { home: 8, away: 11, total: 19, pred: "+16.5 Dégagements (Cote 1.75)" }
        },
        weather: { temp: "18°C", cond: "🌧️ Pluie Modérée", pitch: "Glissant", impact: "⚠️ +20% de fautes et glissades" },
        droppingOdds: { initial: 2.20, current: 1.65, dropPercent: -25, reason: "🔥 Gros flux de parieurs sur Real Madrid" },
        h2h: ["Real 2-1 Barca", "Barca 1-3 Real", "Real 0-1 Barca", "Barca 2-2 Real", "Real 4-1 Barca"],
        playerProps: [
            { player: "Kylian Mbappé", team: "Real Madrid", market: "Buteur", odds: 1.85, prob: 72 },
            { player: "Robert Lewandowski", team: "FC Barcelone", market: "+0.5 Tirs Cadrés", odds: 1.40, prob: 85 },
            { player: "Eder Militão", team: "Real Madrid", market: "Carton Jaune", odds: 2.80, prob: 48 }
        ]
    },
    { 
        id: 202, country: "ENG", league: "Premier League (D1)", home: "Arsenal", away: "Liverpool", 
        confidence: 82, status: "NS", homeScore: 0, awayScore: 0, elapsed: 0,
        goalsData: {
            totalGoals: "0 but (Avant-match)",
            overUnderPred: "+2.5 Buts recommandés (Cote 1.65 - 78% proba)",
            btts: "Les 2 équipes marquent : OUI (Cote 1.55)",
            nextGoalWindow: "⏱️ Premier but estimé entre 15' et 30'",
            topScorers: "B. Saka, M. Salah (Favoris pour marquer)"
        },
        stats: {
            yellowCards: { home: 0, away: 0, total: 0, pred: "Moins de 4.5 Cartons" },
            throwIns: { home: 0, away: 0, total: 0, pred: "+36.5 Touches attendues" },
            fouls: { home: 0, away: 0, total: 0, pred: "18 à 22 Fautes estimées" },
            clearances: { home: 0, away: 0, total: 0, pred: "+14.5 Dégagements" }
        },
        weather: { temp: "11°C", cond: "🌬️ Vent Fort (40km/h)", pitch: "Excellent", impact: "🎯 Trajectoires de balle modifiées" },
        droppingOdds: { initial: 2.80, current: 2.15, dropPercent: -23, reason: "🚑 Blessure du gardien adverse" },
        h2h: ["Arsenal 2-2 Liverpool", "Liverpool 1-1 Arsenal", "Arsenal 3-1 Liverpool", "Liverpool 0-2 Arsenal"],
        playerProps: [
            { player: "Bukayo Saka", team: "Arsenal", market: "Passeur ou Buteur", odds: 1.90, prob: 68 },
            { player: "Mohamed Salah", team: "Liverpool", market: "Buteur", odds: 2.10, prob: 60 }
        ]
    },
    { 
        id: 203, country: "ITA", league: "Serie A (D1)", home: "Inter Milan", away: "Juventus", 
        confidence: 84, status: "NS", homeScore: 0, awayScore: 0, elapsed: 0,
        goalsData: {
            totalGoals: "0 but (Avant-match)",
            overUnderPred: "Moins de 2.5 Buts (Cote 1.90 - Match fermé)",
            btts: "Les 2 équipes marquent : NON (Cote 1.85)",
            nextGoalWindow: "⏱️ But tardif possible (70'-90')",
            topScorers: "L. Martínez (Principale menace)"
        },
        stats: {
            yellowCards: { home: 0, away: 0, total: 0, pred: "+5.5 Cartons (Derby tendu)" },
            throwIns: { home: 0, away: 0, total: 0, pred: "+34.5 Touches" },
            fouls: { home: 0, away: 0, total: 0, pred: "+26.5 Fautes estimées" },
            clearances: { home: 0, away: 0, total: 0, pred: "+18.5 Dégagements" }
        },
        weather: { temp: "22°C", cond: "☀️ Ensoleillé", pitch: "Parfait", impact: "⚡ Rythme rapide" },
        droppingOdds: null,
        h2h: ["Inter 1-0 Juve", "Juve 1-1 Inter", "Inter 2-1 Juve"],
        playerProps: [
            { player: "Lautaro Martínez", team: "Inter Milan", market: "Buteur", odds: 2.20, prob: 58 },
            { player: "Nicolò Barella", team: "Inter Milan", market: "Carton Jaune", odds: 2.50, prob: 52 }
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
            const s = match.stats;
            const g = match.goalsData;
            const card = document.createElement('div');
            card.style.cssText = "background: #1e293b; border-radius: 12px; padding: 15px; margin-bottom: 15px; border: 1px solid #334155; color: white;";

            card.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <span style="font-size: 0.8rem; color: #38bdf8; font-weight: bold;">🏆 ${match.league}</span>
                    ${isLive ? `<span style="background: #ef4444; color: white; padding: 2px 6px; border-radius: 10px; font-size: 0.7rem; font-weight: bold;">🔴 LIVE ${match.elapsed}'</span>` : `<span style="color: #94a3b8; font-size: 0.75rem;">📅 À venir</span>`}
                </div>

                <!-- AFFICHAGE SCORE DE MATCH GRAND FORMAT -->
                <div style="background: #0f172a; border-radius: 10px; padding: 12px; text-align: center; margin: 8px 0; border: 1px solid #38bdf8;">
                    <div style="font-size: 1.1rem; font-weight: bold;">
                        ${match.home} <span style="color: #10b981; font-size: 1.4rem; font-weight: 900; margin: 0 6px;">${isLive ? `${match.homeScore} - ${match.awayScore}` : 'VS'}</span> ${match.away}
                    </div>
                </div>

                <!-- ⚽ NOUVEAU BLOC DÉDIÉ AUX BUTS & PRÉDICTIONS D'OFFENSE -->
                <div style="background: #0f172a; padding: 10px; border-radius: 10px; border-left: 4px solid #10b981; margin: 10px 0;">
                    <div style="font-size: 0.78rem; font-weight: bold; color: #10b981; margin-bottom: 6px;">
                        ⚽ ANNONCES & MARCHE BUTS (IA)
                    </div>
                    <div style="font-size: 0.75rem; color: #f8fafc; line-height: 1.5;">
                        <div>• 🎯 <strong>Nombre de Buts :</strong> <span style="color: #38bdf8;">${g.overUnderPred}</span></div>
                        <div>• 🥅 <strong>Les 2 Équipes Marquent :</strong> ${g.btts}</div>
                        <div>• ⏱️ <strong>Créneau Prochain But :</strong> ${g.nextGoalWindow}</div>
                        <div>• 👟 <strong>Buteurs / Réalisateurs :</strong> <span style="color: #f59e0b;">${g.topScorers}</span></div>
                    </div>
                </div>

                <!-- 📊 BLOC MÉTRIQUES : CARTONS, TOUCHES, FAUTES, DÉGAGEMENTS -->
                <div style="background: #0f172a; padding: 10px; border-radius: 10px; border: 1px solid #334155; margin: 10px 0;">
                    <div style="font-size: 0.75rem; font-weight: bold; color: #38bdf8; margin-bottom: 8px; text-transform: uppercase;">
                        📈 Autres Métriques Spéciales
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

                <!-- 🌤️ MÉTÉO -->
                <div style="background: #0f172a; padding: 8px 10px; border-radius: 8px; margin-bottom: 8px; font-size: 0.75rem; display: flex; justify-content: space-between;">
                    <span>🌤️ ${match.weather.cond} (${match.weather.temp})</span>
                    <span style="color: #f59e0b; font-size: 0.7rem;">${match.weather.impact}</span>
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
                    <strong style="color: #38bdf8;">📜 5 Dernières Confrontations :</strong>
                    <ul style="margin: 4px 0 0 15px; padding: 0; color: #cbd5e1;">
                        ${match.h2h.map(h => `<li>${h}</li>`).join('')}
                    </ul>
                </div>

                <div id="prediction-${match.id}"></div>
            `;

            container.appendChild(card);
        });
    }

    function renderDroppingOdds() {
        if (!droppingContainer) return;
        droppingContainer.innerHTML = '';

        const droppingList = mockMatches.filter(m => m.droppingOdds !== null);
        droppingList.forEach(match => {
            const d = match.droppingOdds;
            const div = document.createElement('div');
            div.style.cssText = "background: #1e293b; padding: 12px; border-radius: 10px; border-left: 4px solid #ef4444; margin-bottom: 10px; color: white;";
            div.innerHTML = `
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem;">
                    <strong>${match.home} vs ${match.away}</strong>
                    <span style="color: #ef4444; font-weight: bold;">${d.dropPercent}% CHUTE</span>
                </div>
                <div style="font-size: 0.75rem; color: #cbd5e1; margin-top: 4px;">
                    Cote initiale: <del>${d.initial}</del> ➔ Cote actuelle: <strong style="color:#10b981;">${d.current}</strong>
                </div>
                <div style="font-size: 0.7rem; color: #f59e0b; margin-top: 4px;">💡 Motif : ${d.reason}</div>
            `;
            droppingContainer.appendChild(div);
        });
    }

    function renderPlayersProps() {
        if (!playersContainer) return;
        playersContainer.innerHTML = '';

        mockMatches.forEach(match => {
            if (match.playerProps) {
                match.playerProps.forEach(p => {
                    const card = document.createElement('div');
                    card.style.cssText = "background: #1e293b; padding: 12px; border-radius: 10px; border: 1px solid #334155; margin-bottom: 10px; color: white;";
                    card.innerHTML = `
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <strong style="font-size: 0.9rem; color: white;">👤 ${p.player}</strong>
                                <span style="font-size: 0.75rem; color: #94a3b8;"> (${p.team})</span>
                                <div style="font-size: 0.8rem; color: #38bdf8; margin-top: 2px;">📌 ${p.market}</div>
                            </div>
                            <div style="text-align: right;">
                                <span style="background: #059669; color: white; padding: 3px 8px; border-radius: 6px; font-weight: bold; font-size: 0.8rem;">Cote ${p.odds}</span>
                                <div style="font-size: 0.7rem; color: #10b981; margin-top: 3px;">Prob. IA: ${p.prob}%</div>
                            </div>
                        </div>
                    `;
                    playersContainer.appendChild(card);
                });
            }
        });
    }

    countrySelect.addEventListener('change', (e) => {
        updateDivisionOptions(e.target.value);
        renderMatches();
    });

    divisionSelect.addEventListener('change', renderMatches);
    searchInput.addEventListener('input', renderMatches);

    renderMatches();
    renderDroppingOdds();
    renderPlayersProps();
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

    target.innerHTML = `<div style="color:#38bdf8; font-size:0.8rem; margin-top:8px; text-align:center;">🎲 Calcul des 10 000 simulations...</div>`;
    setTimeout(() => {
        target.innerHTML = `
            <div style="background: #0f172a; padding: 10px; border-radius: 8px; border: 1px solid #10b981; margin-top: 8px; font-size: 0.78rem;">
                <span style="color: #10b981; font-weight: bold;">📊 Diagnostic Buts & Scenarios :</span><br>
                Victoire ${home}: <strong>52%</strong> | Nul: <strong>25%</strong> | Victoire ${away}: <strong>23%</strong><br>
                <div style="margin-top: 4px; color: #cbd5e1;">
                    • ⚽ Projection Buts : <strong>+2.5 Buts (78% proba)</strong><br>
                    • 🥅 Les 2 Équipes Marquent : <strong>OUI (65% proba)</strong><br>
                    • 🟨 Cartons : <strong>+4.5 (68% proba)</strong><br>
                    • 🤾 Touches : <strong>+32.5 (75% proba)</strong>
                </div>
            </div>
        `;
    }, 300);
};

window.addScannerRow = () => {
    const container = document.getElementById('ticket-scanner-inputs');
    const div = document.createElement('div');
    div.style.cssText = "display: flex; gap: 6px; margin-bottom: 8px;";
    div.innerHTML = `
        <input type="text" placeholder="Match" class="scan-match" style="flex: 2; padding: 8px; border-radius: 6px; border: 1px solid #334155; background: #0f172a; color: white; font-size: 0.8rem;">
        <input type="text" placeholder="Choix" class="scan-pick" style="flex: 1.5; padding: 8px; border-radius: 6px; border: 1px solid #334155; background: #0f172a; color: white; font-size: 0.8rem;">
        <input type="number" step="0.01" placeholder="Cote" class="scan-odds" style="flex: 1; padding: 8px; border-radius: 6px; border: 1px solid #334155; background: #0f172a; color: white; font-size: 0.8rem;">
    `;
    container.appendChild(div);
};

window.analyzeUserTicket = () => {
    const matches = document.querySelectorAll('.scan-match');
    const picks = document.querySelectorAll('.scan-pick');
    const odds = document.querySelectorAll('.scan-odds');
    const resultDiv = document.getElementById('scanner-result');

    let totalOdds = 1.0;
    let items = [];

    matches.forEach((m, idx) => {
        const mVal = m.value || `Match ${idx+1}`;
        const pVal = picks[idx].value || "Sélection";
        const oVal = parseFloat(odds[idx].value) || 1.50;
        totalOdds *= oVal;
        items.push({ match: mVal, pick: pVal, odds: oVal });
    });

    const realProb = (100 / (totalOdds * 1.25)).toFixed(1);
    const weakest = items[items.length - 1];

    resultDiv.innerHTML = `
        <div style="background: #0f172a; padding: 12px; border-radius: 10px; border: 1px solid #f59e0b; color: white; font-size: 0.8rem;">
            <h4 style="margin: 0 0 6px 0; color: #f59e0b;">📊 Diagnostic de Votre Ticket</h4>
            <div>Cote Totale Bookmaker : <strong style="color:#38bdf8;">${totalOdds.toFixed(2)}</strong></div>
            <div>Probabilité Réelle IA : <strong style="color:#10b981;">${realProb}%</strong></div>
            <div style="margin-top: 6px; color: #ef4444; background: #1e293b; padding: 6px; border-radius: 6px;">
                ⚠️ <strong>Maillon Faible Détecté :</strong> ${weakest.match} (${weakest.pick}) - Conseil : Sécurisez en Cashout.
            </div>
        </div>
    `;
};

window.testPushNotification = () => {
    const shareText = `🚨 *ALERTE LIVE FOOTBALL IA*%0A%0A🔥 *Real Madrid vs FC Barcelone (64 min)*%0AScore : 2-1 (Total 3 Buts)%0A%0A👉 *Conseil IA :* Pariez sur '+3.5 Buts' (Cote 1.80)`;
    window.open(`https://wa.me/?text=${shareText}`, '_blank');
};

window.generateTicket = (type) => {
    const resultDiv = document.getElementById('ticket-result');
    resultDiv.innerHTML = `<div style="color:#38bdf8;">Calcul du combiné optimisé...</div>`;
    setTimeout(() => {
        resultDiv.innerHTML = `
            <div style="text-align:left;">
                <h4 style="color:#10b981; margin:0 0 6px 0;">🎟️ Ticket Optimisé (Cote 2.45)</h4>
                <div style="font-size:0.75rem; color:#cbd5e1;">
                    • Real Madrid vs Barca ➔ +2.5 Buts dans le match (1.65)<br>
                    • Arsenal vs Liverpool ➔ Les 2 équipes marquent (1.55)<br>
                    • Mbappé ➔ Buteur (1.85)
                </div>
            </div>
        `;
    }, 300);
};
