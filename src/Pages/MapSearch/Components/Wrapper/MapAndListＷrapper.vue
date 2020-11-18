<template>
    <div class="map-and-list">
        <Map />
        <!-- <MapNoLib></MapNoLib> -->
        <!-- <MapSlot></MapSlot> -->
        <MapHotelList />
    </div>
</template>

<script>

// 切換的時候記得註解掉
// 套件版本的 Map 組件
import Map from "../../../../Plugins/GoogleMap/Map"
// CDN 版本的 Map 組件
// import MapNoLib from "./map/MapNoLib"
// MapSlot 版本的 Map 組件
// import MapSlot from "./map/MapSlot"


import MapHotelList from "../MapHotelList" 
export default {
    name: "MapAndListWrapper",
    components: {
        Map,      // NPM 
        // MapNoLib, // CDN
        // MapSlot,  // Slot
        MapHotelList,
    },
};
</script>
<style lang="sass" scoped>
.map-and-list
    display: flex
</style>
