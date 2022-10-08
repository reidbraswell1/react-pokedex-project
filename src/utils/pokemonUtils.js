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

const getPokemonImages = (list=[{"id":"0","img":""}]) => {
    console.log(`---Begin Function getPokemonImages()---`);

    let pokemonImagesId = [];

    list.forEach((element) => {
            if('name' in pokemonImagesId) {
                if(pokemonImagesId.name.includes(element.name)) {

                }
            }
            else {
                pokemonImagesId.push({"id":element.id, "img":element.img});
            }
    });
    console.log(`---End Function getPokemonImages()---`);

    pokemonImagesId.sort((a,b) => {
        return b.id < a.id;
    });
    return pokemonImagesId;
}

const filterPokemon = (filterProps={"name":[],"type":[],"weaknesses":[]}, pokemonList=[{"name":"","type":"","weaknesses":""}]) => {
    
    console.log(`---Begin filterPokemon()---`);
    
    let filteredPokemonList = filterPokemonName(filterProps.name, pokemonList);
        filteredPokemonList = filterPokemonTypes(filterProps.type, filteredPokemonList);
        filteredPokemonList = filterPokemonWeaknesses(filterProps.weaknesses, filteredPokemonList);

    filteredPokemonList.sort((a,b) => {
        return b.id < a.id;
    });
    filteredPokemonList.forEach((element) => {
        element.type.sort((a,b) => {
            return b < a;
        });
    });
    filteredPokemonList.forEach((element) => {
        element.weaknesses.sort((a,b) => {
            return b < a;
        });
    });
    
    console.log(`FilteredPokemonList=`,filteredPokemonList);
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
                    // Don't add if already in list
                    let found = false;
                    filteredPokemonList.forEach((obj, idx, array) => {
                        if(obj.id === pokemonList[i].id) {
                            found = true;
                        }
                    })
                    if(!found) {
                        filteredPokemonList.push(pokemonList[i]);
                    }
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
                    // Don't add if already in list
                    let found = false;
                    filteredPokemonList.forEach((obj, idx, array) => {
                        if(obj.id === pokemonList[i].id) {
                            found = true;
                        }
                    })
                    if(!found) {
                        filteredPokemonList.push(pokemonList[i]);
                    }
                }
            }
        }
    }
    console.log(`FilteredWeaknesses=`,filteredPokemonList);
    console.log(`---End Function filterPokemonWeaknesses()---`);
    return filteredPokemonList;

}

export { getPokemonImages, getPokemonWeaknesses, getPokemonTypes, getPokemonNames, filterPokemon };