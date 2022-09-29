const derivePokemonWeaknesses = (list) => {

    console.log(`---Begin Function derivePokemonWeaknesses()---`);

    console.log(`List`,list);
    let pokemonWeaknesses = [];

    list.forEach((weaknesses) => {
        console.log(`Weaknesses=`,weaknesses);
        weaknesses.weaknesses.forEach(weakness => {
            console.log(`Weakness=`,weakness)
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

const derivePokemonTypes = (props) => {

}

export { derivePokemonWeaknesses, derivePokemonTypes };