/**
 * Football AI Pro - Moteur de Prédiction IA
 * Système de prédiction intelligent pour les matchs de football
 * VERSION 2.1 - Améliorée avec alias et plus d'équipes
 */

class FootballAIPredictor {
    constructor() {
        // Base de données des équipes et leurs statistiques
        this.teams = this.initializeTeams();
        this.aliases = this.initializeAliases();
        this.history = JSON.parse(localStorage.getItem('predictions')) || [];
    }

    /**
     * Initialise la base de données des équipes avec leurs statistiques
     */
    initializeTeams() {
        return {
            // ===== LIGUE 1 (FRANCE) =====
            'psg': { name: 'Paris Saint-Germain', strength: 94, attack: 92, defense: 88, form: 0.85, homeAdvantage: 1.15, league: 'Ligue 1' },
            'lyon': { name: 'Olympique Lyonnais', strength: 85, attack: 82, defense: 84, form: 0.78, homeAdvantage: 1.12, league: 'Ligue 1' },
            'marseille': { name: 'Olympique Marseille', strength: 83, attack: 80, defense: 81, form: 0.75, homeAdvantage: 1.10, league: 'Ligue 1' },
            'monaco': { name: 'AS Monaco', strength: 82, attack: 85, defense: 76, form: 0.80, homeAdvantage: 1.08, league: 'Ligue 1' },
            'nice': { name: 'OGC Nice', strength: 78, attack: 76, defense: 78, form: 0.72, homeAdvantage: 1.06, league: 'Ligue 1' },
            'lens': { name: 'RC Lens', strength: 76, attack: 74, defense: 75, form: 0.70, homeAdvantage: 1.05, league: 'Ligue 1' },
            'rennes': { name: 'Stade Rennais FC', strength: 75, attack: 73, defense: 74, form: 0.69, homeAdvantage: 1.04, league: 'Ligue 1' },
            'lille': { name: 'LOSC Lille', strength: 80, attack: 78, defense: 81, form: 0.77, homeAdvantage: 1.09, league: 'Ligue 1' },

            // ===== PREMIER LEAGUE (ANGLETERRE) =====
            'manchester city': { name: 'Manchester City', strength: 96, attack: 94, defense: 91, form: 0.88, homeAdvantage: 1.18, league: 'Premier League' },
            'manchester united': { name: 'Manchester United', strength: 90, attack: 87, defense: 85, form: 0.82, homeAdvantage: 1.15, league: 'Premier League' },
            'liverpool': { name: 'Liverpool FC', strength: 91, attack: 89, defense: 87, form: 0.83, homeAdvantage: 1.16, league: 'Premier League' },
            'chelsea': { name: 'Chelsea FC', strength: 88, attack: 84, defense: 86, form: 0.79, homeAdvantage: 1.13, league: 'Premier League' },
            'arsenal': { name: 'Arsenal FC', strength: 87, attack: 86, defense: 83, form: 0.81, homeAdvantage: 1.12, league: 'Premier League' },
            'tottenham': { name: 'Tottenham Hotspur', strength: 86, attack: 85, defense: 82, form: 0.80, homeAdvantage: 1.11, league: 'Premier League' },
            'brighton': { name: 'Brighton & Hove Albion', strength: 82, attack: 80, defense: 81, form: 0.75, homeAdvantage: 1.08, league: 'Premier League' },
            'newcastle': { name: 'Newcastle United', strength: 84, attack: 82, defense: 80, form: 0.77, homeAdvantage: 1.10, league: 'Premier League' },
            'aston villa': { name: 'Aston Villa', strength: 85, attack: 83, defense: 82, form: 0.78, homeAdvantage: 1.09, league: 'Premier League' },

            // ===== LA LIGA (ESPAGNE) =====
            'real madrid': { name: 'Real Madrid CF', strength: 95, attack: 93, defense: 89, form: 0.86, homeAdvantage: 1.17, league: 'La Liga' },
            'barcelona': { name: 'FC Barcelona', strength: 92, attack: 91, defense: 86, form: 0.84, homeAdvantage: 1.15, league: 'La Liga' },
            'atletico madrid': { name: 'Atlético Madrid', strength: 88, attack: 85, defense: 89, form: 0.81, homeAdvantage: 1.12, league: 'La Liga' },
            'sevilla': { name: 'Sevilla FC', strength: 84, attack: 82, defense: 83, form: 0.76, homeAdvantage: 1.10, league: 'La Liga' },
            'villarreal': { name: 'Villarreal CF', strength: 82, attack: 81, defense: 80, form: 0.74, homeAdvantage: 1.07, league: 'La Liga' },
            'real sociedad': { name: 'Real Sociedad', strength: 80, attack: 79, defense: 78, form: 0.72, homeAdvantage: 1.06, league: 'La Liga' },
            'betis': { name: 'Real Betis', strength: 79, attack: 77, defense: 77, form: 0.71, homeAdvantage: 1.05, league: 'La Liga' },

            // ===== SERIE A (ITALIE) =====
            'inter': { name: 'FC Internazionale Milano', strength: 90, attack: 88, defense: 87, form: 0.82, homeAdvantage: 1.14, league: 'Serie A' },
            'milan': { name: 'AC Milan', strength: 87, attack: 85, defense: 84, form: 0.79, homeAdvantage: 1.12, league: 'Serie A' },
            'juventus': { name: 'Juventus FC', strength: 89, attack: 86, defense: 88, form: 0.81, homeAdvantage: 1.13, league: 'Serie A' },
            'napoli': { name: 'Napoli SSC', strength: 85, attack: 87, defense: 82, form: 0.77, homeAdvantage: 1.11, league: 'Serie A' },
            'roma': { name: 'AS Roma', strength: 81, attack: 80, defense: 79, form: 0.73, homeAdvantage: 1.08, league: 'Serie A' },
            'lazio': { name: 'SS Lazio', strength: 80, attack: 79, defense: 78, form: 0.72, homeAdvantage: 1.07, league: 'Serie A' },
            'fiorentina': { name: 'ACF Fiorentina', strength: 78, attack: 77, defense: 76, form: 0.70, homeAdvantage: 1.05, league: 'Serie A' },

            // ===== BUNDESLIGA (ALLEMAGNE) =====
            'bayern munich': { name: 'FC Bayern Munich', strength: 93, attack: 91, defense: 90, form: 0.87, homeAdvantage: 1.16, league: 'Bundesliga' },
            'borussia dortmund': { name: 'Borussia Dortmund', strength: 87, attack: 89, defense: 81, form: 0.80, homeAdvantage: 1.12, league: 'Bundesliga' },
            'bayer leverkusen': { name: 'Bayer Leverkusen', strength: 86, attack: 88, defense: 80, form: 0.79, homeAdvantage: 1.11, league: 'Bundesliga' },
            'rb leipzig': { name: 'RB Leipzig', strength: 85, attack: 87, defense: 79, form: 0.77, homeAdvantage: 1.10, league: 'Bundesliga' },
            'borussia monchengladbach': { name: 'Borussia Mönchengladbach', strength: 80, attack: 78, defense: 78, form: 0.72, homeAdvantage: 1.06, league: 'Bundesliga' },
            'schalke': { name: 'FC Schalke 04', strength: 74, attack: 72, defense: 73, form: 0.66, homeAdvantage: 1.04, league: 'Bundesliga' },

            // ===== LIGUE DES CHAMPIONS (ÉQUIPES ADDITIONNELLES) =====
            'benfica': { name: 'SL Benfica', strength: 83, attack: 81, defense: 80, form: 0.75, homeAdvantage: 1.09, league: 'Portugal' },
            'porto': { name: 'FC Porto', strength: 82, attack: 80, defense: 79, form: 0.74, homeAdvantage: 1.08, league: 'Portugal' },
            'ajax': { name: 'AFC Ajax', strength: 84, attack: 83, defense: 81, form: 0.76, homeAdvantage: 1.10, league: 'Pays-Bas' },
            'psv': { name: 'PSV Eindhoven', strength: 81, attack: 79, defense: 78, form: 0.73, homeAdvantage: 1.07, league: 'Pays-Bas' },
            'galatasaray': { name: 'Galatasaray', strength: 79, attack: 77, defense: 77, form: 0.71, homeAdvantage: 1.06, league: 'Turquie' },
            'fenerbahce': { name: 'Fenerbahçe', strength: 78, attack: 76, defense: 76, form: 0.70, homeAdvantage: 1.05, league: 'Turquie' },
            'celtic': { name: 'Celtic FC', strength: 76, attack: 74, defense: 74, form: 0.68, homeAdvantage: 1.04, league: 'Écosse' },
            'rangers': { name: 'Rangers FC', strength: 75, attack: 73, defense: 73, form: 0.67, homeAdvantage: 1.03, league: 'Écosse' },
        };
    }

