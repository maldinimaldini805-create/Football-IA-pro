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
