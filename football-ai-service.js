// =====================================
// FOOTBALL AI PRO 3.1
// SERVICE
// =====================================

import FootballAIController from "./football-ai-controller.js";

const API_URL =
"https://football-ai-pro-2.maldinimaldini805-4cd.workers.dev";

class FootballAIService {

    async getMatches() {

        try {

            const response = await fetch(API_URL + "/matches");

            if (!response.ok) {
                throw new Error("Impossible de récupérer les matchs.");
            }

            const json = await response.json();

            return json.response || [];

        } catch (e) {

            console.error(e);

            return [];

        }

    }

    async analyserTousLesMatchs() {

        const matchs = await this.getMatches();

        const analyses = [];

        for (const match of matchs) {

            const resultat =
                await FootballAIController.analyser(match, {});

            analyses.push(resultat);

        }

        return analyses;

    }

}

export default new FootballAIService();
