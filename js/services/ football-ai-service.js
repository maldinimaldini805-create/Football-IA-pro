// =====================================
// FOOTBALL AI PRO 4.2
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

            if (!fixtures.length) {

                return [];

            }

            const analyses = [];

            for (const fixture of fixtures) {

                const home = fixture.teams.home;
                const away = fixture.teams.away;

                const homeProfile =
                    dataNormalizer.createAIProfile({

                        id: home.id,
                        name: home.name

                    });

                const awayProfile =
                    dataNormalizer.createAIProfile({

                        id: away.id,
                        name: away.name

                    });

                const prediction =
                    await predictionEngine.predict({

                        home: homeProfile,

                        away: awayProfile,

                        context: {

                            fixtureId: fixture.fixture.id,

                            league: fixture.league.name,

                            season: fixture.league.season,

                            referee: fixture.fixture.referee

                        }

                    });

                analyses.push({

                    fixtureId: fixture.fixture.id,

                    league: fixture.league.name,

                    date: fixture.fixture.date,

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

            console.error(error);

            return [];

        }

    }

}

export default new FootballAIService();
