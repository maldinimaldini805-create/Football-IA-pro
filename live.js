// =====================================
// FOOTBALL AI PRO 3.1
// LIVE.JS
// =====================================

import FootballAIService from "./football-ai-service.js";

class LiveModule {

    async demarrer() {

        console.log("Football AI Pro Live démarré...");

        const analyses =
            await FootballAIService.analyserTousLesMatchs();

        console.log(analyses);

        return analyses;

    }

    async actualiser() {

        return await this.demarrer();

    }

}

const Live = new LiveModule();

Live.demarrer();

export default Live;
