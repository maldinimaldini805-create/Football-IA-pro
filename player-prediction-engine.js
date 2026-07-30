// =====================================
// FOOTBALL AI PRO 4.0
// PLAYER PREDICTION ENGINE
// =====================================

class PlayerPredictionEngine {

    analyze(players = []) {

        if (!Array.isArray(players) || players.length === 0) {

            return {

                probableScorer: null,

                probableAssist: null,

                topPlayers: [],

                confidence: 0

            };

        }

        const scorer = [...players].sort(
            (a, b) => (b.goals || 0) - (a.goals || 0)
        )[0];

        const assister = [...players].sort(
            (a, b) => (b.assists || 0) - (a.assists || 0)
        )[0];

        const topPlayers = [...players]
            .sort((a, b) => {

                const scoreA =
                    (a.goals || 0) * 2 +
                    (a.assists || 0);

                const scoreB =
                    (b.goals || 0) * 2 +
                    (b.assists || 0);

                return scoreB - scoreA;

            })
            .slice(0, 5);

        return {

            probableScorer: scorer
                ? {
                      name: scorer.name,
                      goals: scorer.goals || 0,
                      team: scorer.team || ""
                  }
                : null,

            probableAssist: assister
                ? {
                      name: assister.name,
                      assists: assister.assists || 0,
                      team: assister.team || ""
                  }
                : null,

            topPlayers,

            confidence: 85

        };

    }

}

export default new PlayerPredictionEngine();
