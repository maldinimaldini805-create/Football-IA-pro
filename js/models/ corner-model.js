// =====================================
// FOOTBALL AI PRO 4.1
// CORNER MODEL
// =====================================

class CornerModel {

    calculate(home, away) {

        const homeCorners =
            home.corners ?? 0;

        const awayCorners =
            away.corners ?? 0;

        const totalCorners =
            homeCorners + awayCorners;

        let prediction = "Moins de 9.5 corners";

        if (totalCorners >= 10) {

            prediction = "Plus de 9.5 corners";

        }

        return {

            homeCorners,

            awayCorners,

            totalCorners,

            averageCorners:
                Number((totalCorners / 2).toFixed(1)),

            prediction,

            firstCorner:

                homeCorners >= awayCorners

                    ? home.name

                    : away.name

        };

    }

}

export default new CornerModel();
