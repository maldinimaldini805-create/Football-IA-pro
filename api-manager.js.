// js/services/api-manager.js
import apiFootballService from './api-football-service.js';

class APIManager {
    /**
     * Récupère tous les matchs programmés aujourd'hui
     */
    async getTodayMatches() {
        console.log("⚽ Récupération des matchs du jour en cours...");
        return await apiFootballService.getFixturesByDate();
    }

    /**
     * Récupère toutes les données nécessaires à l'IA pour un match
     */
    async getMatchDetails(fixtureId, homeTeamId, awayTeamId) {
        console.log(`📊 Chargement des statistiques pour le match ID: ${fixtureId}...`);

        const [h2h, odds] = await Promise.all([
            apiFootballService.getH2H(homeTeamId, awayTeamId),
            apiFootballService.getMatchOdds(fixtureId)
        ]);

        return {
            h2h,
            odds
        };
    }
}

export default new APIManager();
