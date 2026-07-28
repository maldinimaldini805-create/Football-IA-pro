// =====================================
// FOOTBALL AI PRO 3.1
// CORNER MODEL
// =====================================

class CornerModel {

    predict(home, away) {

        const homeAttack = home.attackRating || 50;
        const awayAttack = away.attackRating || 50;

        const homePossession = home.possession || 50;
        const awayPossession = away.possession || 50;

        const homeShots = home.shots || 10;
        const awayShots = away.shots || 10;

        const homeCorners = Math.round(
            (homeAttack * 0.05) +
            (homePossession * 0.04) +
            (homeShots * 0.30)
        );

        const awayCorners = Math.round(
            (awayAttack * 0.05) +
            (awayPossession * 0.04) +
            (awayShots * 0.30)
        );

        return {

            home: homeCorners,

            away: awayCorners,

            total: homeCorners + awayCorners,

            firstCorner:
                homeAttack >= awayAttack
                    ? "HOME"
                    : "AWAY"

        };

    }

}

export default new CornerModel();
