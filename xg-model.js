// =====================================
// FOOTBALL AI PRO 3.2
// XG MODEL
// =====================================

class XGModel {

    calculate(home, away) {

        const homeXG =
            Number((
                (home.attack.shotsOnTarget * 0.30) +
                (home.attack.goals * 0.70)
            ).toFixed(2));

        const awayXG =
            Number((
                (away.attack.shotsOnTarget * 0.30) +
                (away.attack.goals * 0.70)
            ).toFixed(2));

        return {

            homeXG,

            awayXG,

            totalXG:
                Number((homeXG + awayXG).toFixed(2))

        };

    }

}

export default new XGModel();
