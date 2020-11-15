<template>
    <div id="app">
        <MapSearchWrapper></MapSearchWrapper>
    </div>
</template>

<script>
import MapSearchWrapper from "./components/MapSearchWrapper";

export default {
    name: "App",
    components: {
        MapSearchWrapper,
    },
};
</script>




<style lang="sass">
// 最外層
#app
    font-family: Avenir, Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50
    margin-top: 60px
    // 這邊其實應該要寫 reset css
    ul
        list-style: none
        margin: 0px

    a
        text-decoration: none
</style>
