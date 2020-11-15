<template>
    <div class="map-and-list">
        <!-- <Map></Map> -->
        <MapNoLib></MapNoLib>
        <!-- <MapSlot></MapSlot> -->
        <MapListWrapper></MapListWrapper>
    </div>
</template>

<script>

// 切換的時候記得註解掉
// 套件版本的 Map 組件
// import Map from "./map/Map"
// CDN 版本的 Map 組件
import MapNoLib from "./map/MapNoLib"
// MapSlot 版本的 Map 組件
// import MapSlot from "./map/MapSlot"


import MapListWrapper from "./MapListWrapper" 
export default {
    name: "MapAndList",
    components: {
        // Map,      // NPM 
        MapNoLib, // CDN
        // MapSlot,  // Slot
        MapListWrapper,
    },
};
</script>
<style lang="sass" scoped>
.map-and-list
    display: flex
</style>
