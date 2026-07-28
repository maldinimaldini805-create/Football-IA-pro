// =====================================
// FOOTBALL AI PRO 4.0
// FOOTBALL AI CORE
// =====================================

import predictionEngine from "./ai-engine/prediction-engine.js";
import playerPredictionEngine from "./ai-engine/player-prediction-engine.js";
import smartBetBuilder from "./ai-engine/smart-bet-builder.js";
import valueBetEngine from "./ai-engine/value-bet-engine.js";

class FootballAICore {

    async analyze(matchData) {

        const prediction =
            await predictionEngine.predict(matchData);

        const players =
            playerPredictionEngine.analyze(
                matchData.players || []
            );

        const bets =
            smartBetBuilder.generate(
                prediction
            );

        const value =
            valueBetEngine.analyze(
                prediction,
                matchData.odds || {}
            );

        return {

            prediction,

            players,

            bets,

            value,

            generatedAt:
                new Date().toISOString()

        };

    }

}

export default new FootballAICore();
