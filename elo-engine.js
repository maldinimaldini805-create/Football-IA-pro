// =====================================
// FOOTBALL AI PRO 3.0
// ELO RATING MODEL
// =====================================


class EloModel {



    // Calcul différence Elo

    calculateDifference(
        homeRating,
        awayRating
    ) {


        return homeRating - awayRating;

    }





    // Probabilité victoire selon Elo

    winProbability(
        ratingA,
        ratingB
    ) {


        return (

            1 /

            (

                1 +

                Math.pow(
                    10,
                    (
                        ratingB -
                        ratingA
                    )
                    /
                    400

                )

            )

        );


    }





    // Avantage domicile

    applyHomeAdvantage(
        rating
    ) {


        return rating + 65;


    }





    // Analyse complète

    calculate(
        home,
        away
    ) {



        const homeElo =

            this.applyHomeAdvantage(

                home.elo ||
                1500

            );



        const awayElo =

            away.elo ||
            1500;



        const homeWin =

            this.winProbability(

                homeElo,

                awayElo

            );



        const awayWin =

            this.winProbability(

                awayElo,

                homeElo

            );



        const difference =

            this.calculateDifference(

                homeElo,

                awayElo

            );



        let draw =

            1 -

            homeWin -

            awayWin;



        // Correction pour garder
        // des valeurs réalistes

        if (draw < 0.15) {

            draw = 0.15;

        }



        const total =

            homeWin +

            awayWin +

            draw;



        return {


            eloDifference:

                Math.round(
                    difference
                ),



            probabilities: {


                home:

                    Math.round(
                        (
                            homeWin /
                            total
                        )
                        *
                        100
                    ),



                draw:

                    Math.round(
                        (
                            draw /
                            total
                        )
                        *
                        100
                    ),



                away:

                    Math.round(
                        (
                            awayWin /
                            total
                        )
                        *
                        100
                    )

            }



        };


    }





}



export default new EloModel();
