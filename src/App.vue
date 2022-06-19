<template>
<body>
  <img alt="Vue logo" src="./assets/logo.png">
  <router-view />
  


</body>
  

</template>

<script>
</script>

<style>
#app {
  text-align: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(255, 255, 255);
  margin-top: 60px;
}


.screen {
  text-align: center;
}



.seat {
    text-align: center;
    background-color: #6aaf67;
    color: rgb(255, 255, 255);
    height: 40px;
    width: 50px;
    margin: 7px;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
}

.seat.selected {
    background-color: #6feaf6;
}

.seat.occupied {
    background-color: rgb(91, 2, 2);
}

.seat:nth-of-type(4) {
    margin-right: 40px;
}

.seat:nth-last-of-type(2) {
    margin-left: 40px;
}

.seat:not(.occupied):hover {
    cursor: pointer;
    transform: scale(1.2);
}


.showcase .seat:not(.occupied):hover {
    cursor: default;
    transform: scale(1);
}



.showcase {
    margin: auto;
    max-width: 680px; 
    padding: 5px 10px;
    border-radius: 5px;
    color: rgb(255, 255, 255);
    list-style-type: none;
    display: flex;
    justify-content: space-between;
}

.showcase li {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 10px;
}

.showcase li small {
    margin-left: 2px;
}

.container {
    color: #777;
    margin-top: 60px;
    perspective: 1000px;
    margin-bottom: 30px;
}

.screen {
    color: #777;
    margin-top: 60px;
    perspective: 1000px;
    margin-bottom: 30px;
}

.row {
    margin: auto;
    max-width: 680px; 
    display: flex;
}


</style>
