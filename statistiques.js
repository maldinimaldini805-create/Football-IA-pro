function calculerStatistiques(data) {

    return {

        forme: data.forme || "N/A",

        butsMarques: data.butsMarques || 0,

        butsEncaisses: data.butsEncaisses || 0,

        tirs: data.tirs || 0,

        tirsCadres: data.tirsCadres || 0,

        corners: data.corners || 0,

        cartonsJaunes: data.cartonsJaunes || 0,

        fautes: data.fautes || 0,

        possession: data.possession || "0%"

    };

}
