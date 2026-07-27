// =====================================
// FOOTBALL AI PRO 2.2
// PREDICTION ENGINE
// =====================================

class PredictionEngine {

    analyser(statsHome, statsAway) {

        const prediction = {

            scoreExact: "0-0",

            miTemps: "0-0",

            confiance: 50,

            premierTirCadre: null,

            premiereTouche: null,

            premierCorner: null,

            premierDegagement: null,

            premiereFaute: null,

            premierCarton: null,

            evenementsRapides: []

        };

        // --------------------------
        // SCORE EXACT
        // --------------------------

        const butsHome = statsHome?.goals?.for?.average?.home || 0;

        const butsAway = statsAway?.goals?.for?.average?.away || 0;

        prediction.scoreExact =
            Math.round(butsHome) +
            "-" +
            Math.round(butsAway);

        // --------------------------
        // MI-TEMPS
        // --------------------------

        prediction.miTemps =
            Math.round(butsHome / 2) +
            "-" +
            Math.round(butsAway / 2);

        // --------------------------
        // CONFIANCE
        // --------------------------

        prediction.confiance = Math.min(
            95,
            50 + Math.abs(butsHome - butsAway) * 10
        );

        return prediction;

    }

}

export default new PredictionEngine();
