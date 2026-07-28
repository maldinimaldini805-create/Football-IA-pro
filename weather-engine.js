// =====================================
// FOOTBALL AI PRO 3.0
// WEATHER ENGINE
// =====================================

class WeatherEngine {

    analyser(meteo) {

        let impact = 0;

        switch (meteo) {

            case "Soleil":
                impact = 0;
                break;

            case "Nuageux":
                impact = 2;
                break;

            case "Pluie":
                impact = 8;
                break;

            case "Forte pluie":
                impact = 15;
                break;

            case "Neige":
                impact = 20;
                break;

            case "Vent":
                impact = 10;
                break;

            default:
                impact = 5;

        }

        return {

            meteo,

            impact,

            conditionsBonnes: impact < 10

        };

    }

}

export default new WeatherEngine();
