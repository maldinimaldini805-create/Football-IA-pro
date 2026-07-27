async function analyserMatch(homeTeamName, awayTeamName) {

    const matchs = await chargerMatchs();

    const home = TEAMS.find(t => t.nom === homeTeamName);
    const away = TEAMS.find(t => t.nom === awayTeamName);

    if (!home || !away) {
        return {
            erreur: "Equipe introuvable."
        };
    }

    const prediction = calculerPrediction(home, away);

    const miTemps = predictionPremiereMiTemps(home, away);

    const finMatch = predictionFinMatch(home, away);

    const evenements = predireEvenements(home, away);

    return {

        home,

        away,

        prediction,

        miTemps,

        finMatch,

        evenements,

        matchs

    };

}


