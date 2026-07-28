// =====================================
// FOOTBALL AI PRO 4.0
// COMPETITION MANAGER
// =====================================

class CompetitionManager {

    constructor() {

        this.competitions = [

            {
                code: "UCL",
                name: "UEFA Champions League"
            },

            {
                code: "UEL",
                name: "UEFA Europa League"
            },

            {
                code: "EPL",
                name: "Premier League"
            },

            {
                code: "LL",
                name: "La Liga"
            },

            {
                code: "SA",
                name: "Serie A"
            },

            {
                code: "BL",
                name: "Bundesliga"
            },

            {
                code: "L1",
                name: "Ligue 1"
            },

            {
                code: "CAFCL",
                name: "CAF Champions League"
            },

            {
                code: "CAFCC",
                name: "CAF Confederation Cup"
            },

            {
                code: "AFCON",
                name: "Coupe d'Afrique des Nations"
            },

            {
                code: "WC",
                name: "Coupe du Monde"
            }

        ];

    }

    getCompetitions() {

        return this.competitions;

    }

    findCompetition(code) {

        return this.competitions.find(

            competition => competition.code === code

        ) || null;

    }

}

export default new CompetitionManager();
