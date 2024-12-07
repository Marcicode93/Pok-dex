let pokemonArr = [];
let currentIndex = 0;
let offset = 0;

function reloadPage() {
  location.reload();
}

async function fetchItem(limit = 30) {
  let loadButton = document.getElementById("load-more-btn");
  document.getElementById("loading-spinner").style.display = "block";

  let response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  let responseAsJson = await response.json();
  let results = responseAsJson.results;

  for (let i = 0; i < results.length; i++) {
    let pokemonResponse = await fetch(results[i].url);
    let pokemonData = await pokemonResponse.json();

    if (!pokemonArr.find((p) => p.name === pokemonData.name)) {
      pokemonArr.push(pokemonData);
      renderCharacter(pokemonData, pokemonArr.length - 1);
    }
  }

  offset += limit;

  document.getElementById("loading-spinner").style.display = "none";
  loadButton.disabled = false;

  if (offset >= 151) {
    loadButton.classList.add("display-none");
    loadButton.classList.remove("load");
  }
}

function fetchMorePokemon() {
  let loadButton = document.getElementById("load-more-btn");
  loadButton.disabled = true;
  fetchItem();
}

function renderCharacter(pokemon, i) {
  let content = document.getElementById("main-content");
  let name = capitalizeFirstLetter(pokemon.name);
  let imageUrl = pokemon.sprites.other["official-artwork"].front_default;

  let typesHTML = getTypeIconsHTML(pokemon);

  let mainTypeClass = pokemon.types[0].type.name;

  content.innerHTML += getMainTemplate(
    mainTypeClass,
    imageUrl,
    name,
    typesHTML,
    i
  );
}

function renderPokemoninOverlay(pokemon) {
  let overlayContent = document.getElementById("overlay-content");
  let name = capitalizeFirstLetter(pokemon.name);
  let height = pokemon.height * 10;
  let heightDisplay =
    height >= 100
      ? (height / 100).toFixed(2).toString().replace(".", ",") + " m"
      : height + " cm";
  let weight = pokemon.weight;
  let weightDisplay =
    weight >= 100
      ? (weight / 10).toString().replace(".", ",") + " kg"
      : weight + " g";

  let abilitiesHTML = "";
  pokemon.abilities.forEach((ability) => {
    abilitiesHTML += `<li>${ability.ability.name}</li>`;
  });

  let statsHTML = "";
  for (let k = 0; k < pokemon.stats.length; k++) {
    let statName = pokemon.stats[k].stat.name;
    let baseStat = pokemon.stats[k].base_stat;

    // Berechne den Fortschritt für die Progress-Bar (hier als Beispiel max. 200)
    let progress = Math.min(baseStat, 200); // Maximalwert auf 200 begrenzen
    let progressClass = "";

    // Bestimme die Farbe der Progress-Bar je nach Wert
    if (progress >= 100) {
      progressClass = "bg-success"; // Gelb für mittlere Werte
    } else if (progress >= 60) {
      progressClass = "bg-warning"; // Gelb für mittlere Werte
    } else {
      progressClass = "bg-danger"; // Rot für niedrige Werte
    }

    statsHTML += /*html*/ `
      <div class="mb-2">
        <label class="stat-name">${statName}</label>
        <div class="progress">
          <div class="progress-bar ${progressClass}" role="progressbar" style="width: ${progress}%;" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="200">${baseStat}</div>
        </div>
      </div>
    `;
  }

  let typesHTML = getTypeIconsHTML(pokemon);

  let mainTypeClass = pokemon.types[0].type.name;

  overlayContent.innerHTML = getOverlayTemplate(
    pokemon,
    name,
    heightDisplay,
    weightDisplay,
    mainTypeClass,
    typesHTML,
    abilitiesHTML,
    statsHTML
  );
}

function filterName() {
  let search = document.getElementById("search").value.trim();
  if (search.length < 3) {
    alert("Bitte mindestens 3 Buchstaben eingeben!");
    return;
  }

  let filteredPokemons = pokemonArr.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );
  let content = document.getElementById("main-content");
  content.innerHTML = "";
  if (filteredPokemons.length === 0) {
    content.innerHTML = `<h1 class="no-pokemon">Kein Pokémon gefunden!</h1>`;
}

  renderFilteredPokemons(filteredPokemons);
}

function renderFilteredPokemons(filteredPokemons) {
  let content = document.getElementById("main-content");
  content.innerHTML = "";

  filteredPokemons.forEach((pokemon) => {
    let imageUrl = pokemon.sprites.other["official-artwork"].front_default;
    let typesHTML = getTypeIconsHTML(pokemon);
    let mainTypeClass = pokemon.types[0].type.name;

    content.innerHTML += getMainTemplate(
      mainTypeClass,
      imageUrl,
      pokemon.name,
      typesHTML
    );
  });
}

function toggleOverlay(event, i) {
  if (typeof i === "undefined" || !pokemonArr[i]) {
    console.error("Invalid index passed to toggleOverlay:", i);
    return;
  }
  let overlay = document.getElementById("overlay-wrapper");
  overlay.classList.toggle("display-none");

  currentIndex = i;

  let pokemon = pokemonArr[currentIndex];
  event.stopPropagation();
  renderPokemoninOverlay(pokemon);
}

function changeDirection(direction) {
  currentIndex += direction;

  let pokemon = pokemonArr[currentIndex];

  if (currentIndex < 0) {
    currentIndex = pokemonArr.length - 1;
  } else if (currentIndex >= pokemonArr.length) {
    currentIndex = 0;
  }

  console.log("Updated currentIndex:", currentIndex);
  console.log("Pokemon at currentIndex:", pokemonArr[currentIndex]);

  renderPokemoninOverlay(pokemon);
}

console.log(pokemonArr);
