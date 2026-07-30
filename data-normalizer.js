// =====================================
// FOOTBALL AI PRO 4.1
// DATA NORMALIZER
// =====================================

class DataNormalizer {

    createAIProfile(data) {

        return {

            id: data.id,

            name: data.name,

            attack: {

                goals:
                    data.attack?.goals ?? 0,

                shots:
                    data.attack?.shots ?? 0,

                shotsOnTarget:
                    data.attack?.shotsOnTarget ?? 0

            },

            defense: {

                goalsConceded:
                    data.defense?.goalsConceded ?? 0

            },

            possession:
                data.possession ?? 50,

            corners:
                data.corners ?? 0,

            fouls:
                data.fouls ?? 0,

            yellowCards:
                data.yellowCards ?? 0,

            redCards:
                data.redCards ?? 0,

            elo:
                data.elo ?? 1500,

            form:
                data.form ?? [],

            injuries:
                data.injuries ?? [],

            lineup:
                data.lineup ?? [],

            statistics: {

                wins:
                    data.statistics?.wins ?? 0,

                draws:
                    data.statistics?.draws ?? 0,

                losses:
                    data.statistics?.losses ?? 0,

                cleanSheets:
                    data.statistics?.cleanSheets ?? 0

            }

        };

    }

}

export default new DataNormalizer();
