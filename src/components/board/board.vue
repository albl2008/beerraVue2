<template>

<div class="board">
    <link href="https://fonts.googleapis.com/css?family=Major+Mono+Display" rel="stylesheet">
      <div class="row" style="width: 50%; margin: 0 auto;  "><div class="centerhead">
        <h1 class="h1head">Cervezas</h1>
        </div>
       
        
      </div>
     
    <div class="container">
     <slider animation="fade" interval="6000">
<slider-item
    v-for="(i, index) in list"
    :key="index"
    :style="i"
    @click="hello"
  >
  <div class="row rowX">
            <div class="col-md-4">
            <div class="cardX card bg-dark">
                <div class="card-header">
               <h3 class="birra nowrap">Golden Ale</h3></div>
               <div class="card-body subcontainer">
               <img class="image" src="./coordenatix2x.png"/>
               <div class="inside">
                <p>Amargor: <small class="insideText">Bajo</small></p>
                <p>Alcohol: <small class="insideText">6%</small></p>
                <p>Cervecería: <small class="insideText">KM7</small></p>
                <div class="bar rubia"></div>
               </div>
                </div>
            </div>
            </div>


                 <div class="col-md-4">
            <div class="cardX card bg-dark">
                <div class="card-header">
               <h3 class="birra nowrap">irish red</h3></div>
               <div class="card-body subcontainer">
               <img class="image" src="./tintaroja.png"/>
               <div class="inside">
                <p>Amargor: <small class="insideText">Bajo</small></p>
                <p>Alcohol: <small class="insideText">6%</small></p>
                 <p>Cervecería: <small class="insideText">Tinta Roja</small></p>
                 <div class="bar roja"></div>
               </div>
                </div>
            </div>
            </div>


            <div class="col-md-4">
            <div class="cardX card bg-dark">
                <div class="card-header">
               <h3 class="birra nowrap">imperial stout</h3></div>
               <div class="card-body subcontainer">
               <img class="image" src="./greenman.png"/>
               <div class="inside">
                <p>Amargor: <small class="insideText">Bajo</small></p>
                <p>Alcohol: <small class="insideText">6%</small></p>
                 <p>Cervecería: <small class="insideText">Green Man</small></p>
                  <div class="bar negra"></div>
               </div>
                </div>
            </div>
            </div>


            <div class="col-md-4">
            <div class="cardX card bg-dark">
                <div class="card-header">
               <h3 class="birra nowrap">Golden Ale</h3></div>
               <div class="card-body subcontainer">
               <img class="image" src="./coordenatix2x.png"/>
               <div class="inside">
                <p>Amargor: <small class="insideText">Bajo</small></p>
                <p>Alcohol: <small class="insideText">6%</small></p>
                <p>Cervecería: <small class="insideText">KM7</small></p>
                <div class="bar rubia"></div>
               </div>
                </div>
            </div>
            </div>


                 <div class="col-md-4">
            <div class="cardX card bg-dark">
                <div class="card-header">
               <h3 class="birra nowrap">irish red</h3></div>
               <div class="card-body subcontainer">
               <img class="image" src="./tintaroja.png"/>
               <div class="inside">
                <p>Amargor: <small class="insideText">Bajo</small></p>
                <p>Alcohol: <small class="insideText">6%</small></p>
                 <p>Cervecería: <small class="insideText">Tinta Roja</small></p>
                 <div class="bar roja"></div>
               </div>
                </div>
            </div>
            </div>


            <div class="col-md-4">
            <div class="cardX card bg-dark">
                <div class="card-header">
               <h3 class="birra nowrap">imperial stout</h3></div>
               <div class="card-body subcontainer">
               <img class="image" src="./greenman.png"/>
               <div class="inside">
                <p>Amargor: <small class="insideText">Bajo</small></p>
                <p>Alcohol: <small class="insideText">6%</small></p>
                 <p>Cervecería: <small class="insideText">Green Man</small></p>
                  <div class="bar negra"></div>
               </div>
                </div>
            </div>
            </div>


        </div>
    <p style="line-height: 280px; font-size: 5rem; text-align: center;">Page{{ index + 1 }}</p>
  </slider-item>
