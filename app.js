function analyseMatch() {

    const texte = document.getElementById("search").value;

    if (texte === "") {
        alert("Veuillez saisir un match.");
        return;
    }

    let equipes = texte.split(" vs ");

    if (equipes.length !== 2) {
        alert("Utilisez le format : PSG vs Marseille");
        return;
    }

    let domicile = equipes[0].trim();
    let exterieur = equipes[1].trim();

    let resultat = predictionIA(domicile, exterieur);

    document.getElementById("home").innerHTML = resultat.domicile;
    document.getElementById("draw").innerHTML = resultat.nul;
    document.getElementById("away").innerHTML = resultat.exterieur;

    document.getElementById("score").innerHTML = resultat.score;

    document.getElementById("goals").innerHTML = resultat.buts;
    document.getElementById("shots").innerHTML = resultat.tirs;
    document.getElementById("shotsTarget").innerHTML = resultat.tirsCadres;
    document.getElementById("corners").innerHTML = resultat.corners;
    document.getElementById("cards").innerHTML = resultat.cartons;
    document.getElementById("fouls").innerHTML = resultat.fautes;
    document.getElementById("possession").innerHTML = resultat.possession;

    document.getElementById("confidence").innerHTML = resultat.confiance;
    document.getElementById("confidenceBar").style.width = resultat.confiance;
}
