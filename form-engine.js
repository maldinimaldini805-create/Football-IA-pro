// =====================================
// FOOTBALL AI PRO 3.0
// FORM ENGINE
// =====================================

class FormEngine {

    analyser(lastMatches = []) {

        let victoires = 0;
        let nuls = 0;
        let defaites = 0;
        let butsPour = 0;
        let butsContre = 0;

        for (const match of lastMatches) {

            butsPour += match.goalsFor || 0;
            butsContre += match.goalsAgainst || 0;

            switch (match.result) {
                case "W":
                    victoires++;
                    break;

                case "D":
                    nuls++;
                    break;

                case "L":
                    defaites++;
                    break;
            }

        }

        return {

            victoires,
            nuls,
            defaites,

            butsPour,
            butsContre,

            forme:
                victoires * 3 +
                nuls

        };

    }

}

export default new FormEngine();
