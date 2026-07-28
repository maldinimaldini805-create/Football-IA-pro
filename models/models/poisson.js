// =====================================
// FOOTBALL AI PRO 3.0
// POISSON GOALS MODEL
// =====================================


class PoissonModel {



    // Fonction factorielle
    factorial(n) {

        if (n === 0 || n === 1) {

            return 1;

        }


        let result = 1;


        for (let i = 2; i <= n; i++) {

            result *= i;

        }


        return result;

    }





    // Probabilité Poisson

    poissonProbability(
        goals,
        expectedGoals
    ) {


        return (

            Math.pow(
                expectedGoals,
                goals
            )

            *

            Math.exp(
                -expectedGoals
            )

        )

        /

        this.factorial(goals);


    }





    // Calcul buts attendus

    calculateExpectedGoals(
        team
    ) {


        const attack =
            team.attackRating || 50;


        const defense =
            team.defenseRating || 50;



        return (

            (attack / 50)

            *

            ((100 - defense) / 50)

        )

        /

        2;


    }





    // Analyse complète

    calculate(
        home,
        away
    ) {



        const homeGoals =

            this.calculateExpectedGoals(
                home
            );



        const awayGoals =

            this.calculateExpectedGoals(
                away
            );



        let scores = [];



        for (
            let h = 0;
            h <= 5;
            h++
        ) {


            for (
                let a = 0;
                a <= 5;
                a++
            ) {


                const probability =

                    this.poissonProbability(
                        h,
                        homeGoals
                    )

                    *

                    this.poissonProbability(
                        a,
                        awayGoals
                    );



                scores.push({

                    home: h,

                    away: a,

                    probability:

                        probability * 100

                });


            }

        }



        scores.sort(

            (a,b) =>

            b.probability -

            a.probability

        );



        const bestScore =
            scores[0];



        let over25 = 0;

        let btts = 0;



        scores.forEach(score => {



            if (

                score.home +

                score.away >= 3

            ) {


                over25 +=
                    score.probability;


            }



            if (

                score.home > 0 &&

                score.away > 0

            ) {


                btts +=
                    score.probability;


            }



        });



        return {


            expectedGoals: {

                home:

                    homeGoals,

                away:

                    awayGoals

            },



            score: 

                `${bestScore.home}-${bestScore.away}`,



            over25:

                Math.min(
                    Math.round(over25),
                    100
                ),



            btts:

                Math.min(
                    Math.round(btts),
                    100
                ),



            topScores:

                scores.slice(
                    0,
                    5
                )


        };


    }



}


export default new PoissonModel();
