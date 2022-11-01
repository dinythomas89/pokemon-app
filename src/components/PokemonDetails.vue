<template>
  <div v-if="loading"><LoadingComponent /></div>
  <div v-else-if="error"><ErrorComponent /></div>
  <div v-else class="pokemon-details-container">
    <h2>{{ data.name }}</h2>
    <div>
      <div>
        <h3>Abilities</h3>
        <ul>
          <li v-for="(ability, index) in abilities" :key="index">
            {{ ability.ability.name }}
          </li>
        </ul>
      </div>
      <div>
        <h3>Moves</h3>
        <ul>
          <li v-for="(move, index) in moves" :key="index">
            {{ move.move.name }}
          </li>
        </ul>
      </div>
      <div>
        <h3>Stats</h3>
        <ul>
          <li v-for="(stat, index) in stats" :key="index">
            {{ stat.stat.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref, watchEffect } from "vue";
import ErrorComponent from "./ErrorComponent.vue";
import LoadingComponent from "./LoadingComponent.vue";

export default {
  name: "PokemonDetails",
  components: { ErrorComponent, LoadingComponent },
  props: ["pokemonName"],
  setup(props) {
    const loading = ref(false);
    const error = ref(null);
    const state = reactive({
      data: {},
      abilities: [],
      moves: [],
      stats: [],
    });

    async function getData() {
      try {
        error.value = null;
        loading.value = true;
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${props.pokemonName.toLowerCase()}`
        );
        state.data = await response.json();
        loading.value = false;
        state.abilities = state.data.abilities;
        state.moves = state.data.moves;
        state.stats = state.data.stats;
      } catch (e) {
        loading.value = false;
        error.value = e;
        throw new Error(error.value);
      }
    }

    watchEffect(getData);

    return {
      loading,
      ...toRefs(state),
    };
  },
};
</script>

<style scoped>
.pokemon-details-container {
  margin: 0.5em;
  padding: 0.2em;
  text-align: center;
}
ul {
  text-align: left;
}
@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .pokemon-details-container > div {
    display: flex;
    justify-content: space-evenly;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
}
@media only screen and (min-width: 1200px) {
  .pokemon-details-container > div {
    display: flex;
    justify-content: space-evenly;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
}
</style>
