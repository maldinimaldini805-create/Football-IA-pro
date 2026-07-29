// =====================================
// FOOTBALL AI PRO 3.0
// EVENT AI ENGINE
// =====================================

class EventAIEngine {

    analyser(home, away) {

        return {

            premierTirCadre:
                home.attaque > away.attaque ? "Domicile" : "Extérieur",

            premiereTouche:
                home.possession > away.possession ? "Domicile" : "Extérieur",

            premierCorner:
                home.corners > away.corners ? "Domicile" : "Extérieur",

            premierDegagement:
                home.degagements > away.degagements ? "Domicile" : "Extérieur",

            premiereFaute:
                home.fautes > away.fautes ? "Domicile" : "Extérieur",

            premierCarton:
                home.cartons > away.cartons ? "Domicile" : "Extérieur",

            premierBut:
                home.xG > away.xG ? "Domicile" : "Extérieur"

        };

    }

}

export default new EventAIEngine();
