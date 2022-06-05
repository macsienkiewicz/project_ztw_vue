<template>
<body>
  <!-- Tu bedzie jeszcze logo -->
    <ul class="showcase">
      <li>
        <div class="seat"></div>
        <small>Wolne</small>
      </li>
      <li>
        <div class="seat selected"></div>
        <small>Wybrane</small>
      </li>
      <li>
        <div class="seat occupied"></div>
        <small>Zajęte</small>
      </li>
    </ul>

    <div class="screen">Ekran</div>

    <!-- Tutaj trzeba bedzie jeszcze poprawic -->

    <div class="container">

      <div class="row">1 
        <div class="seat" @click="e => e.target.classList.toggle('selected')">1</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">2</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">3</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">4</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">5</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">6</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">7</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">8</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">9</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">10</div>
      </div>
      <div class="row">2
        <div class="seat" @click="e => e.target.classList.toggle('selected')">1</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">2</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">3</div>
        <div class="seat occupied">4</div>
        <div class="seat occupied">5</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">6</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">7</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">8</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">9</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">10</div>
      </div>
      <div class="row">3
        <div class="seat" @click="e => e.target.classList.toggle('selected')">1</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">2</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">3</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">4</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">5</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">6</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">7</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">8</div>
        <div class="seat occupied">9</div>
        <div class="seat occupied">10</div>
      </div>
      <div class="row">4
        <div class="seat" @click="e => e.target.classList.toggle('selected')">1</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">2</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">3</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">4</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">5</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">6</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">7</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">8</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">9</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">10</div>
      </div>
      <div class="row">5
        <div class="seat" @click="e => e.target.classList.toggle('selected')">1</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">2</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">3</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">4</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">5</div>
        <div class="seat occupied">6</div>
        <div class="seat occupied">7</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">8</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">9</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">10</div>
      </div>
      <div class="row">6
        <div class="seat" @click="e => e.target.classList.toggle('selected')">1</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">2</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">3</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">4</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">5</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">6</div>
        <div class="seat occupied">7</div>
        <div class="seat occupied">8</div>
        <div class="seat occupied">9</div>
        <div class="seat" @click="e => e.target.classList.toggle('selected')">10</div>
      </div>
    </div>
</body>
</template>

<script>

/*const container = document.querySelector('.container');
//const seats = document.querySelectorAll('.row .seat');

container.addClickListener('click', s => {
  if(s.target.classList.contains('seat') && !s.target.classList.contains('occupied')) {
    s.target.classList.toogle('selected');
  }
});
*/




export default {
    name: 'choose-ticket',
     props: {
       //tymczasowo:
        seats: [["", "", "", "", "", "", "", "", "", ""], ["", "", "", "occupied", "occupied", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "occupied", "occupied"], ["", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "occupied", "occupied", "", "", ""], ["", "", "", "", "", "", "occupied", "occupied", "occupied", ""]],
    },
    
    methods: {
      click_seat: function(ev) {
        ev.target.classList.toogle('selected');
      }

      




    }
    
}




</script>

<style>
body {
    text-align: center;
    background-color: #0d150d;
    color: rgb(255, 255, 255);
    font-family: Helvetica;
    font-size: 24px;
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
