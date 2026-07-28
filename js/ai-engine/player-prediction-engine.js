// =====================================
// FOOTBALL AI PRO 3.3
// PLAYER PREDICTION ENGINE
// =====================================

class PlayerPredictionEngine {

    analyze(players = []) {

        if (!players.length) {

            return {

                topScorer: null,
                firstScorer: null,
                assistLeader: null,
                manOfTheMatch: null,
                predictions: []

            };

        }

        const predictions = players.map(player => {

            const goals =
                player.goals || 0;

            const assists =
                player.assists || 0;

            const shots =
                player.shotsOnTarget || 0;

            const rating =
                player.rating || 6.5;

            const scorerProbability =
                Math.min(
                    95,
                    Math.round(
                        goals * 12 +
                        shots * 8 +
                        rating * 5
                    )
                );

            const assistProbability =
                Math.min(
                    95,
                    Math.round(
                        assists * 15 +
                        rating * 5
                    )
                );

            return {

                name: player.name,

                team: player.team,

                scorerProbability,

                assistProbability,

                shotsOnTargetPrediction:
                    Math.max(
                        1,
                        Math.round(shots)
                    ),

                expectedGoals:
                    (goals * 0.35).toFixed(2),

                expectedAssists:
                    (assists * 0.40).toFixed(2),

                rating

            };

        });

        predictions.sort(
            (a, b) =>
                b.scorerProbability -
                a.scorerProbability
        );

        return {

            topScorer:
                predictions[0],

            firstScorer:
                predictions[0],

            assistLeader:
                [...predictions].sort(
                    (a, b) =>
                        b.assistProbability -
                        a.assistProbability
                )[0],

            manOfTheMatch:
                [...predictions].sort(
                    (a, b) =>
                        b.rating -
                        a.rating
                )[0],

            predictions

        };

    }

}

export default new PlayerPredictionEngine();
