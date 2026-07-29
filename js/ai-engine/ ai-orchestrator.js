// =====================================
// FOOTBALL AI PRO 3.1
// AI ORCHESTRATOR
// =====================================

import SuperAIEngine from "./super-ai-engine.js";
import MatchAnalyzer from "./match-analyzer.js";

class AIOrchestrator {

    async analyser(match, data) {

        const infos = MatchAnalyzer.analyser(match);

        const prediction = SuperAIEngine.analyser(data);

        return {

            match: infos,

            prediction,

            generatedAt: new Date().toISOString(),

            version: "Football AI Pro 3.1"

        };

    }

}

export default new AIOrchestrator();
