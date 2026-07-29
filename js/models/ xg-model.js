// =====================================
// FOOTBALL AI PRO 4.1
// XG MODEL
// =====================================

class XGModel {

    calculate(home, away) {

        const homeShots =
            home.attack?.shots ?? 0;

        const awayShots =
            away.attack?.shots ?? 0;

        const homeShotsOnTarget =
            home.attack?.shotsOnTarget ?? 0;

        const awayShotsOnTarget =
            away.attack?.shotsOnTarget ?? 0;

        const homeXG =
            Number(
                (
                    (homeShots * 0.08) +
                    (homeShotsOnTarget * 0.22)
                ).toFixed(2)
            );

        const awayXG =
            Number(
                (
                    (awayShots * 0.08) +
                    (awayShotsOnTarget * 0.22)
                ).toFixed(2)
            );

        return {

            homeXG,

            awayXG,

            totalXG:
                Number(
                    (homeXG + awayXG).toFixed(2)
                ),

            favorite:

                homeXG > awayXG

                    ? home.name

                    : awayXG > homeXG

                    ? away.name

                    : "Équilibré"

        };

    }

}

export default new XGModel();
