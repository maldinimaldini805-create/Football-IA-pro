// =====================================
// FOOTBALL AI PRO 3.0
// PREDICTION ENGINE
// =====================================


import poisson from "./models/poisson.js";
import elo from "./models/elo.js";
import xgModel from "./models/xg-model.js";
import cornerModel from "./models/corner-model.js";
import cardsModel from "./models/cards-model.js";
import ensemble from "./models/ensemble.js";



class PredictionEngine {



    // ==============================
    // ANALYSE COMPLETE DU MATCH
    // ==============================

    async predict(matchData) {


        const {

            home,
            away,
            context = {}

        } = matchData;



        // --------------------------
        // MODELE BUTS
        // --------------------------

        const goalsPrediction =
            poisson.calculate(
                home,
                away
            );



        // --------------------------
        // FORCE DES EQUIPES
        // --------------------------

        const eloPrediction =
            elo.calculate(
                home,
                away
            );



        // --------------------------
        // XG
        // --------------------------

        const xgPrediction =
            xgModel.calculate(
                home,
                away
            );



        // --------------------------
        // CORNERS
        // --------------------------

        const cornersPrediction =
            cornerModel.calculate(
                home,
                away
            );



        // --------------------------
        // CARTONS
        // --------------------------

        const cardsPrediction =
            cardsModel.calculate(
                home,
                away,
                context.referee
            );



        // --------------------------
        // FUSION IA
        // --------------------------

        const finalPrediction =
            ensemble.combine({

                goals:
                    goalsPrediction,

                elo:
                    eloPrediction,

                xg:
                    xgPrediction,

                corners:
                    cornersPrediction,

                cards:
                    cardsPrediction

            });



        return {


            match: {

                home:
                    home.name,

                away:
                    away.name

            },


            score:

                finalPrediction.score,



            winner:

                finalPrediction.winner,



            markets: {


                over25:

                    finalPrediction.over25,



                btts:

                    finalPrediction.btts,



                corners:

                    cornersPrediction,



                cards:

                    cardsPrediction


            },



            confidence:

                finalPrediction.confidence,



            details: {


                poisson:
                    goalsPrediction,


                elo:
                    eloPrediction,


                xg:
                    xgPrediction


            }


        };


    }




    // ==============================
    // MODE LIVE
    // ==============================

    async livePrediction(
        liveData
    ) {


        return await this.predict(
            {

                home:
                    liveData.home,


                away:
                    liveData.away,


                context: {

                    minute:
                        liveData.minute,


                    score:
                        liveData.score

                }


            }
        );


    }





}



export default new PredictionEngine();
