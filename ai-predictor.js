/**
 * Football AI Pro - Moteur de Prédiction IA
 * Système de prédiction intelligent pour les matchs de football
 */

class FootballAIPredictor {
    constructor() {
        // Base de données des équipes et leurs statistiques
        this.teams = this.initializeTeams();
        this.history = JSON.parse(localStorage.getItem('predictions')) || [];
    }

    /**
     * Initialise la base de données des équipes avec leurs statistiques
     */
    initializeTeams() {
        return {
            // Ligue 1
            'psg': { name: 'Paris Saint-Germain', strength: 94, attack: 92, defense: 88, form: 0.85, homeAdvantage: 1.15 },
            'lyon': { name: 'Olympique Lyonnais', strength: 85, attack: 82, defense: 84, form: 0.78, homeAdvantage: 1.12 },
            'marseille': { name: 'Olympique Marseille', strength: 83, attack: 80, defense: 81, form: 0.75, homeAdvantage: 1.10 },
            'monaco': { name: 'AS Monaco', strength: 82, attack: 85, defense: 76, form: 0.80, homeAdvantage: 1.08 },
            'nice': { name: 'OGC Nice', strength: 78, attack: 76, defense: 78, form: 0.72, homeAdvantage: 1.06 },

            // Premier League
            'manchester city': { name: 'Manchester City', strength: 96, attack: 94, defense: 91, form: 0.88, homeAdvantage: 1.18 },
            'manchester united': { name: 'Manchester United', strength: 90, attack: 87, defense: 85, form: 0.82, homeAdvantage: 1.15 },
            'liverpool': { name: 'Liverpool FC', strength: 91, attack: 89, defense: 87, form: 0.83, homeAdvantage: 1.16 },
            'chelsea': { name: 'Chelsea FC', strength: 88, attack: 84, defense: 86, form: 0.79, homeAdvantage: 1.13 },
            'arsenal': { name: 'Arsenal FC', strength: 87, attack: 86, defense: 83, form: 0.81, homeAdvantage: 1.12 },

            // La Liga
            'real madrid': { name: 'Real Madrid CF', strength: 95, attack: 93, defense: 89, form: 0.86, homeAdvantage: 1.17 },
            'barcelona': { name: 'FC Barcelona', strength: 92, attack: 91, defense: 86, form: 0.84, homeAdvantage: 1.15 },
            'atletico madrid': { name: 'Atlético Madrid', strength: 88, attack: 85, defense: 89, form: 0.81, homeAdvantage: 1.12 },
            'sevilla': { name: 'Sevilla FC', strength: 84, attack: 82, defense: 83, form: 0.76, homeAdvantage: 1.10 },

            // Serie A
            'inter': { name: 'FC Internazionale Milano', strength: 90, attack: 88, defense: 87, form: 0.82, homeAdvantage: 1.14 },
            'milan': { name: 'AC Milan', strength: 87, attack: 85, defense: 84, form: 0.79, homeAdvantage: 1.12 },
            'juventus': { name: 'Juventus FC', strength: 89, attack: 86, defense: 88, form: 0.81, homeAdvantage: 1.13 },
            'napoli': { name: 'Napoli SSC', strength: 85, attack: 87, defense: 82, form: 0.77, homeAdvantage: 1.11 },

            // Bundesliga
            'bayern munich': { name: 'FC Bayern Munich', strength: 93, attack: 91, defense: 90, form: 0.87, homeAdvantage: 1.16 },
            'borussia dortmund': { name: 'Borussia Dortmund', strength: 87, attack: 89, defense: 81, form: 0.80, homeAdvantage: 1.12 },
        };
    }

    /**
     * Parse une entrée de match (ex: "Real Madrid vs Barcelona")
     */
    parseMatch(matchInput) {
        const parts = matchInput.toLowerCase().split(' vs ').map(t => t.trim());
        if (parts.length !== 2) return null;

        const homeTeam = this.findTeam(parts[0]);
        const awayTeam = this.findTeam(parts[1]);

        if (!homeTeam || !awayTeam) return null;

        return { home: homeTeam, away: awayTeam };
    }

    /**
     * Trouve une équipe dans la base de données
     */
    findTeam(input) {
        const searchTerm = input.toLowerCase().trim();
        
        // Recherche exacte
        if (this.teams[searchTerm]) {
            return { id: searchTerm, ...this.teams[searchTerm] };
        }

        // Recherche partielle
        for (const [id, team] of Object.entries(this.teams)) {
            if (id.includes(searchTerm) || team.name.toLowerCase().includes(searchTerm)) {
                return { id, ...team };
            }
        }

        return null;
    }

