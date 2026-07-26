const API_URL = "https://football-api.maldinimaldini805-4cd.workers.dev/";

async function chargerMatchs() {

    const zone = document.querySelector(".result");

    zone.innerHTML = "<p>⏳ Chargement des matchs...</p>";

    try {

        const reponse = await fetch(API_URL);

        const data = await reponse.json();

        if (!data.response || data.response.length === 0) {
            zone.innerHTML = "<p>Aucun match trouvé.</p>";
            return;
        }

        let html = "";

        data.response.forEach(match => {

            html += `
            <div class="card">
                <h3>${match.teams.home.name} 🆚 ${match.teams.away.name}</h3>
                <p>🏆 ${match.league.name}</p>
                <p>📅 ${match.fixture.date}</p>
                <button onclick="analyserMatch('${match.fixture.id}')">
                    Analyser
                </button>
            </div>
            `;
        });

        zone.innerHTML = html;

    } catch (e) {

        zone.innerHTML =
        "<p>❌ Impossible de charger les matchs.</p>";

        console.error(e);

    }

}
