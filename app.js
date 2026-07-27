async function analyseMatch() {

    const texte = document.getElementById("search").value;

    if (!texte) {
        alert("Saisissez un match (ex : PSG vs Real Madrid)");
        return;
    }

    const equipes = texte.split(" vs ");

    if (equipes.length !== 2) {
        alert("Utilisez le format : Equipe A vs Equipe B");
        return;
    }

    const resultat = await analyserMatch(
        equipes[0].trim(),
        equipes[1].trim()
    );

    if (resultat.erreur) {
        alert(resultat.erreur);
        return;
    }

    document.getElementById("home").innerHTML =
        resultat.prediction.home + "%";

    document.getElementById("draw").innerHTML =
        resultat.prediction.draw + "%";

    document.getElementById("away").innerHTML =
        resultat.prediction.away + "%";

    document.getElementById("score").innerHTML =
        resultat.finMatch.scoreFinal;

    document.getElementById("confidence").innerHTML =
        resultat.prediction.confiance + "%";

    document.getElementById("confidenceBar").style.width =
        resultat.prediction.confiance + "%";
}
