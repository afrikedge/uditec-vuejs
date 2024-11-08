<template>
  <div class="has-background-light" style="overflow-y:hidden ;height:100vh ;">
      <router-view></router-view>
  </div>
 
</template>

<script>


export default {
  name: 'App',

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
p,span,strong{
  font-family: -apple-system, BlinkMacSystemFont, sans-serif
}
.has-border-bottom{
    border-bottom: 4px orange solid;
}

/* width */
::-webkit-scrollbar {
  width: 7px;
  height:7px;
}

/* Track */
::-webkit-scrollbar-track {
  background:rgb(234, 234, 234); 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(255, 203, 107); 
  border-radius: 5px;
  height: 50%;
}

::-webkit-scrollbar-corner{
  background:rgba(255, 166, 0, 0.277); 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(255, 68, 0); 
}
</style>
