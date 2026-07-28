// =====================================
// FOOTBALL AI PRO 4.0
// APP.JS
// =====================================

import footballAIService from "./services/football-ai-service.js";

class FootballAIApp {

    async start() {

        console.log("⚽ Football AI Pro 4.0");
        console.log("Initialisation...");

        try {

            const analyses =
                await footballAIService.analyzeTodayMatches();

            console.log(
                "Matchs analysés :",
                analyses.length
            );

            analyses.forEach(match => {

                console.log("--------------------------------");

                console.log(
                    match.match.homeTeam +
                    " vs " +
                    match.match.awayTeam
                );

                console.log(
                    "Score prévu :",
                    match.prediction.scoreExact
                );

                console.log(
                    "Vainqueur :",
                    match.prediction.winner
                );

                console.log(
                    "Confiance :",
                    match.prediction.confiance + "%"
                );

            });

            return analyses;

        }

        catch (error) {

            console.error(
                "Erreur Football AI Pro :",
                error
            );

            return [];

        }

    }

}

const app = new FootballAIApp();

app.start();

export default app;
