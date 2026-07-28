// =====================================
// FOOTBALL AI PRO 3.2
// APP.JS
// =====================================

import footballAIService from "./football-ai-service.js";

async function startFootballAI() {

    console.log("⚽ Football AI Pro 3.2");

    try {

        const analyses =
            await footballAIService.analyzeTodayMatches();

        console.log("Analyses :", analyses);

        return analyses;

    }

    catch (error) {

        console.error(
            "Erreur Football AI :",
            error
        );

        return [];

    }

}

startFootballAI();

export default startFootballAI;
