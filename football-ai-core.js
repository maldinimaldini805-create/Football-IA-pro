// =========================================
// FOOTBALL AI PRO 2.1
// CORE ENGINE
// =========================================

function analyserMatch(homeTeamName, awayTeamName) {

    const home = TEAMS.find(t => t.nom === homeTeamName);
    const away = TEAMS.find(t => t.nom === awayTeamName);

    if (!home || !away) {
        return {
            erreur: "Equipe introuvable."
        };
    }

    const prediction = calculerPrediction(home, away);

    const events = predireEvenements(home, away);

    return {

        equipeDomicile: home.nom,
        equipeExterieure: away.nom,

        prediction,

        events

    };

}
