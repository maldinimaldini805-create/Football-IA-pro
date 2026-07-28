// =====================================
// FOOTBALL AI PRO 3.1
// CORNER MODEL
// =====================================

class CornerModel {

    calculate(home, away) {

        const homeAttack = home.attackRating || 50;
        const awayAttack = away.attackRating || 50;

        const homePossession = home.possession || 50;
        const awayPossession = away.possession || 50;

        const homeShots = home.shots || 10;
        const awayShots = away.shots || 10;

        const homeShotsOnTarget = home.shotsOnTarget || 4;
        const awayShotsOnTarget = away.shotsOnTarget || 4;

        const homeCorners = Math.round(
            (homeAttack * 0.04) +
            (homePossession * 0.03) +
            (homeShots * 0.35) +
            (homeShotsOnTarget * 0.60)
        );

        const awayCorners = Math.round(
            (awayAttack * 0.04) +
            (awayPossession * 0.03) +
            (awayShots * 0.35) +
            (awayShotsOnTarget * 0.60)
        );

        const totalCorners =
            homeCorners + awayCorners;

        return {

            home: homeCorners,

            away: awayCorners,

            total: totalCorners,

            firstCorner:
                homeAttack >= awayAttack
                    ? "HOME"
                    : "AWAY",

            confidence:
                Math.min(
                    95,
                    60 + Math.round(totalCorners / 2)
                )

        };

    }

}

export default new CornerModel();
