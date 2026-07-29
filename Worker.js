// =====================================
// FOOTBALL AI PRO 4.1
// CLOUDFLARE WORKER
// =====================================

const API_KEY = "TA_CLE_API_ICI";
const BASE_URL = "https://v3.football.api-sports.io";

export default {

  async fetch(request) {

    const url = new URL(request.url);

    const endpoint = url.searchParams.get("endpoint");

    if (!endpoint) {

      return new Response(

        JSON.stringify({

          success: false,

          error: "Endpoint manquant"

        }),

        {

          status: 400,

          headers: {

            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*"

          }

        }

      );

    }

    try {

      const response = await fetch(

        `${BASE_URL}${endpoint}`,

        {

          headers: {

            "x-apisports-key": API_KEY

          }

        }

      );

      const data = await response.text();

      return new Response(

        data,

        {

          status: response.status,

          headers: {

            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*"

          }

        }

      );

    }

    catch (error) {

      return new Response(

        JSON.stringify({

          success: false,

          error: error.message

        }),

        {

          status: 500,

          headers: {

            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*"

          }

        }

      );

    }

  }

};
