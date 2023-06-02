import peticion , { createPokemon } from "./Pokedex.js";

export default async function generateOptions (select){
   const options = await peticion(`https://pokeapi.co/api/v2/${select.id}`);
   
   options.results.forEach(option => {

      let nameResult = option.name.replace(/-/,' ')
      
      select.innerHTML += `<option class="option" value="${option.url}">${nameResult}</option>`;
   });
};


export async function filterPokemon(selected){
   const result = await peticion(selected.value);
   
   switch (selected.id) {
      case 'generation' : filterGeneration(result); break;
      
      case 'type' : filterType(result); break;
      
  }
};

function filterGeneration({pokemon_species}) {

   console.log(pokemon_species);
   pokemon_species.forEach(async species =>{
      
      
      const specie = await peticion(species.url);
      
      await createPokemon(specie);
   })
};
function filterType({pokemon}) {

   
   pokemon.forEach(async (pokemon , i) => {
      
      const result = await peticion(pokemon.pokemon.url);
      const species = await peticion(result.species.url);
      await createPokemon(species );
      
   })
};
