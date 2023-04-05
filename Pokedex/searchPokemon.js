//funciones
export default async function peticion (url) {
    const response = await fetch(url);  
    const responseJson = await response.json();
    
    return responseJson;
};

/*Pokemon
  -id 
  -nombre
  -imagen
  -peso
  -altura
  -generacion
  -tipo
   -descripcion*/

export async function pokeInfo(pokemon) {
    console.log(pokemon);
    const {name,id,species,types,sprites} = await peticion(pokemon.dataset.info);
    const {generation,flavor_text_entries} = await peticion(species.url);
    const {main_region} = await peticion(generation.url);
    const tipos = []
    types.forEach(tipo=>{
        tipos.push(tipo.type.name)
    })
    let descripcion = ''
    flavor_text_entries.forEach(flavorTextEntrie =>{
        const {flavor_text , language } = flavorTextEntrie
        if(language.name == 'es'){descripcion += `${flavor_text} `}
    })
    

    pokeDatos.innerHTML = `
        <div id="p">
            <div id="datos">
                <div id="principal">
                    <h1>${name}</h1>
                    <h2>ID: # ${id.toString().padStart(3,0)}</h2>
                </div>
                <div id="otros">
                    <h4>Generación: ${generation.name}</h4>
                    <h4>Región: ${main_region.name}</h4>
                    <h4>Tipos:${tipos}</h4>
                </div>
            </div>
            <div id="imagen">
            <img src="${sprites.other.dream_world.front_default}">
            </div>
        </div>
            
        <div id="descripcion">
            <p>${descripcion}</p>
        </div>`
};

