<template>
  <div class="pokemon-container">
    <div>
      <button class="pokemon-image-button" @click="onPokemonButtonClick">
        <img class="pokemon-image" :src="getPokemonByIndex().image" />
      </button>
    </div>
    <div class="button-container">
      <button class="pag-button" :disabled="isDisabled()" @click="back">
        Back
      </button>
      <button class="pag-button" :disabled="isDisabled('next')" @click="next">
        Next
      </button>
    </div>
    <PokemonDetails
      v-if="showPokemonDetails"
      :pokemonName="getPokemonByIndex().name"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import { pokemonArray } from "./pokemonArray";
import PokemonDetails from "./PokemonDetails.vue";

export default {
  name: "PokemonComponent",
  components: {
    PokemonDetails,
  },
  setup() {
    const index = ref(0);
    const showPokemonDetails = ref(false);

    function getPokemonByIndex() {
      return pokemonArray[index.value];
    }

    function next() {
      showPokemonDetails.value = false;
      if (!(index.value >= pokemonArray.length - 1)) {
        index.value++;
      }
    }
    function back() {
      showPokemonDetails.value = false;
      if (index.value >= 0) {
        index.value--;
      }
    }
    function isDisabled(dir = "back") {
      if (dir == "next") {
        return index.value >= pokemonArray.length - 1;
      } else {
        return index.value == 0;
      }
    }

    function onPokemonButtonClick() {
      showPokemonDetails.value = !showPokemonDetails.value;
    }

    return {
      showPokemonDetails,
      getPokemonByIndex,
      next,
      back,
      isDisabled,
      onPokemonButtonClick,
    };
  },
};
</script>

<style scoped>
.pokemon-container {
  margin: 0 auto;
  width: 80%;
  height: 100%;
  padding: 2em;
}
.pokemon-image-button {
  width: 70%;
}
.pokemon-image {
  width: 100%;
}
.button-container {
  margin: 1em;
  display: flex;
  justify-content: center;
}
.pag-button {
  margin: 0 0.5em;
  font-size: 1.1em;
  padding: 0.5em;
  width: 20vw;
}
@media only screen and (min-width: 768px) {
  .pokemon-image-button {
    width: 50%;
  }
  .pag-button {
    width: 15vw;
  }
}
@media only screen and (min-width: 1200px) {
  .pokemon-image-button {
    width: 40%;
  }
  .pag-button {
    width: 12vw;
  }
}
</style>
