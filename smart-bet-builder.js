// =====================================
// FOOTBALL AI PRO 4.0
// SMART BET BUILDER
// =====================================

class SmartBetBuilder {

    generate(prediction) {

        const bets = [];

        // Victoire
        if (prediction.winner !== "DRAW") {

            bets.push({
                type: "Résultat du match",
                prediction: prediction.winner,
                confidence: prediction.confiance
            });

        }

        // Plus de 2.5 buts
        if (prediction.over25 >= 70) {

            bets.push({
                type: "Plus de 2.5 buts",
                prediction: "OVER 2.5",
                confidence: prediction.over25
            });

        }

        // Les deux équipes marquent
        if (prediction.btts >= 65) {

            bets.push({
                type: "Les deux équipes marquent",
                prediction: "BTTS OUI",
                confidence: prediction.btts
            });

        }

        // Plus de corners
        if (prediction.corners >= 9) {

            bets.push({
                type: "Corners",
                prediction: "Plus de 8.5 corners",
                confidence: 75
            });

        }

        return {

            totalBets: bets.length,

            bets

        };

    }

}

export default new SmartBetBuilder();
