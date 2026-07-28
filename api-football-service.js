// =====================================
// FOOTBALL AI PRO 4.0
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

                return [];

            }

            const analyses = [];

            for (const fixture of fixtures) {

                const homeProfile =
                    dataNormalizer.createAIProfile({

                        name: fixture.teams.home.name,
                        id: fixture.teams.home.id

                    });

                const awayProfile =
                    dataNormalizer.createAIProfile({

                        name: fixture.teams.away.name,
                        id: fixture.teams.away.id

                    });

                const prediction =
                    await predictionEngine.predict({

                        home: homeProfile,

                        away: awayProfile,

                        context: {

                            fixtureId:
                                fixture.fixture.id,

                            referee:
                                fixture.fixture.referee

                        }

                    });

                analyses.push({

                    fixtureId:
                        fixture.fixture.id,

                    league:
                        fixture.league.name,

                    date:
                        fixture.fixture.date,

                    match: {

                        homeTeam:
                            fixture.teams.home.name,

                        awayTeam:
                            fixture.teams.away.name

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
