const API_KEY = "318c42023d23e7192441529cc65cf345";
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchData(endpoint) {
    const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=es-ES`;

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Error TMDB: ${res.status}`);
    }

    return await res.json();
}

exports.homeController = async (req, res) => {
    try {
        const trending = await fetchData("/trending/all/day");
        const recomendados = await fetchData("/movie/top_rated");
        const peliculas = await fetchData("/movie/popular");
        const series = await fetchData("/tv/popular");

        res.render("main/home", {
            page: "inicio",
            trending: trending.results,
            recomendados: recomendados.results,
            peliculas: peliculas.results,
            series: series.results
        });

    } catch (error) {
        console.log("ERROR TMDB:", error.message);

        res.render("main/home", {
            page: "inicio",
            trending: [],
            recomendados: [],
            peliculas: [],
            series: []
        });
    }
};