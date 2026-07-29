// =====================================
// FOOTBALL AI PRO 4.0
// API FOOTBALL SERVICE
// =====================================

const BASE_URL = "https://v3.football.api-sports.io";
const API_KEY = "adc6cbf2126fd9262c74e51cfbb12cfb";

class ApiFootballService {

    async request(endpoint) {

        const response = await fetch(
            `${BASE_URL}${endpoint}`,
            {
                method: "GET",
                headers: {
                    "x-apisports-key": API_KEY
                }
            }
        );

        if (!response.ok) {
            throw new Error(`Erreur API : ${response.status}`);
        }

        const data = await response.json();

        return data.response || [];

    }

    async getTodayMatches() {

        const today =
            new Date().toISOString().split("T")[0];

        return await this.request(
            `/fixtures?date=${today}`
        );

    }

    async getFixtureStatistics(fixtureId) {

        return await this.request(
            `/fixtures/statistics?fixture=${fixtureId}`
        );

    }

    async getLineups(fixtureId) {

        return await this.request(
            `/fixtures/lineups?fixture=${fixtureId}`
        );

    }

    async getEvents(fixtureId) {

        return await this.request(
            `/fixtures/events?fixture=${fixtureId}`
        );

    }

    async getHeadToHead(homeId, awayId) {

        return await this.request(
            `/fixtures/headtohead?h2h=${homeId}-${awayId}`
        );

    }

    async getTeamStatistics(teamId, leagueId, season) {

        return await this.request(
            `/teams/statistics?league=${leagueId}&season=${season}&team=${teamId}`
        );

    }

}

export default new ApiFootballService();
