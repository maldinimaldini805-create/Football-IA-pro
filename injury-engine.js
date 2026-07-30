// =====================================
// FOOTBALL AI PRO 3.0
// INJURY ENGINE
// =====================================

class InjuryEngine {

    analyser(blesses = []) {

        let joueursAbsents = blesses.length;

        let impact = 0;

        for (const joueur of blesses) {

            switch (joueur.importance) {

                case "Élevée":
                    impact += 10;
                    break;

                case "Moyenne":
                    impact += 5;
                    break;

                default:
                    impact += 2;

            }

        }

        return {

            joueursAbsents,

            impact,

            listeBlesses: blesses

        };

    }

}

export default new InjuryEngine();