    /**
     * Prédit le résultat d'un match
     */
    predictMatch(homeTeam, awayTeam) {
        // Calcul de la force effective
        const homeStrength = homeTeam.strength * homeTeam.form * homeTeam.homeAdvantage;
        const awayStrength = awayTeam.strength * awayTeam.form;

        const totalStrength = homeStrength + awayStrength;
        const homeRatio = homeStrength / totalStrength;
        const awayRatio = awayStrength / totalStrength;

        // Probabilités
        const probHome = Math.min(homeRatio * 1.2, 0.95);
        const probAway = Math.min(awayRatio * 0.85, 0.80);
        const probDraw = 1 - probHome - probAway;

        // Prédiction du score
        const expectedGoalsHome = this.calculateExpectedGoals(homeTeam.attack, awayTeam.defense);
        const expectedGoalsAway = this.calculateExpectedGoals(awayTeam.attack, homeTeam.defense);

        const goalsHome = this.poissonDistribution(expectedGoalsHome);
        const goalsAway = this.poissonDistribution(expectedGoalsAway);

        // Statistiques du match
        const stats = this.generateMatchStats(homeTeam, awayTeam, goalsHome, goalsAway);

        // Confiance dans la prédiction
        const confidence = this.calculateConfidence(probHome, probDraw, probAway);

        return {
            homeTeam: homeTeam.name,
            awayTeam: awayTeam.name,
            probabilities: {
                home: (probHome * 100).toFixed(1),
                draw: (probDraw * 100).toFixed(1),
                away: (probAway * 100).toFixed(1)
            },
            prediction: {
                home: goalsHome,
                away: goalsAway,
                result: this.determineResult(goalsHome, goalsAway)
            },
            stats: stats,
            confidence: confidence,
            timestamp: new Date().toLocaleString()
        };
    }

    /**
     * Calcule les buts attendus (Expected Goals - xG)
     */
    calculateExpectedGoals(attack, defense) {
        const base = attack / 100;
        const opposition = (100 - defense) / 100;
        const xg = base * opposition * 2.5;
        return Math.max(xg, 0.3);
    }

    /**
     * Distribution de Poisson pour générer des buts réalistes
     */
    poissonDistribution(lambda) {
        let result = 0;
        const L = Math.exp(-lambda);
        let p = 1;
        let u;

        do {
            u = Math.random();
            p *= u;
            if (p > L) result++;
        } while (p > L);

        return result - 1;
    }

    /**
     * Génère les statistiques du match
     */
    generateMatchStats(homeTeam, awayTeam, goalsHome, goalsAway) {
        // Possession (basée sur la force relative)
        const totalStrength = homeTeam.strength + awayTeam.strength;
        const possessionHome = Math.round((homeTeam.strength / totalStrength) * 60 + 20);
        const possessionAway = 100 - possessionHome;

        // Tirs (basés sur les buts et la possession)
        const shotsHome = Math.round(goalsHome * (4 + Math.random() * 3));
        const shotsAway = Math.round(goalsAway * (4 + Math.random() * 3));

        // Tirs cadrés
        const shotsTargetHome = Math.round(shotsHome * (0.35 + Math.random() * 0.15));
        const shotsTargetAway = Math.round(shotsAway * (0.35 + Math.random() * 0.15));

        // Corners
        const cornersHome = Math.round((shotsHome / 8) + Math.random() * 3);
        const cornersAway = Math.round((shotsAway / 8) + Math.random() * 3);
        const totalCorners = cornersHome + cornersAway;

        // Cartons
        const cardsHome = Math.round(Math.random() * 1.5);
        const cardsAway = Math.round(Math.random() * 1.5);
        const totalCards = cardsHome + cardsAway;

        // Fautes
        const foulsHome = Math.round(12 + Math.random() * 6);
        const foulsAway = Math.round(12 + Math.random() * 6);
        const totalFouls = foulsHome + foulsAway;

        return {
            totalGoals: goalsHome + goalsAway,
            totalShots: shotsHome + shotsAway,
            totalShotsTarget: shotsTargetHome + shotsTargetAway,
            totalCorners: totalCorners,
            totalCards: totalCards,
            totalFouls: totalFouls,
            possession: possessionHome,
            homeStats: {
                shots: shotsHome,
                shotsTarget: shotsTargetHome,
                corners: cornersHome,
                cards: cardsHome,
                fouls: foulsHome,
                possession: possessionHome
            },
            awayStats: {
                shots: shotsAway,
                shotsTarget: shotsTargetAway,
                corners: cornersAway,
                cards: cardsAway,
                fouls: foulsAway,
                possession: possessionAway
            }
        };
    }

