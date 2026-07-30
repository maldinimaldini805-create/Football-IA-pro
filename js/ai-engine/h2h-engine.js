// =====================================
// FOOTBALL AI PRO 4.1
// H2H ENGINE
// =====================================

class H2HEngine {

    analyser(matches = []) {

        const total = matches.length;

        let homeWins = 0;
        let awayWins = 0;
        let draws = 0;

        matches.forEach(match => {

            if (match.homeGoals > match.awayGoals) {

                homeWins++;

            } else if (match.homeGoals < match.awayGoals) {

                awayWins++;

            } else {

                draws++;

            }

        });

        return {

            total,

            homeWins,

            awayWins,

            draws

        };

    }

}

export default new H2HEngine();
