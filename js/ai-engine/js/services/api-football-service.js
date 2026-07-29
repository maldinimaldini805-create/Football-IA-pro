// =====================================
// FOOTBALL AI PRO 4.1
// API FOOTBALL SERVICE
// =====================================

const API_KEY = "adc6cbf2126fd9262c74e51cfbb12cfb";
const BASE_URL = "https://v3.football.api-sports.io";

class APIFootballService {

    async getTodayMatches() {

        const today = new Date().toISOString().split("T")[0];

        const response = await fetch(

            `${BASE_URL}/fixtures?date=${today}`,

            {

                headers: {

                    "x-apisports-key": API_KEY

                }

            }

        );

        if (!response.ok) {

            throw new Error("Erreur API-Football");

        }

        const data = await response.json();

        return data.response || [];

    }

}

export default new APIFootballService();