<slider-item
 
  >
  <div class="row rowX">
       <div class="col-md-4">
            <div class="cardX card bg-dark">
                <div class="card-header">
               <h3 class="birra nowrap">imperial stout</h3></div>
               <div class="card-body subcontainer">
               <img class="image" src="./greenman.png"/>
               <div class="inside">
                <p>Amargor: <small class="insideText">Bajo</small></p>
                <p>Alcohol: <small class="insideText">6%</small></p>
                 <p>Cervecería: <small class="insideText">Green Man</small></p>
                  <div class="bar negra"></div>
               </div>
                </div>
            </div>
            </div>


<div class="col-md-4">
            <div class="cardX card bg-dark">
                <div class="card-header">
               <h3 class="birra nowrap">Golden Ale</h3></div>
               <div class="card-body subcontainer">
               <img class="image" src="./coordenatix2x.png"/>
               <div class="inside">
                <p>Amargor: <small class="insideText">Bajo</small></p>
                <p>Alcohol: <small class="insideText">6%</small></p>
                <p>Cervecería: <small class="insideText">KM7</small></p>
                <div class="bar rubia"></div>
               </div>
                </div>
            </div>
            </div>

                     <div class="col-md-4">
            <div class="cardX card bg-dark">
                <div class="card-header">
               <h3 class="birra nowrap">irish red</h3></div>
               <div class="card-body subcontainer">
               <img class="image" src="./tintaroja.png"/>
               <div class="inside">
                <p>Amargor: <small class="insideText">Bajo</small></p>
                <p>Alcohol: <small class="insideText">6%</small></p>
                 <p>Cervecería: <small class="insideText">Tinta Roja</small></p>
                 <div class="bar roja"></div>
               </div>
                </div>
            </div>
            </div>

            
            
            </div>

  </slider-item>

    </slider>    
    </div> 

</div>
</template>

<script>
import { Slider, SliderItem } from 'vue-easy-slider'

export default {
    data() {
    return {
      list: [
        { backgroundColor: 'transparent', width: '100%', height: '100%' },
        
      ]
    }
  },
  methods: {
    hello($event) {
      console.log(`hello index: ${$event}`)
    },
  }
}
</script>

<style scoped>

.bar{
    height: 1em;
    width: 30%;
    border-radius: 0.3em;
    float: right;
}

.rubia{
    background: #ffa600;
}

.negra{
    background: #240e00;
}

.roja{
    background: rgb(163, 52, 0);
}
.board{
    background: url('536.jpg');
    background-size: cover;
    height: 100%;
}

.cardX{
    margin-top: 2em;
    width: 100%;
    z-index: 999;

-webkit-box-shadow: 10px 10px 31px -7px rgba(0,0,0,0.75);
-moz-box-shadow: 10px 10px 31px -7px rgba(0,0,0,0.75);
box-shadow: 10px 10px 31px -7px rgba(0,0,0,0.75);
}

.col-md-4{
  
}

.card-body{
    
    border-radius: 0.6em;
}


.card-header{
   
    background: #2b2b2b;
}
.birra{
  font-family: 'Major Mono Display', monospace !important;
    font-size: 22px !important;
    max-width: 90%;
    /* text-transform:; */
    text-align: right;
    margin: 0 auto;
    font-weight: 900;
}

p{
    margin-bottom: 0.3em;
}
.image{
    width: 35%;
    float: left;
}

.inside{
    float: right;
    width: 60%;
    text-align: right;
}

.insideText{
    font-family: 'Poppins', sans-serif;
    font-size: 16px !important;
    font-weight: bold;
}

.subcontainer {
  background: url('quees.png');
  background-size: cover;
   
}

.slider{
    height: 40em !important;

}

.container{
    padding: 0;
}

.rowX{
    padding-left: 3em;
    padding-right: 3em;
    background: transparent !important;
}

.card{
  
}

</style>