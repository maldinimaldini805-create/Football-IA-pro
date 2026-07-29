// =====================================
// FOOTBALL AI PRO 4.1
// PREDICTION ENGINE
// =====================================

import poisson from "../models/poisson.js";
import elo from "../models/elo.js";
import xgModel from "../models/xg-model.js";
import cornerModel from "../models/corner-model.js";
import cardsModel from "../models/cards-model.js";
import ensemble from "../models/ensemble.js";

class PredictionEngine {

    async predict(matchData) {

        const {
            home,
            away,
            context = {}
        } = matchData;

        const goalsPrediction =
            poisson.calculate(home, away);

        const eloPrediction =
            elo.calculate(home, away);

        const xgPrediction =
            xgModel.calculate(home, away);

        const cornersPrediction =
            cornerModel.calculate(home, away);

        const cardsPrediction =
            cardsModel.calculate(
                home,
                away,
                context.referee
            );

        const finalPrediction =
            ensemble.combine({

                goals: goalsPrediction,

                elo: eloPrediction,

                xg: xgPrediction,

                corners: cornersPrediction,

                cards: cardsPrediction

            });

        return {

            match: {

                home: home.name,

                away: away.name

            },

            scoreExact:
                goalsPrediction.score,

            scoreMiTemps:
                "0 - 0",

            winner:
                eloPrediction.winner,

            confiance:
                finalPrediction.confidence,

            confidence:
                finalPrediction.confidence,

            btts:
                finalPrediction.btts,

            over25:
                finalPrediction.over25,

            corners:
                cornersPrediction.totalCorners,

            cartons:
                cardsPrediction.yellowCards,

            fautes:
                cardsPrediction.totalFouls,

            events: {

                premierCorner:
                    cornersPrediction.homeCorners >
                    cornersPrediction.awayCorners
                        ? home.name
                        : away.name,

                premierCarton:
                    "À déterminer",

                premiereFaute:
                    "À déterminer",

                premierTirCadre:
                    xgPrediction.homeXG >
                    xgPrediction.awayXG
                        ? home.name
                        : away.name,

                premiereTouche:
                    home.name

            },

            details: {

                poisson:
                    goalsPrediction,

                elo:
                    eloPrediction,

                xg:
                    xgPrediction,

                corners:
                    cornersPrediction,

                cards:
                    cardsPrediction

            }

        };

    }

    async livePrediction(liveData) {

        return await this.predict({

            home: liveData.home,

            away: liveData.away,

            context: {

                minute: liveData.minute,

                score: liveData.score,

                referee: liveData.referee

            }

        });

    }

}

export default new PredictionEngine();
