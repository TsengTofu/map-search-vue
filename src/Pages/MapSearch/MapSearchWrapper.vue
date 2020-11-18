<!-- map search 最外層 -->
<template>
    <div class="map-search-wrapper">
        <SearchBarWrapper />
        <!-- 地圖畫面 wrapper -->
        <MapAndListＷrapper />
    </div>
</template>

<script>
import SearchBarWrapper from "./Components/Wrapper/SearchBarＷrapper"
import MapAndListＷrapper from "./Components/Wrapper/MapAndListＷrapper"
export default {
    name: "MapSearchWrapper",
    components: {
        SearchBarWrapper,
        MapAndListＷrapper
    },
};
</script>
<style lang="sass" scoped>

</style>
