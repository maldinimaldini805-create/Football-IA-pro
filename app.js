/**
 * Football AI Pro - Application Principale
 * Gestion de l'interface utilisateur et des interactions
 */

let predictor = new FootballAIPredictor();
let currentTab = 'home';

/**
 * Initialise l'application au chargement
 */
document.addEventListener('DOMContentLoaded', function() {
    loadHistory();
    setupEventListeners();
    console.log('⚽ Football AI Pro v2.0.0 - Système de prédiction initialisé');
});

/**
 * Configure les écouteurs d'événements
 */
function setupEventListeners() {
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                analyseMatch();
            }
        });
    }
}

/**
 * Change d'onglet
 */
function switchTab(tab) {
    currentTab = tab;

    // Cache tous les onglets
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(t => t.style.display = 'none');

    // Affiche l'onglet sélectionné
    const selectedTab = document.getElementById(tab);
    if (selectedTab) {
        selectedTab.style.display = 'block';
    }

    // Scroll vers le haut
    window.scrollTo(0, 0);
}

/**
 * Analyse un match
 */
async function analyseMatch() {
    const searchInput = document.getElementById('search');
    const matchInput = searchInput.value.trim();

    if (!matchInput) {
        showError('Veuillez entrer un match (ex: Real Madrid vs Barcelona)');
        return;
    }

    // Affiche le spinner de chargement
    const analyseBtn = document.getElementById('analyseBtn');
    const originalText = analyseBtn.textContent;
    analyseBtn.disabled = true;
    analyseBtn.innerHTML = 'ANALYSE EN COURS' + '<span class="loading"></span>';

    try {
        // Simule un délai d'analyse IA
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Parse le match
        const match = predictor.parseMatch(matchInput);

        if (!match) {
            showError('❌ Match non trouvé. Veuillez vérifier les noms des équipes.');
            analyseBtn.disabled = false;
            analyseBtn.textContent = originalText;
            return;
        }

        // Prédit le match
        const prediction = predictor.predictMatch(match.home, match.away);

        // Sauvegarde la prédiction
        predictor.savePrediction(prediction);

        // Affiche les résultats
        displayResults(prediction);

        // Montre le message de succès
        showSuccess(`✅ Analyse terminée pour ${prediction.homeTeam} vs ${prediction.awayTeam}`);

        // Réactive le bouton
        analyseBtn.disabled = false;
        analyseBtn.textContent = originalText;

        // Réinitialise la barre de recherche après 1 seconde
        setTimeout(() => {
            searchInput.value = '';
        }, 500);

        // Charge l'historique
        loadHistory();

    } catch (error) {
        console.error('Erreur lors de l\'analyse:', error);
        showError('❌ Erreur lors de l\'analyse. Veuillez réessayer.');
        analyseBtn.disabled = false;
        analyseBtn.textContent = originalText;
    }
}

/**
 * Affiche les résultats de la prédiction
 */
