// =====================================
// FOOTBALL AI PRO 3.0
// REFEREE ENGINE
// =====================================

class RefereeEngine {

    analyser(arbitre = {}) {

        const cartonsJaunes = arbitre.yellowCardsPerMatch || 0;

        const cartonsRouges = arbitre.redCardsPerMatch || 0;

        const penalties = arbitre.penaltiesPerMatch || 0;

        const fautes = arbitre.foulsPerMatch || 0;

        let niveauDiscipline = "Normal";

        if (cartonsJaunes >= 5) {
            niveauDiscipline = "Très sévère";
        } else if (cartonsJaunes >= 4) {
            niveauDiscipline = "Sévère";
        } else if (cartonsJaunes <= 2) {
            niveauDiscipline = "Tolérant";
        }

        return {

            cartonsJaunes,

            cartonsRouges,

            penalties,

            fautes,

            niveauDiscipline

        };

    }

}

export default new RefereeEngine();
