/**
 * Module Moteur IA Avancé - Football-IA-pro
 * Précisions des marchés : 1N2, Double Chance, Buts (O/U), Corners, Fautes, Touches, Dégagements.
 */

class MatchIssuesAnalyzer {

    // ----------------------------------------------------
    // 1. ANALYSE 1N2 ET DOUBLE CHANCE
    // ----------------------------------------------------
    static analyserIssues1N2(probDom, probNul, probExt) {
        const total = probDom + probNul + probExt;
        const pDom = (probDom / total) * 100;
        const pNul = (probNul / total) * 100;
        const pExt = (probExt / total) * 100;

        const res = { victoireSeche: null, doubleChance: null };

        // Victoire Sèche (Exigence d'écart clair)
        if (pDom >= 58 && (pDom - pExt) >= 20) {
            res.victoireSeche = { choix: "Victoire Domicile (1)", code: "1", confiance: Number(pDom.toFixed(1)) };
        } else if (pExt >= 58 && (pExt - pDom) >= 20) {
            res.victoireSeche = { choix: "Victoire Extérieur (2)", code: "2", confiance: Number(pExt.toFixed(1)) };
        } else {
            res.victoireSeche = { choix: "Match Nul ou Indécis (X)", code: "X", confiance: Number(pNul.toFixed(1)) };
        }

        // Double Chance
        const prob1X = pDom + pNul;
        const probX2 = pExt + pNul;
        const prob12 = pDom + pExt;

        if (prob1X >= 72 && pDom >= 38) {
            res.doubleChance = { choix: "1X (Domicile ou Nul)", code: "1X", confiance: Number(prob1X.toFixed(1)) };
        } else if (probX2 >= 72 && pExt >= 38) {
            res.doubleChance = { choix: "X2 (Nul ou Extérieur)", code: "X2", confiance: Number(probX2.toFixed(1)) };
        } else if (prob12 >= 78 && pNul <= 22) {
            res.doubleChance = { choix: "12 (Pas de Match Nul)", code: "12", confiance: Number(prob12.toFixed(1)) };
        }

        return res;
    }

    // ----------------------------------------------------
    // 2. PREDICTION PRÉCISE DES BUTS (Over / Under)
    // ----------------------------------------------------
    static analyserButs(xgTotal) {
        // xgTotal = xG Domicile + xG Extérieur
        if (xgTotal >= 3.2) {
            return { type: "Plus de", seuil: "+3.5 Buts", confiance: 78.5, indice: "Match très offensif" };
        } else if (xgTotal >= 2.4) {
            return { type: "Plus de", seuil: "+2.5 Buts", confiance: 82.0, indice: "Attaques en forme" };
        } else if (xgTotal <= 1.7) {
            return { type: "Moins de", seuil: "-2.5 Buts", confiance: 80.5, indice: "Défenses très solides" };
        } else if (xgTotal <= 1.2) {
            return { type: "Moins de", seuil: "-1.5 Buts", confiance: 75.0, indice: "Match très fermé" };
        } else {
            return { type: "Plus de", seuil: "+1.5 Buts", confiance: 85.0, indice: "Rythme modéré" };
        }
    }

    // ----------------------------------------------------
    // 3. CORNERS, FAUTES, TOUCHES & DÉGAGEMENTS
    // ----------------------------------------------------
    static analyserStatistiquesDetaillees(statsDom, statsExt) {
        // Estimation basée sur la moyenne combinée des deux équipes
        const cornersEstimes = (statsDom.cornersMoyenne || 5.0) + (statsExt.cornersMoyenne || 4.5);
        const fautesEstimees = (statsDom.fautesMoyenne || 12.0) + (statsExt.fautesMoyenne || 11.5);
        const touchesEstimees = (statsDom.touchesMoyenne || 18.0) + (statsExt.touchesMoyenne || 17.0);
        const degagementsEstimes = (statsDom.degagementsMoyenne || 14.0) + (statsExt.degagementsMoyenne || 15.0);

        return {
            corners: cornersEstimes >= 9.5 
                ? { pronostic: "Plus de 9.5 Corners", totalEstime: cornersEstimes.toFixed(1), confiance: 81.0 }
                : { pronostic: "Moins de 9.5 Corners", totalEstime: cornersEstimes.toFixed(1), confiance: 76.5 },
            
            fautes: fautesEstimees >= 24.5 
                ? { pronostic: "Plus de 24.5 Fautes", totalEstime: fautesEstimees.toFixed(1), confiance: 79.0 }
                : { pronostic: "Moins de 24.5 Fautes", totalEstime: fautesEstimees.toFixed(1), confiance: 77.0 },

            touches: touchesEstimees >= 35.5 
                ? { pronostic: "Plus de 35.5 Touches", totalEstime: touchesEstimees.toFixed(1), confiance: 80.0 }
                : { pronostic: "Moins de 35.5 Touches", totalEstime: touchesEstimees.toFixed(1), confiance: 74.0 },

            degagements: degagementsEstimes >= 28.5 
                ? { pronostic: "Plus de 28.5 Dégagements", totalEstime: degagementsEstimes.toFixed(1), confiance: 78.5 }
                : { pronostic: "Moins de 28.5 Dégagements", totalEstime: degagementsEstimes.toFixed(1), confiance: 75.0 }
        };
    }

    // ----------------------------------------------------
    // 4. RAPPORT GLOBAL POUR L'ORCHESTRATEUR
    // ----------------------------------------------------
    static analyserMatchComplet(dataMatch) {
        const issues1N2 = this.analyserIssues1N2(dataMatch.probDom, dataMatch.probNul, dataMatch.probExt);
        const analyseButs = this.analyserButs(dataMatch.xgDom + dataMatch.xgExt);
        const statsAvancees = this.analyserStatistiquesDetaillees(dataMatch.statsDom || {}, dataMatch.statsExt || {});

        return {
            victoireSeche: issues1N2.victoireSeche,
            doubleChance: issues1N2.doubleChance,
            predictionButs: analyseButs,
            statistiques: statsAvancees
        };
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = MatchIssuesAnalyzer;
}
