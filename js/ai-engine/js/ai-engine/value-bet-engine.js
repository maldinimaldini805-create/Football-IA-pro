// =====================================
// FOOTBALL AI PRO 3.3
// VALUE BET ENGINE
// =====================================

class ValueBetEngine {

    analyze(prediction, odds = {}) {

        const homeOdd =
            odds.home || 2.00;

        const drawOdd =
            odds.draw || 3.20;

        const awayOdd =
            odds.away || 3.50;

        const homeProbability =
            prediction.details.elo.probabilities.home;

        const drawProbability =
            prediction.details.elo.probabilities.draw;

        const awayProbability =
            prediction.details.elo.probabilities.away;

        const homeValue =
            (homeProbability / 100) * homeOdd;

        const drawValue =
            (drawProbability / 100) * drawOdd;

        const awayValue =
            (awayProbability / 100) * awayOdd;

        const values = [

            {
                market: "Victoire Domicile",
                value: homeValue,
                probability: homeProbability,
                odd: homeOdd
            },

            {
                market: "Match Nul",
                value: drawValue,
                probability: drawProbability,
                odd: drawOdd
            },

            {
                market: "Victoire Extérieur",
                value: awayValue,
                probability: awayProbability,
                odd: awayOdd
            }

        ];

        values.sort((a, b) => b.value - a.value);

        const best = values[0];

        return {

            bestMarket: best.market,

            probability: best.probability,

            odd: best.odd,

            value: Number(best.value.toFixed(2)),

            recommendation:
                best.value > 1
                    ? "VALUE BET"
                    : "NO VALUE",

            confidence:
                Math.min(
                    99,
                    Math.round(best.probability)
                )

        };

    }

}

export default new ValueBetEngine();
