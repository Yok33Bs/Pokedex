import generateOptions, { filterPokemon } from "./Filtro-select.js";
import peticion from "./searchPokemon.js";

//queryselector
const pokeTable = document.querySelector('#pokeTable');
const selects = document.querySelectorAll('.select');
const pokeDatos = document.querySelector('#pokeDatos');
//const options = document.querySelectorAll('.option');


//eventos

pokeTable.onload = allPokemon()

selects.forEach(select =>{

    select.onload = generateOptions(select)

    select.addEventListener('change', (e)=>{             
        e.preventDefault();
        filterPokemon(select);
    });
    
});




//funciones

export default function showPokemon(pokemon) {

    const pokeCard = `
    <card class="pokeCard">
        <h4># ${pokemon.id.toString().padStart(3,0)}</h4>
        <img src="${pokemon.sprites.front_default}">
        <h1>${pokemon.name}</h1>
    </card>`
    
    pokeTable.innerHTML += pokeCard ;
};

async function allPokemon( max = 12 ){

   for(let i = 1; i <= max; i++){
      const pokemon = await peticion(`https://pokeapi.co/api/v2/pokemon/${i}/`)
      showPokemon(pokemon);
   }
}

async function pokeInfo(pokemon){
    console.log(pokemon);
}