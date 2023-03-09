<template>

  <h1 v-if="!pokemon">Espere por Favor...</h1>

  <div v-if="pokemon">

    <h1> ¿Quién es este pokémon? </h1>

    <PokemonPicture
      :pokemonId="pokemon.id"
      :showPokemon="showpokemon" />

    <PokemonOptions
      :pokemons="pokemonArr"
      @selection="checkAnswer" />

    <template v-if="showAnswer">
      <h2 class="fade-in">{{message}}</h2>
      <button @click="resetGame">
        Nuevo Juego
      </button>
    </template>

  </div>

</template>

<script>
import PokemonOptions from '@/components/PokemonOptions.vue'
import PokemonPicture from '@/components/PokemonPicture.vue'

import getPokemOptions from '@/helpers/getPokemonOptions'

getPokemOptions()

export default {
    components:{
        PokemonOptions,
        PokemonPicture
    },

    data(){
      return{
        pokemonArr: [],
        pokemon: null,
        showpokemon: false,
        showAnswer: false,
        message: null
      }
    },

    methods:{
      async mixPokemonArray(){
        this.pokemonArr = await getPokemOptions()

        const rndInt = Math.floor( Math.random() * 4 )
        this.pokemon = this.pokemonArr[rndInt]
      },
      checkAnswer( selectionId ){
        this.showpokemon = true
        this.showAnswer = true
        if( selectionId == this.pokemon.id){
          this.message = `Correcto, es ${this.pokemon.name}`
        }else{
          this.message = `Oops, era ${this.pokemon.name}`
        }
      },
      resetGame(){
        this.pokemonArr= [],
        this.pokemon= null,
        this.showpokemon= false,
        this.showAnswer= false,
        this.mixPokemonArray()
      }
    },

    mounted(){
      this.mixPokemonArray()
    }

}
</script>

<style>

</style>