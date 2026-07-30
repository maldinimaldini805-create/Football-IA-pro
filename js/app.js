// js/app.js
import aiOrchestrator from './ai-engine/ai-orchestrator.js';

// Base de données des divisions par pays
const divisionsData = {
    "ENG": ["Premier League (D1)", "Championship (D2)", "League One (D3)", "League Two (D4)", "National League (D5)", "FA Cup / League Cup"],
    "ESP": ["La Liga (D1)", "La Liga 2 / Segunda (D2)", "Primera RFEF (D3)", "Copa del Rey"],
    "ITA": ["Serie A (D1)", "Serie B (D2)", "Serie C - Groupe A/B/C (D3)", "Coppa Italia"],
    "FRA": ["Ligue 1 (D1)", "Ligue 2 (D2)", "National 1 (D3)", "Coupe de France"],
    "POR": ["Liga Portugal / Primeira (D1)", "Liga Portugal 2 (D2)", "Taça de Portugal"],
    "NED": ["Eredivisie (D1)", "Eerste Divisie (D2)", "KNVB Beker"],
    "GER": ["Bundesliga (D1)", "2. Bundesliga (D2)", "3. Liga (D3)", "DFB Pokal"],
    "BEL": ["Jupiler Pro League (D1)", "Challenger Pro League (D2)"],
    "BRA": ["Série A (D1)", "Série B (D2)", "Copa do Brasil"],
    "ARG": ["Liga Profesional (D1)", "Primera Nacional (D2)"],
    "AFR": ["CAF Champions League", "Coupe de la Confédération", "Ligue 1 Côte d'Ivoire", "Botola Pro Maroc", "Ligue 1 Sénégal"],
    "INT": ["UEFA Champions League", "UEFA Europa League", "UEFA Conference League", "Éliminatoires Coupe du Monde"]
};

