// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Button event listeners
const searchBtn = document.getElementById('searchBtn');
const todayBtn = document.getElementById('todayBtn');
const historyBtn = document.getElementById('historyBtn');
const settingsBtn = document.getElementById('settingsBtn');

searchBtn.addEventListener('click', () => {
  alert('🔎 Fonctionnalité "Rechercher un match" — à venir.');
});

todayBtn.addEventListener('click', () => {
  alert('📅 Fonctionnalité "Matchs du jour" — à venir.');
});

historyBtn.addEventListener('click', () => {
  alert('📊 Fonctionnalité "Historique" — à venir.');
});

settingsBtn.addEventListener('click', () => {
  alert('⚙️ Fonctionnalité "Paramètres" — à venir.');
});

console.log('Football AI Pro 2.1 chargé avec succès');

// Bouton de recherche principal
const bouton = document.querySelector("button");

bouton.addEventListener("click", async () => {

    const recherche = document.querySelector("input").value;

    if (recherche.trim() === "") {
        alert("Veuillez saisir un match.");
        return;
    }

    document.querySelector(".result").innerHTML =
        "<h3>⏳ Analyse IA en cours...</h3>";

    const donnees = await recupererMatchs();

    if (!donnees) {
        document.querySelector(".result").innerHTML =
            "<h3>❌ Impossible de récupérer les données.</h3>";
        return;
    }

    document.querySelector(".result").innerHTML = `
        <h2>✅ Football AI Pro connecté</h2>

        <p>Match recherché : <strong>${recherche}</strong></p>

        <p>📊 Les données API-FOOTBALL ont été récupérées.</p>

        <p>🤖 Le moteur IA sera ajouté dans la prochaine étape.</p>
    `;
});
