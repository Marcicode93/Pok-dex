let pokemonArr = [];
let currentIndex = 0;
let offset = 0;

async function fetchItem(limit = 30) {
  if (offset >= 151) {
    console.log("Alle Pokemon geladen");
    return;
  }
  let response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  let responseAsJson = await response.json();
  let results = responseAsJson.results;

  for (let i = 0; i < results.length; i++) {
    let pokemonResponse = await fetch(results[i].url);
    let pokemonData = await pokemonResponse.json();

    if (!pokemonArr.find((p) => p.name === pokemonData.name)) {
      pokemonArr.push(pokemonData); // Nur hinzufügen, wenn es noch nicht existiert
      renderCharacter(pokemonData, pokemonArr.length - 1);
    }
  }

  offset += limit;
  if (offset >= 151) {
    let loadButton = document.getElementById("load-more-btn");
      loadButton.classList.add("display-none");
      loadButton.classList.remove('load');
  }
}

function fetchMorePokemon() {
  fetchItem();
}

function renderCharacter(pokemon, i) {
  let content = document.getElementById("main-content");
  let name = pokemon.name;
  let imageUrl = pokemon.sprites.other["official-artwork"].front_default;

  let typesHTML = "";
  for (let j = 0; j < pokemon.types.length; j++) {
    typesHTML += pokemon.types[j].type.name;
    if (j < pokemon.types.length - 1) {
      typesHTML += ", ";
    }
  }

  content.innerHTML += /*html*/ `
    <div class="card card-hover" onclick="toggleOverlay(event,${i})">
      <img class="card-img-top" id="main-page-img" src="${imageUrl}" alt="image-Pokémon">
      <div class="card-body">
        <h5 class="card-title avatar-name">${name}</h5>
        <div class="types">${typesHTML}</div>
        </div>
    </div>
        `;
}

function renderPokemoninOverlay(pokemon) {
  let overlayContent = document.getElementById("overlay-content");
  let name = pokemon.name;
  let height = pokemon.height * 10;
  let heightDisplay =
    height >= 100
      ? (height / 100).toFixed(2).toString().replace(".", ",") + " m"
      : height + " cm";
  let weight = pokemon.weight;
  let weightDisplay = weight >= 100 ? weight / 10 + " kg" : weight + " g";

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

  let typesHTML = "";
  for (let j = 0; j < pokemon.types.length; j++) {
    typesHTML += pokemon.types[j].type.name;
    if (j < pokemon.types.length - 1) {
      typesHTML += ", ";
    }
  }

  let mainTypeClass = pokemon.types[0].type.name;

  overlayContent.innerHTML = /*html*/ `
  <div class="card overlay-card">
      <div class="upper-card ${mainTypeClass}">
        <img class="card-img-top" id="img-card" src="${pokemon.sprites.other["official-artwork"].front_default}" alt="Card image cap">
         <div class="card-body">
          <h3 class="card-title">${name}</h3>
          <p class="card-text">Types: ${typesHTML}</p>
        </div>
      </div>

      <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">About</a>
          <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Stats</a>
          <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Moves</a>
        </div>
      </nav>
        <div class="tab-content" id="nav-tabContent">
          <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
            <p>Height: ${heightDisplay}</p>
            <p>Weight: ${weightDisplay}</p>
          <div>
            <p>Abilities</p>
            <ul>
              ${abilitiesHTML}
            </ul>
          </div>
          </div>
          <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
          <ul class="list-group list-group-flush">
        ${statsHTML}
          </ul>
          </div>
          <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div>
        </div>

  <div class="card-body">
    <img class="arrow-btn" src="./img/icons8-links-eingekreist-50.png" alt="Pfeil links" onclick="changeDirection(-1)">
    <img class="arrow-btn" src="./img/icons8-pfeil-rechts-50.png" alt="Pfeil rechts" onclick="changeDirection(+1)">
  </div>
</div>
  `;
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
