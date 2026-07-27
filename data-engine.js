// =====================================
// FOOTBALL AI PRO 2.1
// DATA ENGINE
// =====================================

const API_URL = "https://football-ai-pro-2.maldinimaldini805-4cd.workers.dev";

async function chargerMatchs() {

    try {

        const reponse = await fetch(API_URL + "/matches");

        if (!reponse.ok) {

            throw new Error("Impossible de récupérer les matchs.");

        }

        const donnees = await reponse.json();

        return donnees.response;

    } catch (erreur) {

        console.error(erreur);

        return [];

    }

}
