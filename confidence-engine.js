// =====================================
// FOOTBALL AI PRO 3.0
// CONFIDENCE ENGINE
// =====================================

class ConfidenceEngine {

    calculer(data) {

        let confiance = 50;

        // Forme récente
        if (data.forme > 10) confiance += 10;

        // H2H
        if (data.h2h > 5) confiance += 10;

        // Avantage domicile
        if (data.homeAdvantage) confiance += 8;

        // Blessures
        if (data.injuries > 3) confiance -= 10;

        // Suspensions
        if (data.suspensions > 2) confiance -= 5;

        // Fatigue
        if (data.fatigue) confiance -= 5;

        // Forme offensive
        if (data.goalsFor > data.goalsAgainst)
            confiance += 7;

        // Limites
        if (confiance > 99) confiance = 99;
        if (confiance < 1) confiance = 1;

        return confiance;

    }

}

export default new ConfidenceEngine();
