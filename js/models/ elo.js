// =====================================
// FOOTBALL AI PRO 3.2
// ELO MODEL
// =====================================

class EloModel {

    calculate(home, away) {

        const homeElo = home.elo || 1500;
        const awayElo = away.elo || 1500;

        const difference = homeElo - awayElo;

        let winner = "Draw";

        if (difference > 50) {

            winner = home.name;

        } else if (difference < -50) {

            winner = away.name;

        }

        return {

            homeElo,

            awayElo,

            difference,

            winner

        };

    }

}

export default new EloModel();
