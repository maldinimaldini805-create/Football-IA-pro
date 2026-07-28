// =====================================
// FOOTBALL AI PRO 4.0
// VALUE BET ENGINE
// =====================================

class ValueBetEngine {

    analyze(prediction, odds = {}) {

        const homeOdd =
            odds.home || 2.00;

        const drawOdd =
            odds.draw || 3.20;

        const awayOdd =
            odds.away || 3.80;

        const probability =
            prediction.confiance || 70;

        const values = [];

        if (prediction.winner === "HOME") {

            values.push({

                market: "Victoire domicile",

                odd: homeOdd,

                confidence: probability,

                value:
                    probability > (100 / homeOdd)

            });

        }

        if (prediction.winner === "DRAW") {

            values.push({

                market: "Match nul",

                odd: drawOdd,

                confidence: probability,

                value:
                    probability > (100 / drawOdd)

            });

        }

        if (prediction.winner === "AWAY") {

            values.push({

                market: "Victoire extérieur",

                odd: awayOdd,

                confidence: probability,

                value:
                    probability > (100 / awayOdd)

            });

        }

        return {

            total:
                values.length,

            valueBets:
                values

        };

    }

}

export default new ValueBetEngine();
