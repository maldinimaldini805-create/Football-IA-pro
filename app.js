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
}// =====================================
// FOOTBALL AI PRO 2.1
// Chargement automatique des matchs
// =====================================

document.addEventListener("DOMContentLoaded", async () => {

    const matchs = await chargerMatchs();

    console.log("Matchs récupérés :", matchs);

    if (!matchs || matchs.length === 0) {
        console.log("Aucun match trouvé.");
        return;
    }

    const analyse = document.getElementById("analyse");

    let html = "";

    matchs.forEach(match => {

        html += `
        <div class="prediction-box">
            <strong>${match.teams.home.name}</strong>
            vs
            <strong>${match.teams.away.name}</strong>
            <br>
            🏆 ${match.league.name}
        </div>
        `;

    });

    analyse.innerHTML = html;

});
