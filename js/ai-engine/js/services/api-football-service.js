// js/services/api-football-service.js

class APIFootballService {
    constructor() {
        // Remplacez 'VOTRE_CLE_API_ICI' par votre clé API-Football / RapidAPI
        this.apiKey = 'VOTRE_CLE_API_ICI'; 
        this.baseUrl = 'https://v3.football.api-sports.io';
        this.headers = {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': this.apiKey
        };
    }

    // 1. Récupérer les matchs du jour
    async getFixturesByDate(dateStr) {
        try {
            const response = await fetch(`${this.baseUrl}/fixtures?date=${dateStr}`, {
                method: 'GET',
                headers: this.headers
            });
            const data = await response.json();
            return data.response; // Retourne la liste des matchs
        } catch (error) {
            console.error("Erreur lors de la récupération des matchs :", error);
            return [];
        }
    }

    // 2. Récupérer l'historique H2H (Confrontations directes)
    async getH2H(teamAId, teamBId) {
        try {
            const response = await fetch(`${this.baseUrl}/fixtures/headtohead?h2h=${teamAId}-${teamBId}`, {
                method: 'GET',
                headers: this.headers
            });
            const data = await response.json();
            return data.response;
        } catch (error) {
            console.error("Erreur H2H :", error);
            return [];
        }
    }

    // 3. Récupérer les cotes d'un match (pour value-bet-engine.js)
    async getMatchOdds(fixtureId) {
        try {
            const response = await fetch(`${this.baseUrl}/odds?fixture=${fixtureId}`, {
                method: 'GET',
                headers: this.headers
            });
            const data = await response.json();
            return data.response;
        } catch (error) {
            console.error("Erreur Cotes :", error);
            return null;
        }
    }
}

// Exportation du service pour l'utiliser dans d'autres modules
export default new APIFootballService();
