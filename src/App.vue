<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item active">
          <a class="nav-link" href="http://localhost:8080/#/">Beerra<span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://localhost:8080/#/keg">Kegs</a>
        </li>
        <li class="nav-item">
          <a class="nav-link " href="http://localhost:8080/#/brewery">Brewery</a>
        </li>
        <li class="nav-item">
          <a class="nav-link " href="http://localhost:8080/#/bottle">Bottles</a>
        </li>
           <li class="nav-item">
          <a class="nav-link " href="http://localhost:8080/#/sale">Sales</a>
        </li>
      </ul>
    </nav>
    <div id="app">
      <notifications group="foo" position="bottom right" width="450px" />
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
