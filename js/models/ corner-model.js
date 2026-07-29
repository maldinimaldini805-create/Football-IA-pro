// =====================================
// FOOTBALL AI PRO 3.2
// CORNER MODEL
// =====================================

class CornerModel {

    calculate(home, away) {

        const homeCorners =
            home.corners || 0;

        const awayCorners =
            away.corners || 0;

        const totalCorners =
            homeCorners + awayCorners;

        return {

            homeCorners,

            awayCorners,

            totalCorners,

            prediction:

                totalCorners >= 10
                    ? "Plus de 9.5 corners"
                    : "Moins de 9.5 corners"

        };

    }

}

export default new CornerModel();
