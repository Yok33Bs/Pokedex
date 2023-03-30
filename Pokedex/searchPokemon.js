import generateOptions, { filterPokemon } from "./Filtro-select.js";
import peticion from "./Pokedex.js";

//queryselector
const selects = document.querySelectorAll('.select');
//const options = document.querySelectorAll('.option');


//eventos

selects.forEach(select =>{
    
    select.addEventListener('focus', (e)=>{             
        e.preventDefault();
        generateOptions(select);
    });

    select.addEventListener('change', (e)=>{             
        e.preventDefault();
        filterPokemon(select);
    });
    
}); 
