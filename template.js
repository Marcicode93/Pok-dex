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

function capitalizeFirstLetter(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function getMainTemplate(mainTypeClass, imageUrl, name, typesHTML, i) {
  return /*html*/ `
    <div class="card card-hover ${mainTypeClass}" onclick="toggleOverlay(event,${i})">
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
<button id="close-btn" onclick="toggleOverlay(event)">X</button>
      <div class="upper-card ${mainTypeClass}">
        <img class="card-img-top" id="img-card" src="${pokemon.sprites.other["official-artwork"].front_default}" alt="Card image cap"  onclick="this.classList.add('animate-wiggle'); setTimeout(() => this.classList.remove('animate-wiggle'), 500);">
         <div class="card-body">
          <h3 class="card-title">${name}</h3>
          <p class="card-text">Types: ${typesHTML}</p>
        </div>
      </div>

      <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">About</a>
          <a class="nav-item nav-link" id="nav-stats-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Stats</a>
          <a class="nav-item nav-link" id="nav-moves-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Moves</a>
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
          <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
          <ul class="list-group list-group-flush">
        ${statsHTML}
          </ul>
          </div>
          <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div>
        </div>

  <div class="card-body arrow-buttons">
    <img class="arrow-btn" src="./img/icons8-links-eingekreist-50.png" alt="Pfeil links" onclick="changeDirection(-1)">
    <img class="arrow-btn" src="./img/icons8-pfeil-rechts-50.png" alt="Pfeil rechts" onclick="changeDirection(+1)">
  </div>
</div>
    `;
}