    /**
     * Initialise les alias des équipes pour une meilleure détection
     */
    initializeAliases() {
        return {
            // LIGUE 1
            'psg': ['paris', 'paris sg', 'psg', 'paris saint-germain', 'psj'],
            'lyon': ['lyon', 'ol', 'olympique lyonnais', 'lyonnais'],
            'marseille': ['marseille', 'om', 'olympique marseille', 'omf'],
            'monaco': ['monaco', 'as monaco', 'asm'],
            'nice': ['nice', 'ogc nice', 'nice ogc'],
            'lens': ['lens', 'rc lens', 'lensois'],
            'rennes': ['rennes', 'stade rennais', 'srfc'],
            'lille': ['lille', 'losc', 'losc lille', 'lillois'],

            // PREMIER LEAGUE
            'manchester city': ['man city', 'manchester city', 'city', 'man c', 'mci'],
            'manchester united': ['man united', 'manchester united', 'united', 'man u', 'mu', 'mud'],
            'liverpool': ['liverpool', 'liverpool fc', 'lfc'],
            'chelsea': ['chelsea', 'chelsea fc', 'cfc'],
            'arsenal': ['arsenal', 'arsenal fc', 'afc'],
            'tottenham': ['tottenham', 'tottenham hotspur', 'spurs', 'thfc'],
            'brighton': ['brighton', 'brighton hove albion', 'bha'],
            'newcastle': ['newcastle', 'newcastle united', 'nufc'],
            'aston villa': ['aston villa', 'villa', 'avfc'],

            // LA LIGA
            'real madrid': ['real madrid', 'real', 'rm', 'madrid'],
            'barcelona': ['barcelona', 'barca', 'fcb', 'barca'],
            'atletico madrid': ['atletico madrid', 'atletico', 'atletico madrid'],
            'sevilla': ['sevilla', 'sevilla fc', 'sfc'],
            'villarreal': ['villarreal', 'villarreal cf'],
            'real sociedad': ['real sociedad', 'sociedad', 'rsoc'],
            'betis': ['betis', 'real betis'],

            // SERIE A
            'inter': ['inter', 'internazionale', 'inter milan', 'fc internazionale'],
            'milan': ['milan', 'ac milan', 'acm'],
            'juventus': ['juventus', 'juve', 'jfc'],
            'napoli': ['napoli', 'napoli ssc', 'nsc'],
            'roma': ['roma', 'as roma', 'asr'],
            'lazio': ['lazio', 'ss lazio', 'ssl'],
            'fiorentina': ['fiorentina', 'acf fiorentina'],

            // BUNDESLIGA
            'bayern munich': ['bayern', 'bayern munich', 'fc bayern'],
            'borussia dortmund': ['dortmund', 'borussia dortmund', 'bvb'],
            'bayer leverkusen': ['leverkusen', 'bayer leverkusen', 'bayer'],
            'rb leipzig': ['leipzig', 'rb leipzig', 'rbl'],
            'borussia monchengladbach': ['gladbach', 'monchengladbach', 'bmg'],
            'schalke': ['schalke', 'schalke 04', 'fc schalke'],

            // ÉQUIPES ADDITIONNELLES
            'benfica': ['benfica', 'sl benfica'],
            'porto': ['porto', 'fc porto'],
            'ajax': ['ajax', 'afc ajax'],
            'psv': ['psv', 'psv eindhoven'],
            'galatasaray': ['galatasaray', 'gala'],
            'fenerbahce': ['fenerbahce', 'fenerbahce'],
            'celtic': ['celtic', 'celtic fc'],
            'rangers': ['rangers', 'rangers fc'],
        };
    }

