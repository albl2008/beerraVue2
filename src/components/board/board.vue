<template>

<div class="board">
    <link href="https://fonts.googleapis.com/css?family=Major+Mono+Display" rel="stylesheet">
      <div class="row" style="width: 50%; margin: 0 auto;  "><div class="centerhead">
        <h1 class="h1head">Cervezas</h1>
        </div>
        <img :src="require('@/assets/beerra/people2x.png')" alt class="underh1">
        
      </div>
    <div class="container">
        
        <div class="row">
            <div class="col-md-4">
            <div class="cardX card bg-dark">
                <div class="card-header">
               <h3 class="birra nowrap">Golden Ale</h3></div>
               <div class="card-body subcontainer">
               <img class="image" src="./coordenatix2x.png"/>
               <div class="inside">
                <p>Amargor: <small class="insideText">Bajo</small></p>
                <p>Alcohol: <small class="insideText">6%</small></p>
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
               </div>
                </div>
            </div>
            </div>


        </div>
    </div>

</div>
</template>

<script>

</script>

<style scoped>

.cardX{
    height: 14em;
    width: 100%;
    /* padding: 1em; */
}

.card-body{
    
    border-radius: 0.6em;
}

.card-header{
    padding-top: 0.3em;
    background: #2b2b2b !important;
}
.birra{
  font-family: 'Major Mono Display', monospace !important;
    font-size: 22px !important;
    max-width: 90%;
    /* text-transform:; */
    text-align: right;
    margin: 0 auto;
    font-weight: bold;
}

.image{
    width: 35%;
    float: left;
}

.inside{
    float: right;
    width: 45%;
    text-align: right;
}

.insideText{
    font-family: 'Poppins', sans-serif;
    font-size: 16px !important;
    font-weight: bold;
}

.subcontainer {
  background: url('quees.png');
  background-size: contain;
  
}
</style>