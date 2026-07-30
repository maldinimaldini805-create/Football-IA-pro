// js/ai-engine/ai-orchestrator.js
import apiManager from '../services/api-manager.js';
import poissonModel from '../models/poisson.js';
import xgModel from '../models/xg-model.js';

class AIOrchestrator {
    async analyzeMatch(fixtureId, homeTeamId, awayTeamId) {
        // Chargement des détails
        const details = await apiManager.getMatchDetails(fixtureId, homeTeamId, awayTeamId);

        // Estimation xG basique
        const expectedGoals = xgModel ? xgModel.calculateExpectedGoals(details.h2h) : { lambdaHome: 1.5, lambdaAway: 1.1 };
        
        // Calcul des probabilités avec la loi de Poisson
        const probabilities = poissonModel ? poissonModel.calculateProbabilities(expectedGoals.lambdaHome, expectedGoals.lambdaAway) : { homeWin: 0.45, draw: 0.28, awayWin: 0.27 };

        // Détermination de la prédiction conseillée
        let recommendedBet = "Victoire Domicile";
        if (probabilities.draw > probabilities.homeWin && probabilities.draw > probabilities.awayWin) {
            recommendedBet = "Match Nul";
        } else if (probabilities.awayWin > probabilities.homeWin) {
            recommendedBet = "Victoire Extérieur";
        }

        return {
            expectedGoals,
            probabilities,
            recommendedBet
        };
    }
}

export default new AIOrchestrator();
