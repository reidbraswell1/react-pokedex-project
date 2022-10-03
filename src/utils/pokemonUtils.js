const getPokemonWeaknesses = (list=[{"weaknesses":""}]) => {

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

const getPokemonTypes = (list=[{"type":""}]) => {
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

const getPokemonNames = (list=[{"id":"0","name":""}]) => {
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

/*
const processSubmission = (event) => {

    console.log(`---Begin Function processSubmission()---`);

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

    console.log(`---End Function processSubmission()---`);
}
*/

const filterPokemon = (filterProps={"name":[],"type":[],"weaknesses":[]}, pokemonList=[{"name":"","type":"","weaknesses":""}]) => {
    
    console.log(`---Begin filterPokemon()---`);
    
    let filteredPokemonList = filterPokemonName(filterProps.name, pokemonList);
        filteredPokemonList = filterPokemonTypes(filterProps.type, filteredPokemonList);
        filteredPokemonList = filterPokemonWeaknesses(filterProps.weaknesses, filteredPokemonList);

    //console.log(`FilteredPokemonList=`,filteredPokemonList);
    console.log(`---End Function filterPokemon()---`);
    return filteredPokemonList;
}

const filterPokemonName = (nameProps=[], pokemonList=[{"id":""}]) => {

    console.log(`---Begin Function filterPokemonName()---`);

    let filteredPokemonList = [];
    if(nameProps.length === 1 && nameProps[0]==="All") {
        return pokemonList;
    }

    for(let i=0; i<pokemonList.length; i++) {
        for(let j=0; j<nameProps.length; j++) {
            if(pokemonList[i].id.toString() === nameProps[j].toString()) {
                filteredPokemonList.push(pokemonList[i]);
            }
        }
    }
    console.log(`---End Function filterPokemonName()---`);
    return filteredPokemonList;

}

const filterPokemonTypes = (typeProps=[], pokemonList=[{"type":[]}]) => {

    console.log(`---Begin Function filterPokemonType()---`);

    let filteredPokemonList = [];
    if(typeProps.length === 1 && typeProps[0]==="All") {
        return pokemonList;
    }

    for(let i=0; i<pokemonList.length; i++) {
        for(let j=0; j<pokemonList[i].type.length; j++) {
            for(let k=0; k<typeProps.length; k++) {
                if(pokemonList[i].type[j].toString() === typeProps[k].toString()) {
                    console.log(`Match ${k} PokemonList ${i}.type ${j} =`,pokemonList[i].type[j],` TypeProps ${k} =`,typeProps[k]);
                    filteredPokemonList.push(pokemonList[i]);
                }
            }
        }
    }
    console.log(`FilteredTypes=`,filteredPokemonList);
    console.log(`---End Function filterPokemonType()---`);
    return filteredPokemonList;

}

const filterPokemonWeaknesses = (weaknessProps=[], pokemonList=[{"weaknesses":""}]) => {

    console.log(`---Begin Function filterPokemonWeaknesses()---`);

    let filteredPokemonList = [];
    if(weaknessProps.length === 1 && weaknessProps[0]==="All") {
        return pokemonList;
    }

    for(let i=0; i<pokemonList.length; i++) {
        for(let j=0; j<pokemonList[i].weaknesses.length; j++) {
            for(let k=0; k<weaknessProps.length; k++) {
                if(pokemonList[i].weaknesses[j].toString() === weaknessProps[k].toString()) {
                    console.log(`Match ${k} PokemonList ${i}.weaknesses ${j} =`,pokemonList[i].weaknesses[j],` WeaknessProps ${k} =`,weaknessProps[k]);
                    filteredPokemonList.push(pokemonList[i]);
                }
            }
        }
    }
    console.log(`FilteredWeaknesses=`,filteredPokemonList);
    console.log(`---End Function filterPokemonWeaknesses()---`);
    return filteredPokemonList;

}

export { getPokemonWeaknesses, getPokemonTypes, getPokemonNames, filterPokemon };