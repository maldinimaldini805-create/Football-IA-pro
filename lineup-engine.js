// =====================================
// FOOTBALL AI PRO 3.0
// LINEUP ENGINE
// =====================================

class LineupEngine {

    analyser(titulaires = [], remplacants = []) {

        let note = 100;

        let titulairesPresents = titulaires.length;

        if (titulairesPresents < 11) {
            note -= (11 - titulairesPresents) * 5;
        }

        return {

            titulaires: titulairesPresents,

            remplacants: remplacants.length,

            noteEffectif: note,

            equipeComplete: titulairesPresents === 11

        };

    }

}

export default new LineupEngine();
