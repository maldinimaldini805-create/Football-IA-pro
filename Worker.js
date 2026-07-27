export default {
  async fetch(request, env) {

    const url = new URL(request.url);

    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    };

    // Test
    if (url.pathname === "/") {
      return new Response(
        JSON.stringify({
          success: true,
          message: "Football AI Pro 2.1 API fonctionne"
        }),
        { headers }
      );
    }

    // Matchs
    if (url.pathname === "/matches") {

      const response = await fetch(
        "https://v3.football.api-sports.io/fixtures?live=all",
        {
          headers: {
            "x-apisports-key": env.API_FOOTBALL_KEY
          }
        }
      );

      const data = await response.text();

      return new Response(data, { headers });

    }

    return new Response(
      JSON.stringify({
        error: "Route inconnue"
      }),
      {
        status: 404,
        headers
      }
    );

  }
}
