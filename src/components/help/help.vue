<template>
<div id="help">
<div class="container">

<pdf v-for="i in numPages"
            :key="i"
            :src="src"
            :page="i"
            style="display: inline-block; width: 48%; padding: 0.5em;"></pdf>
</div></div>
</template>
<script>
import pdf from 'vue-pdf'
import axios from 'axios'
var loadingTask = pdf.createLoadingTask('../static/beerraM-min.pdf');

export default {
    components: {
        pdf
    },
    data() {
        return {
            src: loadingTask,
            numPages: undefined
        }
    },
    mounted() {

        this.src.then(pdf => {

            this.numPages = pdf.numPages;
        });
    }
}
</script>

<style scoped>
body{
    background: #2b2b2b;
}
</style>