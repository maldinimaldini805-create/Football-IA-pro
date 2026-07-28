// =====================================
// FOOTBALL AI PRO 3.2
// API FOOTBALL SERVICE
// =====================================

const API_URL = "https://v3.football.api-sports.io";

const API_KEY = "VOTRE_API_KEY";

class ApiFootballService {

    constructor() {

        this.headers = {

            "x-apisports-key": API_KEY

        };

    }

    async request(endpoint) {

        try {

            const response = await fetch(
                `${API_URL}${endpoint}`,
                {
                    headers: this.headers
                }
            );

            if (!response.ok) {

                throw new Error("Erreur API Football");

            }

            const json = await response.json();

            return json.response || [];

        }

        catch (error) {

            console.error("API :", error);

            return [];

        }

    }

    async getTodayMatches() {

        const today = new Date()
            .toISOString()
            .split("T")[0];

        return await this.request(
            `/fixtures?date=${today}`
        );

    }

    async getTeamStatistics(teamId, leagueId, season) {

        return await this.request(
            `/teams/statistics?team=${teamId}&league=${leagueId}&season=${season}`
        );

    }

    async getH2H(team1, team2) {

        return await this.request(
            `/fixtures/headtohead?h2h=${team1}-${team2}`
        );

    }

    async getOdds(fixtureId) {

        return await this.request(
            `/odds?fixture=${fixtureId}`
        );

    }

}

export default new ApiFootballService();
