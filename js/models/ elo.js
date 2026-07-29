// =====================================
// FOOTBALL AI PRO 4.1
// ELO MODEL
// =====================================

class EloModel {

    calculate(home, away) {

        const homeElo =
            home.elo ?? 1500;

        const awayElo =
            away.elo ?? 1500;

        const difference =
            homeElo - awayElo;

        const expectedHomeWin =
            1 / (1 + Math.pow(10, (awayElo - homeElo) / 400));

        const expectedAwayWin =
            1 - expectedHomeWin;

        let winner = "Draw";

        if (expectedHomeWin >= 0.55) {

            winner = home.name;

        }

        else if (expectedAwayWin >= 0.55) {

            winner = away.name;

        }

        return {

            homeElo,

            awayElo,

            difference,

            expectedHomeWin:
                Number((expectedHomeWin * 100).toFixed(1)),

            expectedAwayWin:
                Number((expectedAwayWin * 100).toFixed(1)),

            winner

        };

    }

}

export default new EloModel();
