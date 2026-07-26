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

    if (recherche === "") {
        alert("Veuillez entrer un match.");
        return;
    }

    alert("Analyse de : " + recherche);

    // Cette partie sera remplacée par la connexion API-FOOTBALL
    document.querySelector(".result").innerHTML = `
        <h3>🤖 Analyse IA en cours...</h3>

        <p>Recherche du match...</p>

        <p>Connexion à API-FOOTBALL...</p>

        <p>Calcul du modèle IA...</p>

        <p>Veuillez patienter...</p>
    `;
});
