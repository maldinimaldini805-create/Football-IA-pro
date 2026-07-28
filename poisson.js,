// =====================================
// FOOTBALL AI PRO 3.2
// POISSON MODEL
// =====================================

class PoissonModel {

    calculate(home, away) {

        const homeGoals =
            Math.max(
                0,
                Math.round(
                    (home.attack.goals + away.defense.goalsConceded) / 2
                )
            );

        const awayGoals =
            Math.max(
                0,
                Math.round(
                    (away.attack.goals + home.defense.goalsConceded) / 2
                )
            );

        return {

            homeGoals,

            awayGoals,

            score: `${homeGoals}-${awayGoals}`

        };

    }

}

export default new PoissonModel();
