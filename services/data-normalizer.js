// =====================================
// FOOTBALL AI PRO 3.1
// DATA NORMALIZER
// =====================================

class DataNormalizer {

    // ==============================
    // NORMALISATION EQUIPE
    // ==============================

    normalizeTeamStats(rawStats) {

        if (!rawStats) {

            return {

                attack: {
                    shots: 0,
                    shotsOnTarget: 0,
                    goals: 0
                },

                defense: {
                    goalsConceded: 0
                },

                possession: 0,
                corners: 0,
                fouls: 0,
                yellowCards: 0

            };

        }

        return {

            attack: {

                shots:
                    rawStats.shots?.total || 0,

                shotsOnTarget:
                    rawStats.shots?.on || 0,

                goals:
                    rawStats.goals?.for?.total?.total || 0

            },

            defense: {

                goalsConceded:
                    rawStats.goals?.against?.total || 0

            },

            possession:
                rawStats.possession || 0,

            corners:
                rawStats.corners?.total || 0,

            fouls:
                rawStats.fouls?.committed || 0,

            yellowCards:
                rawStats.cards?.yellow || 0

        };

    }

    // ==============================
    // NORMALISATION MATCH
    // ==============================

    normalizeMatch(home, away) {

        return {

            homeTeam: {

                name:
                    home.team?.name || "",

                id:
                    home.team?.id || null

            },

            awayTeam: {

                name:
                    away.team?.name || "",

                id:
                    away.team?.id || null

            },

            goals: {

                home:
                    home.goals || 0,

                away:
                    away.goals || 0

            },

            statistics: {

                home:
                    this.normalizeTeamStats(
                        home.statistics
                    ),

                away:
                    this.normalizeTeamStats(
                        away.statistics
                    )

            }

        };

    }

    // ==============================
    // PUISSANCE OFFENSIVE
    // ==============================

    calculateAttackPower(stats) {

        if (!stats) return 50;

        let power = 0;

        power += stats.shots * 2;
        power += stats.shotsOnTarget * 5;
        power += stats.goals * 10;

        return Math.min(
            Math.round(power),
            100
        );

    }

    // ==============================
    // PUISSANCE DEFENSIVE
    // ==============================

    calculateDefensePower(stats) {

        if (!stats) return 50;

        let value = 100;

        value -= stats.goalsConceded * 10;

        return Math.max(
            Math.round(value),
            0
        );

    }

    // ==============================
    // PROFIL IA
    // ==============================

    createAIProfile(teamStats) {

        return {

            attackRating:
                this.calculateAttackPower(
                    teamStats.attack
                ),

            defenseRating:
                this.calculateDefensePower(
                    teamStats.defense
                ),

            shots:
                teamStats.attack.shots,

            shotsOnTarget:
                teamStats.attack.shotsOnTarget,

            possession:
                teamStats.possession,

            corners:
                teamStats.corners,

            yellowCards:
                teamStats.yellowCards,

            fouls:
                teamStats.fouls

        };

    }

}

export default new DataNormalizer();
