async function fetchItem() {
  let response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=30&offset=0"
  );
  let responseAsJson = await response.json();
  let results = responseAsJson.results;

  for (let i = 0; i < results.length; i++) {
    let pokemonResponse = await fetch(results[i].url);
    let pokemonData = await pokemonResponse.json();
    console.log(pokemonData);
    renderCharacter(pokemonData);
  }
}

function renderCharacter(pokemon) {
  let content = document.getElementById("main-content");
  let name = pokemon.name;
  let imageUrl = pokemon.sprites.front_default;

  content.innerHTML += /*html*/ `
<div class="card" style="width: 18rem;">
  <img class="card-img-top" src="${imageUrl}" alt="iamge-Pokémon">
  <div class="card-body">
    <h3 class="card-title">${name}</h3>
    </div>
  
</div>
    `;
}

// let avatar = responseAsJson[0].results;
// let content = document.getElementById("content");

// async function fetchChar() {
//   let character = await fetch("https://thronesapi.com/api/v2/Characters");
//   let responseAsJson = await character.json();
//   console.log(responseAsJson);
//   console.log(
//     responseAsJson[0].firstName +
//       " " +
//       responseAsJson[0].lastName +
//       " " +
//       responseAsJson[0].imageUrl
//   );
// renderCharacter(responseAsJson);
//   // let avatar=responseAsJson[]
// }

// function renderCharacter(character) {
//   content.innerHTML = "";
//   for (let i = 0; i < character.length; i++) {
//     console.log(character[i]['fullName']);
//     content.innerHTML+=/*html*/`
//         <div>${character[i]['fullName']}
//             <img class='imgGame' src="${character[i]['imageUrl']}" alt="">
//         </div>
//     `
//   }
// }
