// =====================================
// FOOTBALL AI PRO 3.1
// API FOOTBALL SERVICE
// =====================================

const API_URL = "https://v3.football.api-sports.io";

// Remplace par ta vraie clé API
const API_KEY = "VOTRE_API_KEY_ICI";

class ApiFootballService {

    constructor() {

        this.headers = {
            "x-apisports-key": API_KEY,
            "x-apisports-host": "v3.football.api-sports.io"
        };

        // Cache des requêtes
        this.cache = {};

        // Durée du cache : 60 secondes
        this.cacheDuration = 60000;

    }

    // ==============================
    // REQUÊTE API AVEC CACHE
    // ==============================

    async request(endpoint) {

        const now = Date.now();

        // Vérifie si la réponse est déjà en cache
        if (
            this.cache[endpoint] &&
            (now - this.cache[endpoint].time) < this.cacheDuration
        ) {

            console.log("📦 Données récupérées depuis le cache :", endpoint);

            return this.cache[endpoint].data;

        }

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

            // Gestion des erreurs renvoyées par l'API
            if (json.errors && Object.keys(json.errors).length > 0) {

                console.error("API FOOTBALL :", json.errors);

                return [];

            }

            const data = json.response || [];

            // Sauvegarde dans le cache
            this.cache[endpoint] = {

                data,
                time: now

            };

            return data;

        }

        catch (error) {

            console.error(
                "API FOOTBALL ERROR :",
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
    // STATISTIQUES EQUIPE
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
