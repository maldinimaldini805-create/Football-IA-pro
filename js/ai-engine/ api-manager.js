// ==========================================
// FOOTBALL AI PRO 2.2
// API MANAGER
// ==========================================

const APIManager = {

    providers: [

        {
            name: "API-FOOTBALL",
            enabled: true,
            baseUrl: "https://v3.football.api-sports.io"
        },

        {
            name: "FOOTBALL-DATA",
            enabled: true,
            baseUrl: "https://api.football-data.org/v4"
        },

        {
            name: "SPORTMONKS",
            enabled: true,
            baseUrl: "https://api.sportmonks.com/v3/football"
        }

    ],

    getAvailableProvider() {

        for (const provider of this.providers) {

            if (provider.enabled) {
                return provider;
            }

        }

        return null;

    },

    async fetch(endpoint, options = {}) {

        const provider = this.getAvailableProvider();

        if (!provider) {
            throw new Error("Aucune API disponible");
        }

        console.log("API utilisée :", provider.name);

        return {
            provider: provider.name,
            url: provider.baseUrl + endpoint
        };

    }

};

export default APIManager;
