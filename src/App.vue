<!-- 待辦：
1. ResetCSS 抽出來寫
2. 
 -->
<template>
    <div id="app">
        <MapSearchWrapper></MapSearchWrapper>
    </div>
</template>

<script>
import MapSearchWrapper from "./Pages/MapSearch/MapSearchWrapper";

export default {
    name: "App",
    components: {
        MapSearchWrapper,
    },
};
</script>

<style lang="sass">
#app
    font-family: Avenir, Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50
    margin-top: 60px
    ul
        list-style: none
        margin: 0px

    a
        text-decoration: none
</style>
