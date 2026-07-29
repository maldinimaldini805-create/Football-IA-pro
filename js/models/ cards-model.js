// =====================================
// FOOTBALL AI PRO 4.1
// CARDS MODEL
// =====================================

class CardsModel {

    calculate(home, away, referee = null) {

        const homeFouls =
            home.fouls ?? 12;

        const awayFouls =
            away.fouls ?? 12;

        const homeYellow =
            home.yellowCards ?? 2;

        const awayYellow =
            away.yellowCards ?? 2;

        const refereeLevel =
            referee?.strictness ?? 1;

        const totalFouls =
            homeFouls + awayFouls;

        const yellowCards =
            Math.round(
                (homeYellow + awayYellow) *
                refereeLevel
            );

        const redCardProbability =
            Math.min(
                100,
                Math.round(
                    (totalFouls / 30) * 100
                )
            );

        const firstCard =

            homeFouls >= awayFouls

                ? home.name

                : away.name;

        return {

            homeYellow,

            awayYellow,

            yellowCards,

            totalFouls,

            redCardProbability,

            firstCard,

            confidence:

                Math.min(
                    95,
                    65 + Math.round(totalFouls / 3)
                )

        };

    }

}

export default new CardsModel();
