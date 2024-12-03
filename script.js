async function fetchItem() {
  let response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0"
  );
  let responseAsJson = await response.json();
  let results = responseAsJson.results;
  renderCharacter(results);
}

function renderCharacter(results) {
  let content = document.getElementById("main-content");
  content.innerHTML = "";
  for (let i = 0; i < results.length; i++) {
    content.innerHTML += /*html*/`
        
    `;
    console.log(results[i].name);
  }
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
