// =====================================
// FOOTBALL AI PRO 3.2
// DATA NORMALIZER
// =====================================

class DataNormalizer {

    normalizeTeam(team) {

        return {

            id: team.id,

            name: team.name,

            attack: {

                goals: team.goals || 0,

                shots: team.shots || 0,

                shotsOnTarget: team.shotsOnTarget || 0

            },

            defense: {

                goalsConceded: team.goalsConceded || 0

            },

            possession: team.possession || 50,

            corners: team.corners || 0,

            yellowCards: team.yellowCards || 0,

            fouls: team.fouls || 0,

            elo: team.elo || 1500

        };

    }

    createAIProfile(team) {

        return this.normalizeTeam(team);

    }

}

export default new DataNormalizer();
