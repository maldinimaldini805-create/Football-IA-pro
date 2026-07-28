// =====================================
// FOOTBALL AI PRO 3.1
// LIVE ENGINE
// =====================================

import footballAIService from "./football-ai-service.js";

class Live {

    async actualiser() {

        try {

            const analyses =
                await footballAIService.analyzeTodayMatches();

            return analyses.map(analyse => ({

                data: {

                    match: analyse.match,

                    prediction: analyse.prediction

                }

            }));

        }

        catch (error) {

            console.error(
                "Live Engine :",
                error
            );

            return [];

        }

    }

}

export default new Live();
