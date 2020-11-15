<!-- map search 最外層 -->
<template>
    <div class="map-search-wrapper">
        <SearchBarWrapper></SearchBarWrapper>
        <!-- 地圖顯示的畫面 wrapper -->
        <MapAndList></MapAndList>
    </div>
</template>

<script>
import SearchBarWrapper from "./SearchBarＷrapper"
import MapAndList from "./MapAndList"
export default {
    name: "MapSearchWrapper",
    components: {
        SearchBarWrapper,
        MapAndList
    },
};
</script>
<style lang="sass" scoped>

</style>