function displayResults(prediction) {
    const resultsCard = document.getElementById('resultsCard');
    const statsCard = document.getElementById('statsCard');
    const comparisonCard = document.getElementById('comparisonCard');
    const analyseDiv = document.getElementById('analyse');

    // Affiche la carte de résultats
    resultsCard.style.display = 'block';

    // Génère l'analyse textuelle
    const analysis = predictor.generateAnalysis(prediction);
    analyseDiv.innerHTML = `<div class="analyse-text">${analysis}</div>`;

    // Affiche les statistiques
    statsCard.style.display = 'block';

    // Mise à jour des probabilités
    document.getElementById('home').textContent = `${prediction.probabilities.home}%`;
    document.getElementById('draw').textContent = `${prediction.probabilities.draw}%`;
    document.getElementById('away').textContent = `${prediction.probabilities.away}%`;

    // Mise à jour du score prédit
    document.getElementById('score').textContent = `${prediction.prediction.home} - ${prediction.prediction.away}`;
    document.getElementById('goals').textContent = `${prediction.stats.totalGoals} buts`;
    document.getElementById('shots').textContent = `${prediction.stats.totalShots} tirs`;
    document.getElementById('shotsTarget').textContent = `${prediction.stats.totalShotsTarget} tirs cadrés`;
    document.getElementById('corners').textContent = `${prediction.stats.totalCorners} corners`;
    document.getElementById('cards').textContent = `${prediction.stats.totalCards} cartons`;
    document.getElementById('fouls').textContent = `${prediction.stats.totalFouls} fautes`;
    document.getElementById('possession').textContent = `${prediction.stats.possession}% (domicile)`;

    // Mise à jour de la confiance
    const confidencePercentage = prediction.confidence;
    document.getElementById('confidenceBar').style.width = `${confidencePercentage}%`;
    document.getElementById('confidence').textContent = `${confidencePercentage}% de confiance`;

    // Affiche la comparaison des équipes
    comparisonCard.style.display = 'block';
    displayTeamComparison(prediction);

    // Scroll vers les résultats
    setTimeout(() => {
        resultsCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
}

/**
 * Affiche la comparaison des équipes
 */
function displayTeamComparison(prediction) {
    const comparisonDiv = document.getElementById('teamComparison');

    let html = '<div class="team-comparison">';
    html += `
        <div class="team-card">
            <h4>🏠 ${prediction.homeTeam}</h4>
            <div class="team-stat">
                <span>Tirs:</span>
                <span>${prediction.stats.homeStats.shots}</span>
            </div>
            <div class="team-stat">
                <span>Tirs Cadrés:</span>
                <span>${prediction.stats.homeStats.shotsTarget}</span>
            </div>
            <div class="team-stat">
                <span>Corners:</span>
                <span>${prediction.stats.homeStats.corners}</span>
            </div>
            <div class="team-stat">
                <span>Possession:</span>
                <span>${prediction.stats.homeStats.possession}%</span>
            </div>
            <div class="team-stat">
                <span>Fautes:</span>
                <span>${prediction.stats.homeStats.fouls}</span>
            </div>
        </div>
        <div class="team-card">
            <h4>✈️ ${prediction.awayTeam}</h4>
            <div class="team-stat">
                <span>Tirs:</span>
                <span>${prediction.stats.awayStats.shots}</span>
            </div>
            <div class="team-stat">
                <span>Tirs Cadrés:</span>
                <span>${prediction.stats.awayStats.shotsTarget}</span>
            </div>
            <div class="team-stat">
                <span>Corners:</span>
                <span>${prediction.stats.awayStats.corners}</span>
            </div>
            <div class="team-stat">
                <span>Possession:</span>
                <span>${prediction.stats.awayStats.possession}%</span>
            </div>
            <div class="team-stat">
                <span>Fautes:</span>
                <span>${prediction.stats.awayStats.fouls}</span>
            </div>
        </div>
    `;
    html += '</div>';

    comparisonDiv.innerHTML = html;
}

/**
 * Charge et affiche l'historique
 */
function loadHistory() {
    const history = predictor.getHistory();
    const historyContainer = document.getElementById('historyContainer');

    if (!historyContainer) return;

    if (history.length === 0) {
        historyContainer.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">Aucune prédiction dans l\'historique</p>';
        return;
    }

    let html = '<div style="display: grid; gap: 15px;">';

    history.forEach((pred, index) => {
        html += `
            <div class="prediction-box">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <strong style="color: #00ff99; font-size: 16px;">
                        ${pred.homeTeam} <span style="color: #666;">vs</span> ${pred.awayTeam}
                    </strong>
                    <span style="color: #666; font-size: 13px;">${pred.timestamp}</span>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 13px;">
                    <div>
                        <span style="color: #999;">Résultat:</span><br>
                        <strong style="color: #00ff99;">${pred.prediction.home} - ${pred.prediction.away}</strong>
                    </div>
                    <div>
                        <span style="color: #999;">Probabilité:</span><br>
                        <strong style="color: #00ff99;">${pred.probabilities.home}% (Domicile)</strong>
                    </div>
                    <div>
                        <span style="color: #999;">Confiance:</span><br>
                        <strong style="color: #00ff99;">${pred.confidence}%</strong>
                    </div>
                    <div>
                        <span style="color: #999;">Buts Total:</span><br>
                        <strong style="color: #00ff99;">${pred.stats.totalGoals}</strong>
                    </div>
                </div>
            </div>
        `;
    });

    html += '</div>';
    historyContainer.innerHTML = html;
}

/**
 * Efface l'historique
 */
function clearHistory() {
    if (confirm('⚠️ Êtes-vous sûr de vouloir effacer tout l\'historique ?')) {
        predictor.clearHistory();
        loadHistory();
        showSuccess('✅ Historique effacé');
    }
}

/**
 * Affiche une notification d'erreur
 */
function showError(message) {
    const container = document.querySelector('.container');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    errorDiv.style.margin = '20px';
    errorDiv.style.marginTop = '0';

    container.insertBefore(errorDiv, container.firstChild);

    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

/**
 * Affiche une notification de succès
 */
function showSuccess(message) {
    const container = document.querySelector('.container');
    const successDiv = document.createElement('div');
    successDiv.className = 'success';
    successDiv.textContent = message;
    successDiv.style.margin = '20px';
    successDiv.style.marginTop = '0';

    container.insertBefore(successDiv, container.firstChild);

    setTimeout(() => {
        successDiv.remove();
    }, 4000);
}