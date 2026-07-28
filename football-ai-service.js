// =====================================
// FOOTBALL AI PRO 3.1
// FOOTBALL AI SERVICE
// =====================================

import apiFootballService from "./api-football-service.js";
import dataNormalizer from "./data-normalizer.js";
import predictionEngine from "../ai-engine/prediction-engine.js";

class FootballAIService {

    async analyzeTodayMatches() {

        try {

            const fixtures =
                await apiFootballService.getTodayMatches();

            const analyses = [];

            for (const fixture of fixtures) {

                const home = fixture.teams.home;
                const away = fixture.teams.away;

                // Données temporaires
                // Elles seront remplacées par les vraies
                // statistiques API dans l'étape suivante.

                const homeProfile =
                    dataNormalizer.createAIProfile({

                        attack: {
                            goals: 2,
                            shots: 14,
                            shotsOnTarget: 6
                        },

                        defense: {
                            goalsConceded: 1
                        },

                        possession: 58,
                        corners: 6,
                        fouls: 12,
                        yellowCards: 2

                    });

                homeProfile.name = home.name;
                homeProfile.elo = 1700;
                homeProfile.possession = 58;

                const awayProfile =
                    dataNormalizer.createAIProfile({

                        attack: {
                            goals: 1,
                            shots: 10,
                            shotsOnTarget: 4
                        },

                        defense: {
                            goalsConceded: 2
                        },

                        possession: 42,
                        corners: 4,
                        fouls: 14,
                        yellowCards: 3

                    });

                awayProfile.name = away.name;
                awayProfile.elo = 1650;
                awayProfile.possession = 42;

                const prediction =
                    await predictionEngine.predict({

                        home: homeProfile,
                        away: awayProfile

                    });

                analyses.push({

                    fixtureId: fixture.fixture.id,

                    match: {

                        homeTeam: home.name,
                        awayTeam: away.name

                    },

                    prediction

                });

            }

            return analyses;

        }

        catch (error) {

            console.error(
                "Football AI Service :",
                error
            );

            return [];

        }

    }

}

export default new FootballAIService();
