<template>
  <h1>Pokedex</h1>
  <SearchPokedex />
</template>

<script>
// @ is an alias to /src
import SearchPokedex from "@/components/SearchPokedex.vue";

export default {
  name: "HomeView",
  components: {
    SearchPokedex,
  },
};
</script>
