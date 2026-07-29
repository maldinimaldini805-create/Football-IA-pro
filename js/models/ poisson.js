// =====================================
// FOOTBALL AI PRO 4.1
// POISSON MODEL
// =====================================

class PoissonModel {

    calculate(home, away) {

        const homeAttack =
            home.attack?.goals ?? 0;

        const awayAttack =
            away.attack?.goals ?? 0;

        const homeDefense =
            home.defense?.goalsConceded ?? 0;

        const awayDefense =
            away.defense?.goalsConceded ?? 0;

        const homeGoals =
            Math.max(
                0,
                Math.round(
                    (homeAttack + awayDefense) / 2
                )
            );

        const awayGoals =
            Math.max(
                0,
                Math.round(
                    (awayAttack + homeDefense) / 2
                )
            );

        return {

            homeGoals,

            awayGoals,

            score: `${homeGoals}-${awayGoals}`,

            totalGoals:
                homeGoals + awayGoals,

            over25:
                homeGoals + awayGoals > 2,

            btts:
                homeGoals > 0 &&
                awayGoals > 0

        };

    }

}

export default new PoissonModel();
