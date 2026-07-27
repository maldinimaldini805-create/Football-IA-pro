// ===============================
// FOOTBALL AI PRO 2.1
// MOTEUR IA - VERSION 1
// ===============================

function predictionIA(home, away) {

    const homeStrength = Math.floor(Math.random() * 30) + 60;
    const awayStrength = Math.floor(Math.random() * 30) + 50;

    const homeWin = Math.round(homeStrength * 0.6);
    const draw = Math.round(100 - (homeWin + 20));
    const awayWin = 100 - homeWin - draw;

    return {

        domicile: homeWin + "%",
        nul: draw + "%",
        exterieur: awayWin + "%",

        score: "2 - 1",

        buts: 3,
        tirs: 24,
        tirsCadres: 10,
        corners: 9,
        cartons: 4,
        fautes: 22,
        touches: 38,
        degagements: 27,
        possession: "55% - 45%",

        premierBut: home,
        premierTirCadre: home,
        premierCorner: home,
        premiereTouche: away,
        premierDegagement: away,
        premiereFaute: away,
        premierCarton: away,

        confiance: "82%"
    };

}

