// =====================================
// FOOTBALL AI PRO 3.2
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

            if (!fixtures || fixtures.length === 0) {

                console.log("Aucun match aujourd'hui.");

                return [];

            }

            const analyses = [];

            for (const fixture of fixtures) {

                const home = fixture.teams.home;
                const away = fixture.teams.away;

                // ===========================
                // PROFIL DOMICILE
                // ===========================

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
                homeProfile.id = home.id;
                homeProfile.elo = 1700;

                // ===========================
                // PROFIL EXTERIEUR
                // ===========================

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
                awayProfile.id = away.id;
                awayProfile.elo = 1650;

                // ===========================
                // PREDICTION IA
                // ===========================

                const prediction =
                    await predictionEngine.predict({

                        home: homeProfile,

                        away: awayProfile,

                        context: {

                            fixtureId: fixture.fixture.id,

                            referee: fixture.fixture.referee || "Inconnu",

                            league: fixture.league?.name || "",

                            season: fixture.league?.season || ""

                        }

                    });

                analyses.push({

                    fixtureId: fixture.fixture.id,

                    league:
                        fixture.league?.name,

                    date:
                        fixture.fixture.date,

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

                "Football AI Service :", error

            );

            return [];

        }

    }

}

export default new FootballAIService();
