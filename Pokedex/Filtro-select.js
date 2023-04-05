import peticion from "./searchPokemon.js"
import showPokemon from "./Pokedex.js";

export default async function generateOptions (select){
   const options = await peticion(`https://pokeapi.co/api/v2/${select.id}`);
   
   options.results.forEach(option => {

      let nameResult = option.name.replace(/-/,' ')
      
      select.innerHTML += `<option class="option" value="${option.url}">${nameResult}</option>`;
   });
};


export async function filterPokemon(selected){
   pokeTable.innerHTML = "" ;

   const result = await peticion(selected.value);
   
   switch (selected.id) {
      case 'generation' : filterGeneration(result); break;
      
      case 'type' : filterType(result); break;
      
  }
};

function filterGeneration({pokemon_species}) {

   pokemon_species.forEach(async species =>{
      
      const specie = await peticion(species.url);
      const variety = specie.varieties.find(e => e.is_default = true);
      const pokemon = await peticion(variety.pokemon.url);
      showPokemon(pokemon);
   })
};
async function filterType({pokemon}) {
   
   pokemon.forEach(async pokemon => {
      
      const result = await peticion(pokemon.pokemon.url);
      showPokemon(result);
      
   })
};
