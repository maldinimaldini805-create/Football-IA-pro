// =====================================
// FOOTBALL AI PRO 3.1
// API FOOTBALL SERVICE
// =====================================

const API_URL = "https://v3.football.api-sports.io";
const API_KEY = "VOTRE_API_KEY_ICI";

class ApiFootballService {

    constructor() {

        this.headers = {
            "x-apisports-key": API_KEY,
            "x-apisports-host": "v3.football.api-sports.io"
        };

    }

    async request(endpoint) {

        try {

            const response = await fetch(
                `${API_URL}${endpoint}`,
                {
                    method: "GET",
                    headers: this.headers
                }
            );

            if (!response.ok) {

                throw new Error(
                    `Erreur API (${response.status})`
                );

            }

            const json = await response.json();

            return json.response || [];

        }

        catch (error) {

            console.error(
                "API Football :",
                error
            );

            return [];

        }

    }

    // ==============================
    // MATCHS DU JOUR
    // ==============================

    async getTodayMatches() {

        const today =
            new Date()
                .toISOString()
                .split("T")[0];

        return await this.request(
            `/fixtures?date=${today}`
        );

    }

    // ==============================
    // CLASSEMENT
    // ==============================

    async getStandings(league, season) {

        return await this.request(
            `/standings?league=${league}&season=${season}`
        );

    }

    // ==============================
    // STATISTIQUES
    // ==============================

    async getTeamStatistics(team, league, season) {

        return await this.request(
            `/teams/statistics?team=${team}&league=${league}&season=${season}`
        );

    }

    // ==============================
    // DERNIERS MATCHS
    // ==============================

    async getLastMatches(team, limit = 10) {

        return await this.request(
            `/fixtures?team=${team}&last=${limit}`
        );

    }

    // ==============================
    // H2H
    // ==============================

    async getH2H(team1, team2) {

        return await this.request(
            `/fixtures/headtohead?h2h=${team1}-${team2}`
        );

    }

    // ==============================
    // BLESSURES
    // ==============================

    async getInjuries(fixture) {

        return await this.request(
            `/injuries?fixture=${fixture}`
        );

    }

    // ==============================
    // COMPOSITIONS
    // ==============================

    async getLineups(fixture) {

        return await this.request(
            `/fixtures/lineups?fixture=${fixture}`
        );

    }

    // ==============================
    // COTES
    // ==============================

    async getOdds(fixture) {

        return await this.request(
            `/odds?fixture=${fixture}`
        );

    }

    // ==============================
    // ARBITRE
    // ==============================

    async getReferee(fixture) {

        return await this.request(
            `/fixtures?id=${fixture}`
        );

    }

}

export default new ApiFootballService();
