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

const processSubmission = (event) => {
    event.preventDefault();
    console.log(`Event`,event.target[0].value);
    console.log(document.getElementById("pokemon-name").selected);
    const pokemonName = document.getElementById("pokemon-name");
    let pokemonSelectedNamesArray = [];
    for (let i=0,count=0; i<pokemonName.options.length; i++) { 
        if (pokemonName.options[i].selected) {
            pokemonSelectedNamesArray[count] = pokemonName.options[i].value;
            count++; 
        } 
    }
    const pokemonType = document.getElementById("pokemon-type");
    let pokemonSelectedTypesArray = [];
    for (let i=0,count=0; i<pokemonType.options.length; i++) { 
        if (pokemonType.options[i].selected) {
            pokemonSelectedTypesArray[count] = pokemonType.options[i].value;
            count++; 
        } 
    }
    const pokemonWeakness = document.getElementById("pokemon-weakness");
    let pokemonSelectedWeaknessesArray = [];
    for (let i=0,count=0; i<pokemonWeakness.options.length; i++) { 
        if (pokemonWeakness.options[i].selected) {
            pokemonSelectedWeaknessesArray[count] = pokemonWeakness.options[i].value;
            count++; 
        } 
    }
    console.log(`PokemonSelectedArray=`,pokemonSelectedNamesArray);
    console.log(`PokemonSelectedTypes=`,pokemonSelectedTypesArray);
    console.log(`PokemonSelectedWeaknesses=`,pokemonSelectedWeaknessesArray);
}
export { getPokemonWeaknesses, getPokemonTypes, getPokemonNames, processSubmission };