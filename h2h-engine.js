// =====================================
// FOOTBALL AI PRO 3.0
// H2H ENGINE
// =====================================

class H2HEngine {

    analyser(matchs = []) {

        let domicile = 0;
        let exterieur = 0;
        let nuls = 0;

        for (const match of matchs) {

            if (match.result === "HOME") {
                domicile++;
            } else if (match.result === "AWAY") {
                exterieur++;
            } else {
                nuls++;
            }

        }

        return {

            victoiresDomicile: domicile,

            victoiresExterieur: exterieur,

            matchsNuls: nuls,

            total: matchs.length

        };

    }

}

export default new H2HEngine();
