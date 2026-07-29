// =====================================
// FOOTBALL AI PRO 4.1
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
                    "x-apisports-key": API_KEY,
                    "Content-Type": "application/json"
                }
            }
        );

        if (!response.ok) {

            throw new Error(
                `Erreur API Football (${response.status})`
            );

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

    async getFixture(fixtureId) {

        return await this.request(
            `/fixtures?id=${fixtureId}`
        );

    }

    async getTeamStatistics(teamId, leagueId, season) {

        const result =
            await this.request(
                `/teams/statistics?league=${leagueId}&season=${season}&team=${teamId}`
            );

        return result[0] || null;

    }

    async getHeadToHead(homeId, awayId) {

        return await this.request(
            `/fixtures/headtohead?h2h=${homeId}-${awayId}`
        );

    }

    async getLineups(fixtureId) {

        return await this.request(
            `/fixtures/lineups?fixture=${fixtureId}`
        );

    }

    async getInjuries(leagueId, season) {

        return await this.request(
            `/injuries?league=${leagueId}&season=${season}`
        );

    }

    async getOdds(fixtureId) {

        return await this.request(
            `/odds?fixture=${fixtureId}`
        );

    }

}

export default new ApiFootballService();
