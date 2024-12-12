let pokemonArr = [];
let currentIndex = 0;
let offset = 0;

function reloadPage() {
  location.reload();
}

async function fetchItem(limit = 30) {
  document.getElementById("loading-spinner").style.display = "block";
  showOverlay();

  let response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  let responseAsJson = await response.json();
  let results = responseAsJson.results;

  for (let i = 0; i < results.length; i++) {
    let pokemonResponse = await fetch(results[i].url);
    let pokemonData = await pokemonResponse.json();

    checkDuplicate(pokemonData);
  }

  handleOffsetAndButton(limit);
  document.getElementById("loading-spinner").style.display = "none";
}

function checkDuplicate(pokemonData) {
  if (!pokemonArr.find((p) => p.name === pokemonData.name)) {
    pokemonArr.push(pokemonData);
    renderCharacter(pokemonData, pokemonArr.length - 1);
  }
}

function handleOffsetAndButton(limit) {
  let loadButton = document.getElementById("load-more-btn");
  offset += limit;
  loadButton.disabled = false;

  if (offset >= 151) {
    loadButton.classList.add("display-none");
    loadButton.classList.remove("load");
  }
  hideOverlay();
}

function fetchMorePokemon() {
  let loadButton = document.getElementById("load-more-btn");
  loadButton.disabled = true;
  fetchItem();
}

function showOverlay() {
  const overlay = document.getElementById("loading-overlay");
  overlay.style.display = "flex";
}

function hideOverlay() {
  const overlay = document.getElementById("loading-overlay");
  overlay.style.display = "none";
}

function renderCharacter(pokemon, i) {
  let content = document.getElementById("main-content");
  let name = capitalizeFirstLetter(pokemon.name);
  let imageUrl = pokemon.sprites.other["official-artwork"].front_default;

  let typesHTML = getTypeIconsHTML(pokemon);

  let mainTypeClass = pokemon.types[0].type.name;

  content.innerHTML += getMainTemplate(mainTypeClass,imageUrl,name,typesHTML,i);
}

function renderPokemoninOverlay(pokemon, event) {
  let overlayContent = document.getElementById("overlay-content");
  let name = capitalizeFirstLetter(pokemon.name);
  let heightDisplay = getHeightInfo(pokemon);
  let weightDisplay = getWeightInfo(pokemon);
  let abilitiesHTML = getAbilitiesHTML(pokemon);
  let statsHTML = getStatsHTML(pokemon);
  let typesHTML = getTypeIconsHTML(pokemon);
  let mainTypeClass = pokemon.types[0].type.name;

  overlayContent.innerHTML = getOverlayTemplate(pokemon,name,heightDisplay,weightDisplay,mainTypeClass,typesHTML,abilitiesHTML,statsHTML);

  if (event) {
    event.stopPropagation();
  }
}

function filterName() {
  let search = document.getElementById("search").value.trim();
  let content = document.getElementById("main-content");
  checkLength(search);

  let filteredPokemons = pokemonArr.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  content.innerHTML = "";

  if (filteredPokemons.length === 0) {
    content.innerHTML = `<h1 class="no-pokemon">Kein Pokémon gefunden!</h1>`;
    return;
  }
  renderFilteredPokemons(filteredPokemons, content);
}

function checkLength(search) {
  if (search.length < 3) {
    alert("Bitte mindestens 3 Buchstaben eingeben!");
    return;
  }
}

function renderFilteredPokemons(filteredPokemons, content) {
  content.innerHTML= "";

  filteredPokemons.forEach((pokemon) => {
  let imageUrl = pokemon.sprites.other["official-artwork"].front_default;
  let typesHTML = getTypeIconsHTML(pokemon);
  let mainTypeClass = pokemon.types[0].type.name;

  let indexInOriginalArray = pokemonArr.findIndex(
    (p) => p.name === pokemon.name
    );

  content.innerHTML += getMainTemplate(mainTypeClass,imageUrl,capitalizeFirstLetter(pokemon.name),typesHTML,indexInOriginalArray);
  return });
}

function toggleOverlay() {
  let overlay = document.getElementById("overlay-wrapper");
  overlay.classList.toggle("display-none");
}

function closeIfOutsideCard(event) {
  let overlayCard =
    document.getElementById("overlay-content").firstElementChild;
  if (
    event.target === document.getElementById("overlay-wrapper") ||
    !overlayCard.contains(event.target)
  ) {
    toggleOverlay();
  }
}

function showPokemon(event, currentIndexNew) {
  currentIndex = currentIndexNew;
  let pokemon = pokemonArr[currentIndexNew];
  renderPokemoninOverlay(pokemon, event);
}

function changeDirection(direction, event) {
  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = pokemonArr.length - 1;
  } else if (currentIndex >= pokemonArr.length) {
    currentIndex = 0;
  }

  let pokemon = pokemonArr[currentIndex];

  renderPokemoninOverlay(pokemon, event);
}

function determineProgressClass(progress) {
  if (progress >= 70) {
    return "bg-success";
  } else if (progress >= 40) {
    return "bg-warning";
  } else {
    return "bg-danger";
  }
}

function capitalizeFirstLetter(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

console.log(pokemonArr);
