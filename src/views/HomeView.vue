<template>
  <h1>Pokemon</h1>
  <PokemonComponent />
</template>

<script>
import PokemonComponent from "@/components/PokemonComponent.vue";

export default {
  name: "HomeView",
  components: {
    PokemonComponent,
  },
};
</script>
