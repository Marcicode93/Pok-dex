function getTypeIconsHTML(pokemon) {
  let typesHTML = "";
  let typeNames = [];

  pokemon.types.forEach((typeObj) => {
    let typeName = typeObj.type.name;
    let iconUrl =
      pokemon.sprites.versions["generation-vii"][typeName]?.front_default;

    if (iconUrl) {
      typesHTML += `<img class="type-icon" src="${iconUrl}" alt="${typeName} icon">`;
    } else {
      typeNames.push(typeName);
    }
  });

  if (typeNames.length > 0) {
    typesHTML += `<span>${typeNames.join(", ")}</span>`;
  }

  return typesHTML;
}

function getStatsHTML(pokemon) {
  let statsHTML = "";
  for (let k = 0; k < pokemon.stats.length; k++) {
    let statName = pokemon.stats[k].stat.name;
    let baseStat = pokemon.stats[k].base_stat;

    let progress = Math.min(baseStat, 200);
    let progressClass = "";

    if (progress >= 100) {
      progressClass = "bg-success";
    } else if (progress >= 60) {
      progressClass = "bg-warning";
    } else {
      progressClass = "bg-danger";
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
  return statsHTML;
}

function getAbilitiesHTML(pokemon) {
  let abilitiesHTML = "";
  pokemon.abilities.forEach((ability) => {
    abilitiesHTML += `<li>${ability.ability.name}</li>`;
  });
  return abilitiesHTML;
}

function capitalizeFirstLetter(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function getMainTemplate(mainTypeClass, imageUrl, name, typesHTML, i) {
  return /*html*/ `
    <div class="card card-hover ${mainTypeClass}" onclick="toggleOverlay(), showPokemon(event,${i})">
        <div class="card-inner">
            <img class="card-img-top" id="main-page-img" src="${imageUrl}" alt="image-Pokémon">
              <div class="card-body main-screen-card">
                  <h5 class="card-title avatar-name">${name}</h5>
                  <div class="types">${typesHTML}</div>
              </div>
        </div>
    </div>
    `;
}

function getOverlayTemplate(
  pokemon,
  name,
  heightDisplay,
  weightDisplay,
  mainTypeClass,
  typesHTML,
  abilitiesHTML,
  statsHTML
) {
  return /*html*/ `
<div class="card overlay-card">
  <button id="close-btn" onclick="toggleOverlay()">X</button>
  <div class="upper-card ${mainTypeClass}">
    <img class="card-img-top" id="img-card" src="${pokemon.sprites.other["official-artwork"].front_default}" alt="Card image cap" onclick="this.classList.add('animate-wiggle'); setTimeout(() => this.classList.remove('animate-wiggle'), 500);">
    <div class="card-body">
      <h3 class="card-title">${name}</h3>
      <p class="card-text">Types: ${typesHTML}</p>
    </div>
  </div>

  <nav>
    <div class="nav nav-tabs" id="nav-tab" role="tablist">
      <button class="nav-item nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">About</button>
      <button class="nav-item nav-link" id="nav-stats-tab" data-bs-toggle="tab" data-bs-target="#nav-stats" type="button" role="tab" aria-controls="nav-stats" aria-selected="false">Stats</button>
    </div>
  </nav>

  <div class="tab-content" id="nav-tabContent">

    <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
      <p>Height: ${heightDisplay}</p>
      <p>Weight: ${weightDisplay}</p>
      <div>
        <p>Abilities:</p>
        <ul>
          ${abilitiesHTML}
        </ul>
      </div>
    </div>

    <div class="tab-pane fade" id="nav-stats" role="tabpanel" aria-labelledby="nav-stats-tab">
      <ul class="list-group list-group-flush">
        ${statsHTML}
      </ul>
    </div>
  </div>

  <div class="card-body arrow-buttons">
    <img class="arrow-btn" src="./img/icons8-links-eingekreist-50.png" alt="Pfeil links" onclick="changeDirection(-1,event)">
    <img class="arrow-btn" src="./img/icons8-pfeil-rechts-50.png" alt="Pfeil rechts" onclick="changeDirection(+1,event)">
  </div>
</div>
  `;
}
