// =====================================
// FOOTBALL AI PRO 4.1
// API FOOTBALL SERVICE (Cloudflare)
// =====================================

const WORKER_URL = "TON_URL_WORKER";

class ApiFootballService {

    async request(endpoint) {

        const response = await fetch(
            `${WORKER_URL}?endpoint=${encodeURIComponent(endpoint)}`
        );

        if (!response.ok) {
            throw new Error(`Erreur Cloudflare (${response.status})`);
        }

        const data = await response.json();

        return data.response || [];

    }

    async getTodayMatches() {

        const today = new Date().toISOString().split("T")[0];

        return this.request(`/fixtures?date=${today}`);

    }

    async getFixture(id) {

        return this.request(`/fixtures?id=${id}`);

    }

}

export default new ApiFootballService();
