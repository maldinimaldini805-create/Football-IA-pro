// =====================================
// FOOTBALL AI PRO 2.2
// DATA ENGINE
// =====================================

import APIManager from "./api-manager.js";

const API_URL = "https://football-ai-pro-2.maldinimaldini805-4cd.workers.dev";

// =====================================
// CHARGER LES MATCHS
// =====================================

export async function chargerMatchs() {

    try {

        const api = await APIManager.fetch("/matches");

        console.log("API utilisée :", api.provider);

        const reponse = await fetch(API_URL + "/matches");

        if (!reponse.ok) {
            throw new Error("Impossible de récupérer les matchs.");
        }

        const donnees = await reponse.json();

        return donnees.response || [];

    } catch (erreur) {

        console.error(erreur);

        return [];

    }

}

// =====================================
// CHARGER LES STATISTIQUES D'UNE ÉQUIPE
// =====================================

export async function chargerEquipe(teamId) {

    try {

        const api = await APIManager.fetch(
            "/team-statistics?team=" + teamId
        );

        console.log("API utilisée :", api.provider);

        const reponse = await fetch(
            API_URL + "/team-statistics?team=" + teamId
        );

        if (!reponse.ok) {
            throw new Error("Impossible de récupérer les statistiques.");
        }

        const donnees = await reponse.json();

        return donnees.response || [];

    } catch (erreur) {

        console.error(erreur);

        return [];

    }

}
