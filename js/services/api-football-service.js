// js/services/api-football-service.js

// 🔑 Clé API correctement configurée
const API_KEY = 'adc6cbf2126fd9262c74e51cfbb12cfb';

class APIFootballService {
    constructor() {
        this.apiKey = API_KEY;
        this.baseUrl = 'https://v3.football.api-sports.io';
        this.headers = {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': this.apiKey
        };
    }

    // Récupère les matchs d'une date donnée (ex: "2026-07-29")
    async getFixturesByDate(dateStr) {
        try {
            const response = await fetch(`${this.baseUrl}/fixtures?date=${dateStr}`, {
                method: 'GET',
                headers: this.headers
            });
            const data = await response.json();
            return data.response || [];
        } catch (error) {
            console.error("Erreur lors de la récupération des matchs :", error);
            return [];
        }
    }

    // Récupère le face-à-face entre deux équipes
    async getH2H(teamAId, teamBId) {
        try {
            const response = await fetch(`${this.baseUrl}/fixtures/headtohead?h2h=${teamAId}-${teamBId}`, {
                method: 'GET',
                headers: this.headers
            });
            const data = await response.json();
            return data.response || [];
        } catch (error) {
            console.error("Erreur H2H :", error);
            return [];
        }
    }

    // Récupère les cotes des bookmakers
    async getMatchOdds(fixtureId) {
        try {
            const response = await fetch(`${this.baseUrl}/odds?fixture=${fixtureId}`, {
                method: 'GET',
                headers: this.headers
            });
            const data = await response.json();
            return data.response || null;
        } catch (error) {
            console.error("Erreur Cotes :", error);
            return null;
        }
    }
}

export default new APIFootballService();
