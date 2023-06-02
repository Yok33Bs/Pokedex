import generateOptions, { filterPokemon } from "./Filtro-select.js";


export default async function peticion (url) {
    const response = await fetch(url);  
    const responseJson = await response.json();
    
    return responseJson;
};
//Variables
const pokeTable = document.querySelector('#pokeTable');
const selects = document.querySelectorAll('.select');
let pokeArray = []
let min = 1;
let max = 12;

getPokemon()
upEvent()

//eventos
function upEvent (){
    selects.forEach(select =>{
    
        select.onclick = generateOptions(select)
    
        select.addEventListener('change', (e)=>{             
            e.preventDefault();
            pokeArray = []
            filterPokemon(select);
        });
        
    });

    pokeTable.addEventListener('click', (e)=>{
        const card = e.target
        if(card.classList.contains('pokeCard'))pokeInfo(card.dataset.info);
        if(card.classList.length === 0)pokeInfo(card.parentElement.dataset.info);

    })
    pokeDatos.addEventListener('click', (e)=>{
        e.preventDefault();
        if(e.target.classList.contains('btn-close')) showOrHidden();
        if(e.target.parentElement.classList.contains('btn-close')) showOrHidden();
    })
    
}


//funciones
async function getPokemon(){
    for( min; min <= max; min++){
        const pokemon = await peticion(`https://pokeapi.co/api/v2/pokemon-species/${min}/`)
       await createPokemon(pokemon);
    }
}


export async function createPokemon(pokemonJson) {
    
    const {name,id,generation,flavor_text_entries,varieties} = pokemonJson;
    const pokemon = varieties.find(e => e.is_default == true)
    const {sprites,types} = await peticion(pokemon.pokemon.url)
    const info  = {
        id,
        type: types.map(type => type.type.name),
        name,
        img: {front: sprites.front_default, other: sprites.other.dream_world.front_default},
        generation: generation.url,
        flavors: flavor_text_entries
    }
    
    cardHTML(info)
};

export function cardHTML(info){
    
    
    const pokeCard = document.createElement('div');
    pokeCard.classList.add('pokeCard');
    pokeCard.dataset.info= JSON.stringify(info);
    const card = `
    <h4># ${info.id.toString().padStart(3,0)}</h4>
    <img src="${info.img.front}" >
    <h1>${info.name}</h1>
    `
    pokeCard.innerHTML = card;
    pokeArray.push(pokeCard);
    showCard();
}

function showCard( ){
    
    pokeTable.innerHTML = '';
    pokeArray.forEach( pokemon =>{
        pokeTable.appendChild(pokemon)
    });
}

async function pokeInfo(pokemon) {
    const info = JSON.parse(pokemon);
    const {id,type,name,img,generation,flavors} = info
    const generacion = await peticion(generation)
    let descripcion = '';

    flavors.forEach(flavor =>{
        const {flavor_text , language, version } = flavor;
        if(language.name === 'es'){
            if(version.name) descripcion += flavor_text
        }
    })
        
    showOrHidden();
    
    pokeDatos.innerHTML = `
        <div id="p">
            <div id="datos">
                <div id="principal">
                    <h1>${name}</h1>
                    <h2>ID: # ${id.toString().padStart(3,0)}</h2>
                </div>
                <div id="otros">
                <h4>Generación: ${generacion.name}</h4>
                <h4>Región: ${generacion.main_region.name}</h4>
                <h4>Tipos:${type}</h4>
                </div>
                </div>
                <div id="imagen">
                <img src="${img.other}">
                </div>
        </div>
        <div id="descripcion">
        <p>${descripcion}</p>
        </div>
        <figure class="btn-close"> 
            <div id="top"></div>
            <span id="center">X</span>
            <div id="bottom"></div>
        </figure>`;
        
};

function showOrHidden(){
    console.log('si conecta');
    switch(pokeDatos.style.display){
        case '': pokeDatos.style.display = 'grid'; break;
        case 'grid': pokeDatos.style.display = 'none'; break;
        default : pokeDatos.style.display = 'grid'; break;
    }
}