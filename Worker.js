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

    // if (url.pathname === "/matches") {

    const cache = caches.default;
    const cacheKey = new Request(request.url);

    let response = await cache.match(cacheKey);

    if (response) {
        return response;
    }

    const apiResponse = await fetch(
        "https://v3.football.api-sports.io/fixtures?live=all",
        {
            headers: {
                "x-apisports-key": env.API_FOOTBALL_KEY
            }
        }
    );

    const data = await apiResponse.text();

    response = new Response(data, {
        headers: {
            ...headers,
            "Cache-Control": "public, max-age=300"
        }
    });

    await cache.put(cacheKey, response.clone());

    return response;
}
