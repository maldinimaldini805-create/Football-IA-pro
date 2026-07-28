// =====================================
// FOOTBALL AI PRO 3.0
// APP.JS
// =====================================

import SuperAIEngine from "./super-ai-engine.js";

async function analyserMatch() {

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

    console.log(prediction);

    return prediction;

}

analyserMatch();

export default analyserMatch;
