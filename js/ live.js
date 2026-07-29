// =====================================
// FOOTBALL AI PRO 4.0
// LIVE.JS
// =====================================

import footballAIService from "./services/football-ai-service.js";

class LiveEngine {

    async refresh() {

        try {

            const analyses =
                await footballAIService.analyzeTodayMatches();

            return analyses;

        }

        catch (error) {

            console.error(

                "Erreur Live :", error

            );

            return [];

        }

    }

    start(interval = 60000) {

        this.refresh();

        setInterval(() => {

            this.refresh();

        }, interval);

    }

}

const liveEngine = new LiveEngine();

export default liveEngine;
