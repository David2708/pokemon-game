
import pokemonApi from '@/api/pokemonApi'

const getPokemons = () => {
    const pokemonsArr = Array.from( Array(650) )
    return pokemonsArr.map( ( _ , index ) => index + 1 )
}

const getPokemOptions = async() => {

    const mixedPokemons = getPokemons().sort( () => Math.random() - 0.5 )

    const pokemons = await getPokemonstNames( mixedPokemons.splice(0,4) )
    
    return pokemons

}


const getPokemonstNames = async ( [a,b,c,d] = [] ) => {

    const promiseArr = [
        pokemonApi.get(`/${a}`),
        pokemonApi.get(`/${b}`),
        pokemonApi.get(`/${c}`),
        pokemonApi.get(`/${d}`),
    ]

    const resp = await Promise.all( promiseArr )
    const [ p1, p2, p3, p4 ] = resp

    return [
        {name: p1.data.name, id: p1.data.id},
        {name: p2.data.name, id: p2.data.id},
        {name: p3.data.name, id: p3.data.id},
        {name: p4.data.name, id: p4.data.id},
    ]

}


export default getPokemOptions