// =====================================
// FOOTBALL AI PRO 3.1
// MAIN CONTROLLER
// =====================================

import AIOrchestrator from "./ai-orchestrator.js";

class FootballAIController {

    async analyser(match, data) {

        try {

            const resultat = await AIOrchestrator.analyser(
                match,
                data
            );

            return {
                success: true,
                data: resultat
            };

        } catch (erreur) {

            console.error(erreur);

            return {
                success: false,
                error: erreur.message
            };

        }

    }

}

export default new FootballAIController();
