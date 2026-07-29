// =====================================
// FOOTBALL AI PRO 4.1
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

        const winner =
            elo.winner;

        const over25 =

            xg.totalXG >= 2.5

                ? 75

                : 45;

        const btts =

            goals.btts

                ? 80

                : 40;

        const confidence =

            Math.min(

                95,

                Math.round(

                    (

                        over25 +

                        btts +

                        cards.confidence +

                        elo.expectedHomeWin

                    ) / 4

                )

            );

        return {

            winner,

            score:
                goals.score,

            over25,

            btts,

            confidence,

            xg,

            corners,

            cards,

            elo,

            goals

        };

    }

}

export default new EnsembleModel();
