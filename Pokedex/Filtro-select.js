import peticion, {showPokemon} from "./Pokedex.js";

export default async function generateOptions (select){
   select.innerHTML = '';
   const options = await peticion(`https://pokeapi.co/api/v2/${select.id}`);
   
   options.results.forEach(option => {

      let nameResult = option.name.replace(/-/,' ')
      
      select.innerHTML += `<option class="option" value="${option.url}" onclick="filterPokemon()">${nameResult}</option>`;
   });
};


export async function filterPokemon(selected){
   console.log(selected);
   const result = await peticion(selected.value);
   
  switch (selected.id) {
   case 'generation':filterGeneration(result); break;

   case 'type':filterType(result); break;
   
   default: alert('ponte vioh');break;
  }
};

function filterGeneration(selected) {
   pokeTable.innerHTML = "" ;
   selected.pokemon_species.forEach(async species =>{
      
      const specie = await peticion(species.url);
      const variety = specie.varieties.find(e => e.is_default = true);
      const pokemon = await peticion(variety.pokemon.url);
      showPokemon(pokemon);
   })
};
async function filterType(selected) {
   
   selected.pokemon.forEach(async pokemon => {
      
      const result = await peticion(pokemon.pokemon.url);
      showPokemon(result);
      
   })
};