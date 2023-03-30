//      °buscador por nombre
//      
//  -categorias
//      generaciones
//      region
//      tipos
//      °
// 
//*Pokemon
// 
//    -id 
//    -nombre
//    -imagen
//    -peso
//    -altura
//    -generacion
//    -tipo
//    -descripcion

//elementos HTML 
const pokeTable = document.querySelector('#pokeTable');

//funciones
export default async function peticion (url) {
    const response = await fetch(url);  
    const responseJson = await response.json();

    return responseJson;
};

export function showPokemon(pokemon) {

    const pokeCard = `
    <card class="pokeCard">
        <h4># ${pokemon.id.toString().padStart(3,0)}</h4>
        <img src="${pokemon.sprites.front_default}">
        <h1>${pokemon.name}</h1>
    </card>`
    
    pokeTable.innerHTML += pokeCard ;
};

/*
async function pokeInfo(pokemon) {

    const pokedata = await peticion(pokemon.dataset.url);
    const species = await peticion(pokedata.species.url);
    const region = await peticion(species.generation.url);
    const tipos = []
    pokedata.types.forEach(tipo=>{
        tipos.push(tipo.type.name)
    })
    let descripcion = ''
    species.flavor_text_entries.forEach(flavorTextEntrie =>{
        const {flavor_text , language } = flavorTextEntrie
        if(language.name == 'es'){descripcion += `${flavor_text} `}
    })
    

    pokeDatos.innerHTML = `
        <div id="p">
            <div id="datos">
                <div id="principal">
                    <h1>${pokedata.name}</h1>
                    <h2>ID: # ${pokedata.id.toString().padStart(3,0)}</h2>
                </div>
                <div id="otros">
                    <h4>Generación: ${species.generation.name}</h4>
                    <h4>Región: ${region.main_region.name}</h4>
                    <h4>Tipos:${tipos}</h4>
                </div>
            </div>
            <div id="imagen">
            <img src="${pokedata.sprites.other.dream_world.front_default}">
            </div>
        </div>
            
        <div id="descripcion">
            <p>${descripcion}</p>
        </div>`
};*/

