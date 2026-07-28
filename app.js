// =====================================
// FOOTBALL AI PRO 3.1
// APP.JS
// =====================================

import SuperAIEngine from "./super-ai-engine.js";
import MatchAnalyzer from "./match-analyzer.js";

const API_URL = "https://football-ai-pro-2.maldinimaldini805-4cd.workers.dev";

// =====================================
// CHARGER LES MATCHS
// =====================================

async function chargerMatchs() {

    try {

        const response = await fetch(API_URL + "/matches");

        if (!response.ok) {
            throw new Error("Impossible de récupérer les matchs.");
        }

        const json = await response.json();

        return json.response || [];

    } catch (e) {

        console.error("Erreur :", e);

        return [];

    }

}

// =====================================
// ANALYSE DES MATCHS
// =====================================

async function analyserMatch() {

    const matchs = await chargerMatchs();

    if (matchs.length === 0) {

        console.log("Aucun match disponible.");

        return [];

    }

    const resultats = [];

    for (const match of matchs) {

        const infos = MatchAnalyzer.analyser(match);

        const data = {

            homeAttack: 2.1,
            awayAttack: 1.4,

            homeElo: 1850,
            awayElo: 1785,

            homeXG: 2.05,
            awayXG: 1.12,

            homeOdd: 1.85,
            drawOdd: 3.45,
            awayOdd: 4.10,

            lastMatchesHome: [],
            h2hMatches: [],

            injuries: [],

            lineup: [],
            bench: [],

            weather: "Soleil",

            referee: {},

            homeStats: {
                attaque: 82,
                possession: 60,
                corners: 7,
                degagements: 18,
                fautes: 10,
                cartons: 2,
                xG: 2.05
            },

            awayStats: {
                attaque: 70,
                possession: 40,
                corners: 4,
                degagements: 22,
                fautes: 13,
                cartons: 3,
                xG: 1.12
            }

        };

        const prediction = SuperAIEngine.analyser(data);

        resultats.push({

            match: infos,

            prediction

        });

    }

    console.log(resultats);

    return resultats;

}

analyserMatch();

export default analyserMatch;
