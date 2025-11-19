const API_KEY = "318c42023d23e7192441529cc65cf345";
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchData(endpoint) {
    const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=es-ES`;
    const res = await fetch(url);
    return await res.json();
}

exports.directorioController = async (req, res) => {
    try {
        // Obtiene lista combinada (películas + series)
        const trending = await fetchData("/trending/all/week");

        res.render("main/directorio", {
            page: "directorio",
            lista: trending.results
        });

    } catch (error) {
        console.log("ERROR DIRECTORIO:", error);

        res.render("main/directorio", {
            page: "directorio",
            lista: []
        });
    }
};

exports.apiDirectorio = async (req, res) => {
    try {
        const { tipo = "movie", genero = "", ordenar = "popularity.desc", año = "" } = req.query;

        let endpoint = `/discover/${tipo}?sort_by=${ordenar}`;

        if (genero) endpoint += `&with_genres=${genero}`;
        if (año) endpoint += `&primary_release_year=${año}`;

        const data = await fetchData(endpoint);

        res.json(data.results);

    } catch (error) {
        console.log("ERROR FILTROS:", error);
        res.json([]);
    }
};