    /**
     * Parse une entrée de match (ex: "Real Madrid vs Barcelona")
     * Accepte différents formats séparateurs
     */
    parseMatch(matchInput) {
        // Accepte différents séparateurs
        let parts = matchInput.toLowerCase()
            .split(/\s+vs\.?\s+|\s+v\.?\s+|\s+-\s+/)
            .map(t => t.trim())
            .filter(t => t.length > 0);

        if (parts.length !== 2) return null;

        const homeTeam = this.findTeam(parts[0]);
        const awayTeam = this.findTeam(parts[1]);

        if (!homeTeam || !awayTeam) return null;
        if (homeTeam.id === awayTeam.id) return null; // Évite le même équipe

        return { home: homeTeam, away: awayTeam };
    }

    /**
     * Trouve une équipe dans la base de données avec système d'alias
     */
    findTeam(input) {
        const searchTerm = input.toLowerCase().trim();
        
        // Recherche exacte dans la base de données
        if (this.teams[searchTerm]) {
            return { id: searchTerm, ...this.teams[searchTerm] };
        }

        // Recherche par alias
        for (const [teamId, aliases] of Object.entries(this.aliases)) {
            if (aliases.includes(searchTerm)) {
                return { id: teamId, ...this.teams[teamId] };
            }
        }

        // Recherche partielle (si aucune correspondance exacte)
        for (const [id, team] of Object.entries(this.teams)) {
            if (id.includes(searchTerm) || team.name.toLowerCase().includes(searchTerm)) {
                return { id, ...team };
            }
        }

        // Recherche floue (Levenshtein-like)
        let bestMatch = null;
        let bestScore = 0;

        for (const [id, team] of Object.entries(this.teams)) {
            const score = this.calculateSimilarity(searchTerm, id) + 
                         this.calculateSimilarity(searchTerm, team.name.toLowerCase()) / 2;
            if (score > bestScore && score > 0.5) {
                bestScore = score;
                bestMatch = { id, ...team };
            }
        }

        return bestMatch;
    }

