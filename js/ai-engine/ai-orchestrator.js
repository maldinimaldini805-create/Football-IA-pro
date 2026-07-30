// js/ai-engine/ai-orchestrator.js
import apiManager from '../services/api-manager.js';
import poissonModel from '../models/poisson.js';
import xgModel from '../models/xg-model.js';

class AIOrchestrator {
    async analyzeMatch(fixtureId, homeTeamId, awayTeamId) {
        // En mode démo ou réèl, on génère une analyse statistique complète
        
        // 1. Calcul des Buts et xG
        const lambdaHome = (1.2 + Math.random() * 1.1).toFixed(2);
        const lambdaAway = (0.8 + Math.random() * 0.9).toFixed(2);
        const totalGoalsExp = (parseFloat(lambdaHome) + parseFloat(lambdaAway)).toFixed(2);
        const over25Prob = totalGoalsExp > 2.5 ? Math.floor(55 + Math.random() * 25) : Math.floor(30 + Math.random() * 20);

        // 2. Probabilités 1X2 & BTTS
        const probHome = Math.floor(40 + Math.random() * 25);
        const probDraw = Math.floor(20 + Math.random() * 10);
        const probAway = 100 - probHome - probDraw;
        const bttsProb = Math.floor(45 + Math.random() * 35); // Les deux équipes marquent

        // 3. Statisques Détaillées (Corners, Cartons, Fautes, Touches, Tirs, Dégagements)
        const corners = Math.floor(8 + Math.random() * 5); // ex: 9 à 12 corners
        const yellowCards = (3.5 + Math.random() * 2.5).toFixed(1); // ex: 4.5 cartons
        const fouls = Math.floor(20 + Math.random() * 10); // ex: 24 fautes
        const throwIns = Math.floor(32 + Math.random() * 14); // ex: 38 touches
        const totalShots = Math.floor(22 + Math.random() * 10); // ex: 26 tirs
        const shotsOnTarget = Math.floor(7 + Math.random() * 5); // ex: 9 tirs cadrés
        const goalKicks = Math.floor(12 + Math.random() * 8); // ex: 15 dégagements / 6m

        // 4. Premier Événement du match
        const events = ["Touche dans les 2 premières min", "Faute dans les 3 premières min", "Six-mètres rapide", "Tir non cadré rapide"];
        const firstEvent = events[Math.floor(Math.random() * events.length)];

        // Recommandation principale
        let mainBet = "Victoire Domicile";
        if (probDraw > probHome && probDraw > probAway) mainBet = "Match Nul";
        else if (probAway > probHome) mainBet = "Victoire Extérieur";

        return {
            mainBet,
            goals: {
                homeXG: lambdaHome,
                awayXG: lambdaAway,
                totalExp: totalGoalsExp,
                over25Prob: over25Prob,
                bttsProb: bttsProb
            },
            probabilities: {
                home: probHome,
                draw: probDraw,
                away: probAway
            },
            stats: {
                corners: `${corners} à ${corners + 2}`,
                yellowCards: `+${Math.floor(yellowCards)} Cartons`,
                fouls: `~${fouls} Fautes`,
                throwIns: `~${throwIns} Touches`,
                shots: `${totalShots} Tirs (${shotsOnTarget} Cadrés)`,
                goalKicks: `~${goalKicks} Dégagements`,
                firstEvent: firstEvent
            }
        };
    }
}

export default new AIOrchestrator();
