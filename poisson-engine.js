// =====================================
// FOOTBALL AI PRO 3.0
// POISSON ENGINE
// =====================================

class PoissonEngine {

    calculer(homeAttack, awayAttack) {

        const homeGoals = Math.round(homeAttack);

        const awayGoals = Math.round(awayAttack);

        return {

            scoreExact: homeGoals + "-" + awayGoals,

            domicile: homeGoals,

            exterieur: awayGoals

        };

    }

}

export default new PoissonEngine();
