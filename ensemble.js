// =====================================
// FOOTBALL AI PRO 3.1
// ENSEMBLE MODEL
// =====================================

class EnsembleModel {

    combine(models) {

        const {

            goals,
            elo,
            xg,
            corners,
            cards

        } = models;


        const homeWin =
            elo.probabilities.home;

        const draw =
            elo.probabilities.draw;

        const awayWin =
            elo.probabilities.away;


        let winner = "DRAW";

        if (homeWin > awayWin && homeWin > draw) {

            winner = "HOME";

        }

        else if (awayWin > homeWin && awayWin > draw) {

            winner = "AWAY";

        }


        const confidence = Math.round(

            (

                homeWin +

                goals.over25 +

                goals.btts +

                (xg.total * 10)

            ) / 4

        );


        return {

            winner,

            score:
                goals.score,

            over25:
                goals.over25,

            btts:
                goals.btts,

            confidence:

                Math.min(
                    confidence,
                    99
                ),

            xg,

            corners,

            cards

        };

    }

}

export default new EnsembleModel();
