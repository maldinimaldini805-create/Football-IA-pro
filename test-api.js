// test-api.js
import apiFootballService from './js/services/api-football-service.js';

async function testConnection() {
    console.log("⏳ Test de connexion à API-Football en cours...");

    // Récupère la date du jour au format YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];
    
    // Test : Récupération des matchs d'aujourd'hui
    const matches = await apiFootballService.getFixturesByDate(today);

    if (matches && matches.length > 0) {
        console.log(`✅ Connexion réussie ! ${matches.length} matchs trouvés aujourd'hui.`);
        console.log("Premier match trouvé :");
        console.log(`⚽ ${matches[0].teams.home.name} vs ${matches[0].teams.away.name}`);
        console.log(`🏆 Ligue : ${matches[0].league.name} (${matches[0].league.country})`);
    } else {
        console.log("⚠️ Connexion établie, mais aucun match trouvé pour aujourd'hui ou clé invalide.");
    }
}

testConnection();
