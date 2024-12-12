function getHeightInfo(pokemon) {
    let height = pokemon.height * 10; // Umwandlung in cm
    let heightDisplay =
      height >= 100
        ? (height / 100).toFixed(2).toString().replace(".", ",") + " m"
        : height + " cm";
  
    return heightDisplay;
  }

  function getWeightInfo(pokemon) {
    let weight = pokemon.weight;
    let weightDisplay =
      weight >= 100
        ? (weight / 10).toString().replace(".", ",") + " kg"
        : weight + " g";
  
    return weightDisplay;
  }

  function getTypeIconsHTML(pokemon) {
    let typesHTML = "";
    let typeNames = [];
  
    pokemon.types.forEach((typeObj) => {
      let typeName = typeObj.type.name;
      let iconUrl = pokemon.sprites.versions["generation-vii"][typeName]?.front_default;
  
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

  function getAbilitiesHTML(pokemon) {
    let abilitiesHTML = "";
    pokemon.abilities.forEach((ability) => {
      abilitiesHTML += `<li>${ability.ability.name}</li>`;
    });
    return abilitiesHTML;
  }

  function StatsHTMLTemplate(
    statNameUpperCase,
    progressClass,
    progress,
    baseStat
  ) {
    return /*html*/ `
      <div class="mb-2">
        <label class="stat-name">${statNameUpperCase}</label>
        <div class="progress">
          <div class="progress-bar ${progressClass}" role="progressbar" style="width: ${progress}%;" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="200">${baseStat}</div>
        </div>
      </div>
      `;
  }

  function getStatsHTML(pokemon) {
    let statsHTML = "";
    for (let k = 0; k < pokemon.stats.length; k++) {
      let statName = pokemon.stats[k].stat.name;
      let statNameUpperCase = capitalizeFirstLetter(statName);
      let baseStat = pokemon.stats[k].base_stat;
  
      let progress = Math.min(baseStat, 200);
      let progressClass = determineProgressClass(progress);
  
      statsHTML += StatsHTMLTemplate(
        statNameUpperCase,
        progressClass,
        progress,
        baseStat
      );
    }
    return statsHTML;
  }