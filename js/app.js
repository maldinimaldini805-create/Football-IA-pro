async function genererTicketCombine() {
    // 1. Récupérer tous les éléments cochés
    const checkboxes = document.querySelectorAll('.match-checkbox:checked');
    const matchsSelectionnes = [];

    checkboxes.forEach(cb => {
        matchsSelectionnes.push(cb.value);
    });

    // 2. Vérification du nombre de matchs
    if (matchsSelectionnes.length < 2) {
        alert("Veuillez cocher au moins 2 matchs pour créer un combiné.");
        return;
    }

    // 3. Envoi au serveur Python
    try {
        const response = await fetch('/api/combine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ matchs: matchsSelectionnes })
        });

        const data = await response.json();
        
        if (data.status === 'success') {
            afficherTicket(data.combine);
        }
    } catch (erreur) {
        console.error("Erreur lors de la génération du combiné:", erreur);
    }
}

function afficherTicket(combineData) {
    const container = document.getElementById('ticket-result');
    const list = document.getElementById('ticket-items');
    list.innerHTML = '';

    combineData.forEach(item => {
        const li = document.createElement('li');
        li.style.marginBottom = "8px";
        // Affiche le choix adapté (Victoire Cash ou Double Chance selon le calcul du robot)
        li.innerHTML = `<strong>${item.match}</strong> : Pronostic ➔ <u>${item.choix}</u> (${item.pourcentage}% de réussite estimée)`;
        list.appendChild(li);
    });

    container.style.display = 'block';
}
