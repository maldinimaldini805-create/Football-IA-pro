// =====================================
// FOOTBALL AI PRO 4.2
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

        const { home, away, context = {} } = matchData;

        const goals =
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

        return ensemble.combine({

            goals,

            elo: eloPrediction,

            xg: xgPrediction,

            corners: cornersPrediction,

            cards: cardsPrediction

        });

    }

}

export default new PredictionEngine();
