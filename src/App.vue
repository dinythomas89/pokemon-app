<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/pokedex">Pokedex</router-link>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(0, 0, 0);
  background-color: #a1b8ce;
  font-size: 1.3em;
}

nav {
  padding: 30px;
  text-align: right;
}

nav a {
  font-weight: bold;
  color: #000;
}

nav a.router-link-exact-active {
  color: #125f3c;
}
</style>
