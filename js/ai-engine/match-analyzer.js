// =====================================
// FOOTBALL AI PRO 4.1
// MATCH ANALYZER
// =====================================

class MatchAnalyzer {

    analyser(match) {

        return {

            homeTeam: match.home,

            awayTeam: match.away,

            league: match.league || "",

            date: match.date || "",

            stadium: match.stadium || "",

            referee: match.referee || ""

        };

    }

}

export default new MatchAnalyzer();
