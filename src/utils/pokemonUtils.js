const getPokedexList = async (urlTest = false,) => {
    console.log(`---Begin Function ${getPokedexList.name}()---`);

    const BAD_URL = "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.jsons"
    const GOOD_URL = "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
    let URL = "";

    // Set URL to the good url or bad based on the errTest prop
    if (urlTest) {
        URL = BAD_URL;
    }
    else {
        URL = GOOD_URL;
    }
    try {
        const response = await fetch(URL);
        if (response.ok) {
            const result = await response.json();
            console.log(`${getPokedexList.name} Result =`,result);
            return ({ "data": result });
        }
        else {
            console.log(`${getPokedexList.name} Error Result =`,response.status);
            return ({"err":`An Error Occurred Fetching From URL ${URL}. Response Code = ${response.status}`});
        }
    }
    catch (err) {
        console.log(`${getPokedexList.name} Fetch Error =`, err);
    }
    console.log(`---End Function ${getPokedexList.name}()---`);
}

const getPokemonWeaknesses = (list = [{ "weaknesses": "" }]) => {

    console.log(`---Begin Function ${getPokemonWeaknesses.name}()---`);

    let pokemonWeaknesses = [];

    list.forEach((element) => {
        element.weaknesses.forEach(weakness => {
            if (pokemonWeaknesses.includes(weakness)) {

            }
            else {
                pokemonWeaknesses.push(weakness);
            }
        });
    })
    pokemonWeaknesses.sort();
    console.log(`---End Function ${getPokemonWeaknesses.name}()---`);

    return pokemonWeaknesses;
}

const getPokemonTypes = (list = [{ "type": "" }]) => {

    console.log(`---Begin Function ${getPokemonTypes.name}()---`);

    let pokemonTypes = [];

    list.forEach((element) => {
        element.type.forEach(type => {
            if (pokemonTypes.includes(type)) {

            }
            else {
                pokemonTypes.push(type);
            }
        });
    })

    console.log(`---End Function ${getPokemonTypes.name}()---`);
    pokemonTypes.sort();
    return pokemonTypes;
}

const getPokemonNames = (list = [{ "id": "0", "name": "" }]) => {

    console.log(`---Begin Function ${getPokemonNames.name}()---`);

    let pokemonNamesId = [];

    list.forEach((element) => {
        if ('name' in pokemonNamesId) {
            if (pokemonNamesId.name.includes(element.name)) {

            }
        }
        else {
            pokemonNamesId.push({ "id": element.id, "name": element.name });
        }
    });

    console.log(`---End Function ${getPokemonNames.name}()---`);

    pokemonNamesId.sort((a, b) => {
        return b.name < a.name;
    });
    return pokemonNamesId;
}

const filterPokemon = (filterProps = { "name": [], "type": [], "weaknesses": [] }, pokemonList = [{ "name": "", "type": "", "weaknesses": "" }]) => {

    console.log(`---Begin ${filterPokemon.name}()---`);

    let filteredPokemonList = filterPokemonName(filterProps.name, pokemonList);
    filteredPokemonList = filterPokemonTypes(filterProps.type, filteredPokemonList);
    filteredPokemonList = filterPokemonWeaknesses(filterProps.weaknesses, filteredPokemonList);

    filteredPokemonList.sort((a, b) => {
        return b.id < a.id;
    });
    filteredPokemonList.forEach((element) => {
        element.type.sort((a, b) => {
            return b < a;
        });
    });
    filteredPokemonList.forEach((element) => {
        element.weaknesses.sort((a, b) => {
            return b < a;
        });
    });

    console.log(`${filterPokemon.name} FilteredPokemonList=`, filteredPokemonList);
    console.log(`---End Function ${filterPokemon.name}()---`);
    return filteredPokemonList;
}

const filterPokemonName = (nameProps = [], pokemonList = [{ "id": "" }]) => {

    console.log(`---Begin Function ${filterPokemonName.name}()---`);

    let filteredPokemonList = [];
    if (nameProps.length === 1 && nameProps[0] === "All") {
        return pokemonList;
    }

    for (let i = 0; i < pokemonList.length; i++) {
        for (let j = 0; j < nameProps.length; j++) {
            if (pokemonList[i].id.toString() === nameProps[j].toString()) {
                filteredPokemonList.push(pokemonList[i]);
            }
        }
    }
    console.log(`---End Function ${filterPokemonName.name}()---`);
    return filteredPokemonList;
}

const filterPokemonTypes = (typeProps = [], pokemonList = [{ "type": [] }]) => {

    console.log(`---Begin Function ${filterPokemonTypes.name}()---`);

    let filteredPokemonList = [];
    if (typeProps.length === 1 && typeProps[0] === "All") {
        return pokemonList;
    }

    for (let i = 0; i < pokemonList.length; i++) {
        for (let j = 0; j < pokemonList[i].type.length; j++) {
            for (let k = 0; k < typeProps.length; k++) {
                if (pokemonList[i].type[j].toString() === typeProps[k].toString()) {
                    // Don't add if already in list
                    let found = false;
                    filteredPokemonList.forEach((obj, idx, array) => {
                        if (obj.id === pokemonList[i].id) {
                            found = true;
                        }
                    })
                    if (!found) {
                        filteredPokemonList.push(pokemonList[i]);
                    }
                }
            }
        }
    }
    console.log(`${filterPokemonTypes.name} FilteredTypes=`, filteredPokemonList);
    console.log(`---End Function ${filterPokemonTypes.name}()---`);
    return filteredPokemonList;

}

const filterPokemonWeaknesses = (weaknessProps = [], pokemonList = [{ "weaknesses": "" }]) => {

    console.log(`---Begin Function ${filterPokemonWeaknesses.name}()---`);

    let filteredPokemonList = [];
    if (weaknessProps.length === 1 && weaknessProps[0] === "All") {
        return pokemonList;
    }

    for (let i = 0; i < pokemonList.length; i++) {
        for (let j = 0; j < pokemonList[i].weaknesses.length; j++) {
            for (let k = 0; k < weaknessProps.length; k++) {
                if (pokemonList[i].weaknesses[j].toString() === weaknessProps[k].toString()) {
                    // Don't add if already in list
                    let found = false;
                    filteredPokemonList.forEach((obj, idx, array) => {
                        if (obj.id === pokemonList[i].id) {
                            found = true;
                        }
                    })
                    if (!found) {
                        filteredPokemonList.push(pokemonList[i]);
                    }
                }
            }
        }
    }
    console.log(`${filterPokemonWeaknesses.name} FilteredWeaknesses=`, filteredPokemonList);
    console.log(`---End Function ${filterPokemonWeaknesses.name}()---`);
    return filteredPokemonList;

}

export { getPokedexList, getPokemonWeaknesses, getPokemonTypes, getPokemonNames, filterPokemon };