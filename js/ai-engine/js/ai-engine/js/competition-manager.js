// =====================================
// FOOTBALL AI PRO 3.3
// COMPETITION MANAGER
// =====================================

class CompetitionManager {

    constructor() {

        this.favoriteCompetitions = [];

    }

    getCompetitions() {

        return [

            {
                id: 39,
                name: "Premier League",
                country: "Angleterre"
            },

            {
                id: 140,
                name: "La Liga",
                country: "Espagne"
            },

            {
                id: 135,
                name: "Serie A",
                country: "Italie"
            },

            {
                id: 61,
                name: "Ligue 1",
                country: "France"
            },

            {
                id: 2,
                name: "Ligue des Champions UEFA",
                country: "Europe"
            },

            {
                id: 12,
                name: "CAF Champions League",
                country: "Afrique"
            },

            {
                id: 6,
                name: "Coupe d'Afrique des Nations",
                country: "Afrique"
            }

        ];

    }

}

export default new CompetitionManager();
