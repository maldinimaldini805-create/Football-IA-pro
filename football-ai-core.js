// =====================================
// FOOTBALL AI PRO 2.2
// FOOTBALL AI CORE
// =====================================

import { chargerEquipe } from "./data-engine.js";
import PredictionEngine from "./prediction-engine.js";
import LivePredictionEngine from "./live-prediction-engine.js";

class FootballAICore {

    async analyserMatch(teamHome, teamAway) {

        console.log("Analyse du match...");

        const statsHome = await chargerEquipe(teamHome);
        const statsAway = await chargerEquipe(teamAway);

        const prediction = PredictionEngine.analyser(
            statsHome,
            statsAway
        );

        const livePrediction = LivePredictionEngine.analyser(
            statsHome,
            statsAway
        );

        return {

            equipeDomicile: statsHome,

            equipeExterieure: statsAway,

            prediction,

            livePrediction

        };

    }

}

export default new FootballAICore();