    /**
     * Calcule la similarité entre deux chaînes (simple)
     */
    calculateSimilarity(str1, str2) {
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;
        
        if (longer.length === 0) return 1.0;
        
        const editDistance = this.getEditDistance(longer, shorter);
        return (longer.length - editDistance) / longer.length;
    }

    /**
     * Distance d'édition (Levenshtein distance)
     */
    getEditDistance(s1, s2) {
        const costs = [];
        for (let i = 0; i <= s1.length; i++) {
            let lastValue = i;
            for (let j = 0; j <= s2.length; j++) {
                if (i === 0) {
                    costs[j] = j;
                } else if (j > 0) {
                    let newValue = costs[j - 1];
                    if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
                        newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                    }
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
            if (i > 0) costs[s2.length] = lastValue;
        }
        return costs[s2.length];
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
            homeLeague: homeTeam.league,
            awayLeague: awayTeam.league,
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
        const { homeTeam, awayTeam, homeLeague, awayLeague, probabilities, prediction: pred, confidence } = prediction;

        let analysis = `<strong>Analyse IA pour ${homeTeam} vs ${awayTeam}</strong>`;
        if (homeLeague) analysis += `<br><span style="font-size: 12px; color: #999;">${homeLeague} vs ${awayLeague}</span>`;
        analysis += `<br><br>`;

        // Analyse du résultat probable
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

    /**
     * Retourne la liste des équipes disponibles
     */
    getAvailableTeams() {
        return Object.entries(this.teams).map(([id, team]) => ({
            id,
            name: team.name,
            league: team.league
        }));
    }

    /**
     * Retourne les alias d'une équipe
     */
    getTeamAliases(teamId) {
        return this.aliases[teamId] || [];
    }
}