// Base de matchs exemple couvrant de nombreuses divisions mondiales
const mockMatches = [
    // 🇬🇧 ANGLETERRE
    { id: 101, country: "ENG", league: "Premier League (D1)", home: "Arsenal", away: "Liverpool", confidence: 82, status: "NS" },
    { id: 102, country: "ENG", league: "Championship (D2)", home: "Leicester City", away: "Leeds United", confidence: 78, status: "NS" },
    { id: 103, country: "ENG", league: "League One (D3)", home: "Bolton", away: "Portsmouth", confidence: 75, status: "NS" },

    // 🇪🇸 ESPAGNE
    { id: 104, country: "ESP", league: "La Liga (D1)", home: "Real Madrid", away: "FC Barcelone", confidence: 89, status: "LIVE", homeScore: 2, awayScore: 1, elapsed: 68 },
    { id: 105, country: "ESP", league: "La Liga 2 / Segunda (D2)", home: "Espanyol", away: "Real Zaragoza", confidence: 76, status: "NS" },

    // 🇮🇹 ITALIE
    { id: 106, country: "ITA", league: "Serie A (D1)", home: "Inter Milan", away: "Juventus", confidence: 84, status: "NS" },
    { id: 107, country: "ITA", league: "Serie B (D2)", home: "Parma", away: "Palermo", confidence: 74, status: "NS" },
    { id: 108, country: "ITA", league: "Serie C - Groupe A/B/C (D3)", home: "Cesena", away: "Torres", confidence: 71, status: "NS" },

    // 🇫🇷 FRANCE
    { id: 109, country: "FRA", league: "Ligue 1 (D1)", home: "PSG", away: "Marseille", confidence: 86, status: "NS" },
    { id: 110, country: "FRA", league: "Ligue 2 (D2)", home: "Auxerre", away: "Saint-Étienne", confidence: 77, status: "NS" },
    { id: 111, country: "FRA", league: "National 1 (D3)", home: "Red Star", away: "Niort", confidence: 72, status: "NS" },

    // 🇵🇹 PORTUGAL
    { id: 112, country: "POR", league: "Liga Portugal / Primeira (D1)", home: "Benfica", away: "Sporting CP", confidence: 85, status: "NS" },
    { id: 113, country: "POR", league: "Liga Portugal 2 (D2)", home: "Santa Clara", away: "AVS", confidence: 73, status: "NS" },

    // 🇳🇱 PAYS-BAS
    { id: 114, country: "NED", league: "Eredivisie (D1)", home: "PSV Eindhoven", away: "Ajax", confidence: 83, status: "NS" },
    { id: 115, country: "NED", league: "Eerste Divisie (D2)", home: "Willem II", away: "Roda JC", confidence: 75, status: "NS" },

    // 🌍 AFRIQUE
    { id: 116, country: "AFR", league: "CAF Champions League", home: "Al Ahly", away: "Mamelodi Sundowns", confidence: 80, status: "NS" },
    { id: 117, country: "AFR", league: "Ligue 1 Côte d'Ivoire", home: "ASEC Mimosas", away: "Stella Club", confidence: 76, status: "NS" }
];

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('matches-container');
    const countrySelect = document.getElementById('country-select');
    const divisionSelect = document.getElementById('division-select');
    const searchInput = document.getElementById('search-input');
    const totalMatchesElem = document.getElementById('total-matches');

    if (!container) return;

    // Mise à jour de la liste des divisions en fonction du pays
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

    // Affichage des matchs filtrés
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
            totalMatchesElem.textContent = `${filtered.length} Match(s) prêt(s) pour analyse IA`;
        }

        container.innerHTML = '';

        if (filtered.length === 0) {
            container.innerHTML = `<div style="text-align: center; color: #94a3b8; padding: 35px 10px;">🔍 Aucun match trouvé pour ces filtres.</div>`;
            return;
        }

        filtered.forEach(match => {
            const isLive = match.status === "LIVE";
            const isPepite = match.confidence >= 85;

            const card = document.createElement('div');
            card.style.cssText = "background: #1e293b; border-radius: 12px; padding: 15px; margin-bottom: 15px; border: 1px solid #334155; color: white;";

            card.innerHTML = `
                ${isPepite ? `<div style="background: linear-gradient(135deg, #f59e0b, #dc2626); color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.7rem; font-weight: bold; display: inline-block; margin-bottom: 6px;">🔥 TOP CONFIANCE (${match.confidence}%)</div>` : ''}
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <span style="font-size: 0.8rem; color: #38bdf8; font-weight: bold;">🏆 ${match.league}</span>
                    ${isLive ? `<span style="background: #ef4444; color: white; padding: 2px 6px; border-radius: 10px; font-size: 0.7rem; font-weight: bold;">🔴 LIVE ${match.elapsed}' [${match.homeScore}-${match.awayScore}]</span>` : `<span style="color: #94a3b8; font-size: 0.75rem;">📅 Programme</span>`}
                </div>

                <div style="font-size: 1.05rem; font-weight: bold; text-align: center; margin: 8px 0;">
                    ${match.home} <span style="color: #38bdf8;">vs</span> ${match.away}
                </div>

                <div style="display: flex; gap: 8px; margin-top: 10px;">
                    <button onclick="runMonteCarloSimulation('${match.home}', '${match.away}', ${match.id})" 
                            style="width: 100%; padding: 8px; background: #2563eb; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 0.8rem;">
                        🎲 Analyser ce match (${match.league})
                    </button>
                </div>

                <div id="prediction-${match.id}"></div>
            `;

            container.appendChild(card);
        });
    }

    // Événements de changement des filtres
    countrySelect.addEventListener('change', (e) => {
        updateDivisionOptions(e.target.value);
        renderMatches();
    });

    divisionSelect.addEventListener('change', renderMatches);
    searchInput.addEventListener('input', renderMatches);

    // Chargement initial
    renderMatches();
});

// Simulation Monte-Carlo
window.runMonteCarloSimulation = (home, away, matchId) => {
    const targetDiv = document.getElementById(`prediction-${matchId}`);
    if (!targetDiv) return;

    targetDiv.innerHTML = `<div style="color: #38bdf8; font-size: 0.8rem; text-align: center; margin-top: 8px;">🎲 Simulation 10 000 matchs en cours...</div>`;

    setTimeout(() => {
        targetDiv.innerHTML = `
            <div style="background: #0f172a; padding: 10px; border-radius: 8px; border: 1px solid #10b981; font-size: 0.8rem; margin-top: 10px; color: #cbd5e1;">
                <h4 style="margin: 0 0 6px 0; color: #10b981;">📊 Résultat IA (${home} vs ${away})</h4>
                <div>🏠 Victoire ${home} : <strong style="color:#10b981;">52.4%</strong></div>
                <div>🤝 Match Nul : <strong style="color:#f59e0b;">24.1%</strong></div>
                <div>🚀 Victoire ${away} : <strong style="color:#ef4444;">23.5%</strong></div>
                <div style="margin-top: 5px; color: #38bdf8;">📌 Option conseillée : <strong>Plus de 1.5 Buts</strong></div>
            </div>
        `;
    }, 350);
};

// Générateur de combinés
window.generateTicket = (type) => {
    const resultDiv = document.getElementById('ticket-result');
    resultDiv.innerHTML = `<div style="color: #38bdf8;">⚡ Assemblage du ticket multiligues...</div>`;

    setTimeout(() => {
        let title = "🛡️ Combiné Sécurisé (Multi-Divisions)";
        let totalOdds = "2.10";
        let picks = [
            { match: "Arsenal vs Liverpool (Premier League)", pick: "Plus de 1.5 Buts", odds: "1.22" },
            { match: "Real Madrid vs Barcelone (La Liga)", pick: "Real Madrid ou Nul", odds: "1.28" },
            { match: "Auxerre vs St-Étienne (Ligue 2)", pick: "Plus de 0.5 But en 1ère mi-temps", odds: "1.34" }
        ];

        if (type === 'risk') {
            title = "🚀 Combiné Jackpot (D2/D3 & Pépites)";
            totalOdds = "9.40";
            picks = [
                { match: "Leicester vs Leeds (Championship D2)", pick: "Les 2 équipes marquent", odds: "1.72" },
                { match: "Cesena vs Torres (Serie C D3)", pick: "Victoire Cesena", odds: "2.10" },
                { match: "Benfica vs Sporting (Liga Portugal)", pick: "Plus de 2.5 Buts", odds: "1.85" },
                { match: "Al Ahly vs Sundowns (CAF CL)", pick: "Victoire Al Ahly", odds: "1.40" }
            ];
        }

        let html = `<div style="text-align: left;"><h4 style="margin: 0 0 8px 0; color: #10b981;">${title} (Cote: ${totalOdds})</h4>`;
        let shareText = `⚽ *FOOTBALL IA - TICKET MULTILIGUES*%0A*Cote: ${totalOdds}*%0A%0A`;

        picks.forEach(p => {
            html += `<div style="background: #1e293b; padding: 6px 10px; border-radius: 6px; margin-bottom: 5px; font-size: 0.78rem;">
                        <strong>${p.match}</strong><br><span style="color: #38bdf8;">📌 ${p.pick}</span> (Cote: ${p.odds})
                     </div>`;
            shareText += `• ${p.match} ➔ ${p.pick} (${p.odds})%0A`;
        });

        html += `<a href="https://wa.me/?text=${shareText}" target="_blank" 
                    style="display: block; width: 100%; text-align: center; margin-top: 10px; padding: 8px; background: #25D366; color: white; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 0.8rem; box-sizing: border-box;">
                    📲 Partager sur WhatsApp
                 </a></div>`;

        resultDiv.innerHTML = html;
    }, 300);
};
