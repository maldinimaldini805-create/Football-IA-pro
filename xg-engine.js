// =====================================
// FOOTBALL AI PRO 3.0
// XG ENGINE
// =====================================

class XGEngine {

    calculer(homeXG, awayXG) {

        const difference = homeXG - awayXG;

        let favori = "Équilibré";

        if (difference > 0.30) {
            favori = "Domicile";
        } else if (difference < -0.30) {
            favori = "Extérieur";
        }

        return {

            xGDomicile: homeXG,

            xGExterieur: awayXG,

            difference,

            favori

        };

    }

}

export default new XGEngine();
