<template>
  <div id="app">
    <div class="title">
      <h1>Boids</h1>
      <p>@MariusBallot</p>
    </div>
    <ThreeScene />
  </div>
</template>

<script>
import ThreeScene from "./components/ThreeScene.vue";

export default {
  name: "App",
  components: {
    ThreeScene
  }
};
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;900&display=swap');

body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: radial-gradient(#000, #222);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Rubik', sans-serif;
  outline: none;
}

.title {
  position: absolute;
  top: 0;
  left: 0;
  color: #CCCCCC;
  padding: 30px;

  h1 {
    text-transform: uppercase;
  }

  p {
    font-weight: 400;
  }
}
</style>
