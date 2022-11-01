<template>
  <div class="search-container">
    <label for="search">Search for a pokemon</label>
    <br />
    <input
      v-on:keyup.enter="getData"
      type="search"
      v-model="searchQuery"
      id="search"
    />
    <button @click="getData">search</button>
    <div v-if="loading"><LoadingComponent /></div>
    <div v-else-if="error"><ErrorComponent /></div>
    <template v-else>
      <div class="image-container" v-if="showImage">
        <img class="pokemon-image" :src="imagePath" />
      </div>
    </template>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import ErrorComponent from "./ErrorComponent.vue";
import LoadingComponent from "./LoadingComponent.vue";

export default {
  name: "SearchPokedex",
  components: { ErrorComponent, LoadingComponent },
  setup() {
    const showImage = ref(false);
    const loading = ref(false);
    const error = ref(null);
    const state = reactive({
      data: [],
      imagePath: "",
      searchQuery: "",
    });

    async function getData() {
      try {
        error.value = null;
        loading.value = true;
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${this.searchQuery}`
        );
        state.data = await response.json();
        loading.value = false;
        state.imagePath = state.data.sprites.front_default;
        showImage.value = true;
      } catch (e) {
        loading.value = false;
        error.value = e;
        throw new Error(error.value);
      }
    }

    return {
      showImage,
      loading,
      ...toRefs(state),
      getData,
      error,
    };
  },
};
</script>

<style scooped>
.search-container {
  margin: 2em auto;
  padding: 0.8em;
  text-align: left;
}
label {
  font-size: 1.4em;
}
input[type="search"] {
  width: 70%;
}
input[type="search"],
button {
  padding: 12px 20px;
  margin: 8px 0;
  font-size: 1.2em;
}
button {
  padding: 12px 20px;
  margin: 8px 0;
  font-size: 1.2em;
}
.image-container,
.pokemon-image {
  width: 100%;
}
</style>
