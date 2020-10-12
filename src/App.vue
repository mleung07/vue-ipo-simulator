<template>
  <div id="app">
    <TopBar />
    <Calculator />
    <Disclaimer />
  </div>
</template>

<script>
import TopBar from "./components/TopBar";
import Calculator from "./components/Calculator";
import Disclaimer from "./components/Disclaimer";

export default {
  name: "App",
  components: {
    TopBar,
    Calculator,
    Disclaimer,
  },
};
</script>

<style>
#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  margin: 0;
}
</style>
