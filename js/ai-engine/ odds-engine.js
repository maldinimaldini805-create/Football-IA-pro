// =====================================
// FOOTBALL AI PRO 3.0
// ODDS ENGINE
// =====================================

class OddsEngine {

    analyser(homeOdd, drawOdd, awayOdd) {

        let favori = "Équilibré";

        const plusPetiteCote = Math.min(homeOdd, drawOdd, awayOdd);

        if (plusPetiteCote === homeOdd) {
            favori = "Domicile";
        } else if (plusPetiteCote === awayOdd) {
            favori = "Extérieur";
        } else {
            favori = "Match nul";
        }

        return {

            coteDomicile: homeOdd,

            coteNul: drawOdd,

            coteExterieur: awayOdd,

            favori

        };

    }

}

export default new OddsEngine();
