document.querySelectorAll(".select-wrapper").forEach(wrapper => {
    const select = wrapper.querySelector("select");
    const arrow = wrapper.querySelector(".arrow");

    let abierto = false;

    select.addEventListener("click", () => {
        abierto = !abierto;

        if (abierto) {
            arrow.style.transform = "translateY(-50%) rotate(180deg)";
        } else {
            arrow.style.transform = "translateY(-50%) rotate(0deg)";
        }
    });

    select.addEventListener("blur", () => {
        abierto = false;
        arrow.style.transform = "translateY(-50%) rotate(0deg)";
    });
});

const API_KEY = "318c42023d23e7192441529cc65cf345";
const BASE_URL = "https://api.themoviedb.org/3";

const grid = document.querySelector(".grid-posters");
const btnFiltrar = document.querySelector(".btn-filtrar");
const btnRandom = document.querySelector(".btn-random");

// ==========================
//  PETICIÓN GENERAL TMDB
// ==========================
async function fetchFromTMDB(endpoint) {
  const url = `${BASE_URL}${endpoint}&language=es-ES&api_key=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  return data.results || [];
}

// ========================================
//  RENDER DE POSTERS EN LA CUADÍCULA
// ========================================
function renderGrid(items, categoria) {
  grid.innerHTML = "";

  if (items.length === 0) {
    grid.innerHTML = `<p style="text-align:center;width:100%">No se encontraron resultados.</p>`;
    return;
  }

  items.forEach((item) => {
    const title = item.title || item.name;

    grid.innerHTML += `
      <div class="poster-card">
        <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${title}">
        <p class="poster-title">${title}</p>
      </div>
    `;
  });
}

// ========================================
//  APLICAR FILTROS
// ========================================
async function aplicarFiltros() {
  const categoria = document.getElementById("categoria").value || "movie"; // default
  const genero = document.getElementById("genero").value;
  const ordenar = document.getElementById("ordenar").value;
  const anio = document.getElementById("anio").value;
  const letra = document.getElementById("letra").value;
  const estado = document.getElementById("estado").value;

  let endpoint = `/${categoria}/discover?sort_by=${ordenar}`;

  if (genero) endpoint += `&with_genres=${genero}`;
  if (anio) endpoint += `&primary_release_year=${anio}`;
  if (categoria === "tv" && estado) endpoint += `&status=${estado}`;

  // === 1) OBTENER LOS DATOS BASE ===
  let datos = await fetchFromTMDB(endpoint);

  // === 2) FILTRO POR LETRA (hecho en JS) ===
  if (letra) {
    datos = datos.filter((item) => {
      const nombre = (item.title || item.name || "").toUpperCase();
      const inicial = nombre.charAt(0);

      if (letra === "AF") return inicial >= "A" && inicial <= "F";
      if (letra === "GM") return inicial >= "G" && inicial <= "M";
      if (letra === "NZ") return inicial >= "N" && inicial <= "Z";

      return true;
    });
  }

  renderGrid(datos);
}

// ========================================
//  BOTÓN ALEATORIO
// ========================================
async function mostrarAleatorio() {
  const categoria = Math.random() > 0.5 ? "movie" : "tv";

  const data = await fetchFromTMDB(`/${categoria}/popular?`);

  const randomIndex = Math.floor(Math.random() * data.length);
  const item = data[randomIndex];

  renderGrid([item]);
}

// ========================================
//  EVENTOS
// ========================================
btnFiltrar.addEventListener("click", aplicarFiltros);
btnRandom.addEventListener("click", mostrarAleatorio);

// ========================================
//  CARGA INICIAL (POPULAR MOVIES)
// ========================================
(async () => {
  const data = await fetchFromTMDB(`/movie/popular?`);
  renderGrid(data);
})();



