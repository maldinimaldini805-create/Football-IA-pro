// =====================================
// FOOTBALL AI PRO 4.0
// AI LEARNING ENGINE
// =====================================

class AILearningEngine {

    constructor() {

        this.history = [];

    }

    savePrediction(prediction, result) {

        this.history.push({

            date: new Date().toISOString(),

            prediction,

            result,

            success: {

                winner:
                    prediction.winner === result.winner,

                score:
                    prediction.scoreExact === result.scoreExact,

                btts:
                    prediction.btts === result.btts

            }

        });

    }

    getStatistics() {

        const total = this.history.length;

        if (total === 0) {

            return {

                total: 0,

                winnerAccuracy: 0,

                scoreAccuracy: 0,

                bttsAccuracy: 0

            };

        }

        const winnerCorrect =
            this.history.filter(h => h.success.winner).length;

        const scoreCorrect =
            this.history.filter(h => h.success.score).length;

        const bttsCorrect =
            this.history.filter(h => h.success.btts).length;

        return {

            total,

            winnerAccuracy:
                Math.round((winnerCorrect / total) * 100),

            scoreAccuracy:
                Math.round((scoreCorrect / total) * 100),

            bttsAccuracy:
                Math.round((bttsCorrect / total) * 100)

        };

    }

}

export default new AILearningEngine();
