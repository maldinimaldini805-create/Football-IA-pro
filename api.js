const URL_API = "https://football-api.maldinimaldini805-4cd.workers.dev";

async function recupererMatchs() {
    try {
        const reponse = await fetch(URL_API + "/matches");

        if (!reponse.ok) {
            throw new Error("Erreur lors de la récupération des matchs.");
        }

        const donnees = await reponse.json();
        return donnees;

    } catch (erreur) {
        console.error(erreur);
        return null;
    }
}
