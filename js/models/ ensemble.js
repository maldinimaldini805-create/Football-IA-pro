// =====================================
// FOOTBALL AI PRO 3.2
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
            xg.totalXG >= 2.5 ? 75 : 45;

        const btts =
            (goals.homeGoals > 0 &&
             goals.awayGoals > 0)
                ? 80
                : 40;

        const confidence = Math.min(

            95,

            Math.round(

                (

                    over25 +

                    btts +

                    cards.confidence

                ) / 3

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

            cards

        };

    }

}

export default new EnsembleModel();