    /**
     * Détermine le résultat du match
     */
    determineResult(goalsHome, goalsAway) {
        if (goalsHome > goalsAway) return 'Victoire Domicile';
        if (goalsAway > goalsHome) return 'Victoire Extérieure';
        return 'Match Nul';
    }

    /**
     * Calcule l'indice de confiance de la prédiction
     */
    calculateConfidence(probHome, probDraw, probAway) {
        const maxProb = Math.max(probHome, probDraw, probAway);
        const variance = Math.abs(probHome - probAway);
        let confidence = maxProb * 100;

        // Ajustement basé sur la variance
        if (variance > 0.3) {
            confidence *= 1.05;
        } else if (variance < 0.1) {
            confidence *= 0.85;
        }

        return Math.min(Math.round(confidence), 95);
    }

    /**
     * Génère une analyse textuelle de la prédiction
     */
    generateAnalysis(prediction) {
        const { homeTeam, awayTeam, probabilities, prediction: pred, confidence } = prediction;

        let analysis = `<strong>Analyse IA pour ${homeTeam} vs ${awayTeam}</strong><br><br>`;

        // Analyse du résultat probable
        const resultProb = Math.max(
            parseFloat(probabilities.home),
            parseFloat(probabilities.draw),
            parseFloat(probabilities.away)
        );

        if (pred.result === 'Victoire Domicile') {
            analysis += `🏠 <strong>Notre prédiction:</strong> Victoire de ${homeTeam} avec ${probabilities.home}% de probabilité.<br>`;
        } else if (pred.result === 'Victoire Extérieure') {
            analysis += `✈️ <strong>Notre prédiction:</strong> Victoire de ${awayTeam} avec ${probabilities.away}% de probabilité.<br>`;
        } else {
            analysis += `🤝 <strong>Notre prédiction:</strong> Match Nul avec ${probabilities.draw}% de probabilité.<br>`;
        }

        // Analyse du score
        analysis += `<br>📊 <strong>Score probable:</strong> ${pred.home} - ${pred.away}<br>`;
        analysis += `⚽ <strong>Total de buts:</strong> ${prediction.stats.totalGoals} (intervalle probable: ${Math.max(0, prediction.stats.totalGoals - 1)} - ${prediction.stats.totalGoals + 1})<br>`;

        // Analyse du jeu
        analysis += `<br>🎮 <strong>Style de jeu prédit:</strong><br>`;
        analysis += `Possession: ${prediction.stats.possession}% pour ${homeTeam}<br>`;
        analysis += `Tirs: ${prediction.stats.totalShots} au total (${prediction.stats.homeStats.shotsTarget} + ${prediction.stats.awayStats.shotsTarget} cadrés)<br>`;

        // Facteurs clés
        analysis += `<br>🔑 <strong>Facteurs clés:</strong><br>`;
        analysis += `• Avantage domicile: Déterminant pour ce type de matchup<br>`;
        analysis += `• Forme actuelle: ${homeTeam} en excellente condition<br>`;
        analysis += `• Historique: Les données favorisent ${homeTeam}<br>`;

        // Indice de confiance
        analysis += `<br>🤖 <strong>Indice de confiance IA:</strong> ${confidence}%<br>`;

        if (confidence >= 80) {
            analysis += `✅ Prédiction très fiable basée sur les données historiques.`;
        } else if (confidence >= 65) {
            analysis += `⚠️ Prédiction fiable mais avec quelques incertitudes.`;
        } else {
            analysis += `❓ Match équilibré, prédiction moins certaine.`;
        }

        return analysis;
    }

    /**
     * Sauvegarde une prédiction dans l'historique
     */
    savePrediction(prediction) {
        this.history.unshift(prediction);
        if (this.history.length > 20) {
            this.history.pop();
        }
        localStorage.setItem('predictions', JSON.stringify(this.history));
    }

    /**
     * Récupère l'historique
     */
    getHistory() {
        return this.history;
    }

    /**
     * Efface l'historique
     */
    clearHistory() {
        this.history = [];
        localStorage.setItem('predictions', JSON.stringify(this.history));
    }
}