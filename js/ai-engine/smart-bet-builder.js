class SmartBetBuilder {

    generate(prediction) {

        const bets = [];

        // Combiné prudent
        bets.push({

            type: "SAFE",

            confidence: 92,

            selections: [

                prediction.winner,
                "Plus de 1.5 buts",
                "Plus de 7.5 corners"

            ]

        });

        // Combiné équilibré
        bets.push({

            type: "BALANCED",

            confidence: 86,

            selections: [

                prediction.btts,
                "Plus de 2.5 buts",
                "Plus de 8.5 corners",
                "Plus de 3.5 cartons"

            ]

        });

        // Combiné à forte cote
        bets.push({

            type: "HIGH ODDS",

            confidence: 72,

            selections: [

                prediction.scoreExact,
                "Premier but : " + prediction.winner,
                "Plus de 10.5 corners"

            ]

        });

        return bets;

    }

}

export default new SmartBetBuilder();
