// =====================================
// FOOTBALL AI PRO 2.1
// MOTEUR STATISTIQUE
// =====================================

function calculerForces(equipe){

    return (

        equipe.attaque * 0.40 +

        equipe.defense * 0.30 +

        equipe.forme * 0.30

    );

}

function comparerEquipes(home,away){

    const forceHome = calculerForces(home);

    const forceAway = calculerForces(away);

    return {

        forceHome,

        forceAway,

        avantage: forceHome-forceAway

    };

}
