const derivePokemonWeaknesses = (list) => {

    console.log(`---Begin Function derivePokemonWeaknesses()---`);

    console.log(`List`,list);
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
    console.log(`PokemonWeaknesses=`,pokemonWeaknesses);
    console.log(`---End Function derivePokemonWeaknesses()---`);
    pokemonWeaknesses.sort();
    return pokemonWeaknesses;
}

const derivePokemonTypes = (list) => {
    console.log(`---Begin Function derivePokemonTypes()---`);

    console.log(`List`,list);
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
    console.log(`PokemonTypes=`,pokemonTypes);
    console.log(`---End Function derivePokemonTypes()---`);
    pokemonTypes.sort();
    return pokemonTypes;
}

export { derivePokemonWeaknesses, derivePokemonTypes };