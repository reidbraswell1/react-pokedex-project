const getPokemonWeaknesses = (list) => {

    console.log(`---Begin Function getPokemonWeaknesses()---`);

    let pokemonWeaknesses = [];

    list.forEach((element) => {
        element.weaknesses.forEach(weakness => {
            if(pokemonWeaknesses.includes(weakness)) {

            }
            else {
                pokemonWeaknesses.push(weakness);
            }
        });
    })
    pokemonWeaknesses.sort();
    console.log(`---End Function getPokemonWeaknesses()---`);
    
    return pokemonWeaknesses;
}

const getPokemonTypes = (list) => {
    console.log(`---Begin Function getPokemonTypes()---`);

    let pokemonTypes = [];

    list.forEach((element) => {
        element.type.forEach(type => {
            if(pokemonTypes.includes(type)) {

            }
            else {
                pokemonTypes.push(type);
            }
        });
    })

    console.log(`---End Function getPokemonTypes()---`);
    pokemonTypes.sort();
    return pokemonTypes;
}

const getPokemonNames = (list) => {
    console.log(`---Begin Function getPokemonNames()---`);

    let pokemonNamesId = [];

    list.forEach((element) => {
            if('name' in pokemonNamesId) {
                if(pokemonNamesId.name.includes(element.name)) {

                }
            }
            else {
                pokemonNamesId.push({"id":element.id, "name":element.name});
            }
    });
    console.log(`---End Function getPokemonNames()---`);

    pokemonNamesId.sort((a,b) => {
        return b.name < a.name;
    });
    return pokemonNamesId;
}

export { getPokemonWeaknesses, getPokemonTypes, getPokemonNames };