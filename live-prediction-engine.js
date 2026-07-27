// =====================================
// FOOTBALL AI PRO 2.2
// LIVE PREDICTION ENGINE
// =====================================

class LivePredictionEngine {

    analyser(statsHome, statsAway) {

        return {

            premierTirCadre:
                statsHome.possession > statsAway.possession
                    ? "Domicile"
                    : "Extérieur",

            premiereTouche:
                statsHome.attacks > statsAway.attacks
                    ? "Domicile"
                    : "Extérieur",

            premierCorner:
                statsHome.corners > statsAway.corners
                    ? "Domicile"
                    : "Extérieur",

            premierDegagement:
                statsHome.clearances > statsAway.clearances
                    ? "Domicile"
                    : "Extérieur",

            premiereFaute:
                statsHome.fouls > statsAway.fouls
                    ? "Domicile"
                    : "Extérieur",

            premierCarton:
                statsHome.cards > statsAway.cards
                    ? "Domicile"
                    : "Extérieur"

        };

    }

}

export default new LivePredictionEngine();
