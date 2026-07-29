// =====================================
// FOOTBALL AI PRO 4.1
// SUPER AI ENGINE
// =====================================

import predictionEngine from "./prediction-engine.js";
import OddsEngine from "./odds-engine.js";
import FormEngine from "./form-engine.js";
import H2HEngine from "./h2h-engine.js";
import InjuryEngine from "./injury-engine.js";
import LineupEngine from "./lineup-engine.js";
import WeatherEngine from "./weather-engine.js";
import RefereeEngine from "./referee-engine.js";
import ConfidenceEngine from "./confidence-engine.js";
import EventAIEngine from "./event-ai-engine.js";

class SuperAIEngine {

    async analyser(data) {

        const prediction =
            await predictionEngine.predict({

                home: data.home,

                away: data.away,

                context: {

                    referee: data.referee

                }

            });

        const odds =
            OddsEngine.analyser(
                data.homeOdd,
                data.drawOdd,
                data.awayOdd
            );

        const form =
            FormEngine.analyser(
                data.lastMatchesHome
            );

        const h2h =
            H2HEngine.analyser(
                data.h2hMatches
            );

        const injuries =
            InjuryEngine.analyser(
                data.injuries
            );

        const lineup =
            LineupEngine.analyser(
                data.lineup,
                data.bench
            );

        const weather =
            WeatherEngine.analyser(
                data.weather
            );

        const referee =
            RefereeEngine.analyser(
                data.referee
            );

        const confidence =
            ConfidenceEngine.calculer({

                forme: form.forme,

                h2h: h2h.total,

                homeAdvantage: true,

                injuries: injuries.joueursAbsents,

                suspensions: 0,

                fatigue: false,

                goalsFor: form.butsPour,

                goalsAgainst: form.butsContre

            });

        const events =
            EventAIEngine.analyser(
                data.homeStats,
                data.awayStats
            );

        return {

            scoreExact: prediction.scoreExact,

            scoreMiTemps: prediction.scoreMiTemps,

            confiance: confidence,

            winner: prediction.winner,

            over25: prediction.over25,

            btts: prediction.btts,

            corners: prediction.corners,

            cartons: prediction.cartons,

            fautes: prediction.fautes,

            odds,

            form,

            h2h,

            injuries,

            lineup,

            weather,

            referee,

            events

        };

    }

}

export default new SuperAIEngine();
