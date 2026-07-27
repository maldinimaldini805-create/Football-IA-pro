// =====================================
// FOOTBALL AI PRO 2.2
// FOOTBALL AI CORE
// =====================================

import { chargerMatchs, chargerEquipe } from "./data-engine.js";

class FootballAICore {

    async analyserMatch(teamHome, teamAway) {

        console.log("Analyse du match...");

        const matchs = await chargerMatchs();

        const domicile = await chargerEquipe(teamHome);

        const exterieur = await chargerEquipe(teamAway);

        return {

            matchs: matchs,

            equipeDomicile: domicile,

            equipeExterieure: exterieur,

            prediction: {

                scoreExact: null,

                miTemps: null,

                confiance: 0,

                premierCorner: null,

                premierTirCadre: null,

                premiereTouche: null,

                premierDegagement: null,

                premiereFaute: null,

                premierCarton: null

            }

        };

    }

}

export default new FootballAICore();
