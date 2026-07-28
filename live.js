// =====================================
// FOOTBALL AI PRO 3.2
// LIVE ENGINE
// =====================================

import footballAIService from "./football-ai-service.js";

class Live {

    async actualiser() {

        try {

            const analyses =
                await footballAIService.analyzeTodayMatches();

            if (!analyses || analyses.length === 0) {

                console.warn("Aucune analyse disponible.");

                return [];

            }

            return analyses.map(analyse => ({

                data: {

                    fixtureId:
                        analyse.fixtureId,

                    league:
                        analyse.league,

                    date:
                        analyse.date,

                    match:
                        analyse.match,

                    prediction:
                        analyse.prediction

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
