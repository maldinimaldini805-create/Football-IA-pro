// ======================================
// FOOTBALL AI PRO 2.1
// PREDICTION ENGINE V2
// ======================================

function calculerPrediction(home, away) {

    const comparaison = comparerEquipes(home, away);

    let homeWin = 45 + comparaison.avantage * 0.6;

    if (homeWin > 90) homeWin = 90;
    if (homeWin < 10) homeWin = 10;

    let draw = 25;

    let awayWin = 100 - homeWin - draw;

    return {

        home: Math.round(homeWin),

        draw: Math.round(draw),

        away: Math.round(awayWin),

        confiance: Math.round(
            Math.abs(comparaison.avantage) + 70
        )

    };

}
