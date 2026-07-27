// =====================================
// FOOTBALL AI PRO 3.0
// ELO ENGINE
// =====================================

class EloEngine {

    calculer(homeRating, awayRating) {

        const difference = homeRating - awayRating;

        const probabiliteDomicile =
            1 / (1 + Math.pow(10, -difference / 400));

        const probabiliteExterieur =
            1 - probabiliteDomicile;

        return {

            eloDomicile: homeRating,

            eloExterieur: awayRating,

            probabiliteVictoireDomicile:
                Math.round(probabiliteDomicile * 100),

            probabiliteVictoireExterieur:
                Math.round(probabiliteExterieur * 100)

        };

    }

}

export default new EloEngine();
