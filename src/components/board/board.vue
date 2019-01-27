<template>

<div class="board">
    <link href="https://fonts.googleapis.com/css?family=Major+Mono+Display" rel="stylesheet">
      <div class="row" style="width: 50%; margin: 0 auto;  "><div class="centerhead">
        <h1 class="h1head">Cervezas</h1>
        </div>
       
        
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
                <p>Cervecería: <small class="insideText">KM7</small></p>
               </div>
                </div>
            </div>
            </div>


                 <div class="col-md-4">
            <div class="cardX card bg-dark">
                <div class="card-header">
               <h3 class="birra nowrap">ipa</h3></div>
               <div class="card-body subcontainer">
               <img class="image" src="./coordenatix2x.png"/>
               <div class="inside">
                <p>Amargor: <small class="insideText">Bajo</small></p>
                <p>Alcohol: <small class="insideText">6%</small></p>
                 <p>Cervecería: <small class="insideText">Green Man</small></p>
               </div>
                </div>
            </div>
            </div>


            <div class="col-md-4">
            <div class="cardX card bg-dark">
                <div class="card-header">
               <h3 class="birra nowrap">imperial stout</h3></div>
               <div class="card-body subcontainer">
               <img class="image" src="./coordenatix2x.png"/>
               <div class="inside">
                <p>Amargor: <small class="insideText">Bajo</small></p>
                <p>Alcohol: <small class="insideText">6%</small></p>
                 <p>Cervecería: <small class="insideText">Tinta Roja</small></p>
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

.board{
    background: url('536.jpg');
    background-size: cover;
    height: 100%;
}

.cardX{
    height: 14em;
    width: 100%;

-webkit-box-shadow: 10px 10px 92px 1px rgba(0,0,0,0.75);
-moz-box-shadow: 10px 10px 92px 1px rgba(0,0,0,0.75);
box-shadow: 10px 10px 92px 1px rgba(0,0,0,0.75)    /* padding: 1em; */
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
  background-size: center;
   
}
</style>