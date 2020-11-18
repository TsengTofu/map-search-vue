<!-- 套件寫法 -->
<!-- 待辦：
1. MarkerCluster 還沒製作
2. 點擊地圖上的地標、點擊清單會跳到對應的位置
3. 沒把 state 的寫法改成 getter
4. 改成 Vuex 會有問題
 -->
<template>
    <!-- gmap-map 地圖本身 -->
    <gmap-map :center="center" :zoom="15" style="width: 50%; height: 80vh" ref="gmap">
        <!-- GmapMarker：套件提供，但不能客製化 -->
        <gmap-custom-marker v-for="(item, index) in find_query_result" :key="index" :marker="item.Position" alignment="bottomright" :offsetX="-10" :offsetY="17.5" class="price-marker" @click.native="getTargetHotelData(item.ID, item.Position)">
            <p style="margin: 0px">NT$ {{ item.DisplayPrice.Room }}</p>
            <span class="direction"></span>
            <!-- 飯店 Popup 共用版 -->
            <common-popup v-if="target_hotel_data && pop_up_flag &&item.ID == target_hotel_data.ID" :targetHotelData="target_hotel_data"></common-popup>
        </gmap-custom-marker>
    </gmap-map>
</template>

<script>
import GmapCustomMarker from "vue2-gmap-custom-marker";
import CommonPopUp from "../../Pages/MapSearch/Components/CommonPopUp";
export default {
    name: "Map",
    components: {
        "gmap-custom-marker": GmapCustomMarker,
        "common-popup": CommonPopUp,
    },
    data() {
        return {
            center: {},
            target_hotel_data: "",
            pop_up_flag: false, // 控制 common-popup 的開關
            markers: [],
            modify_data: [],
            map: null,
        };
    },
    computed: {
        find_query_result() {
            return this.$store.state.map.find_query_result;
        },
        // changePositionType() {
        //     return this.$store.getters.changePositionType;
        // }
    },
    watch: {
        find_query_result: function (value) {
            let first_item = value[0];
            this.center = {
                lat: Number(first_item.Lat),
                lng: Number(first_item.Lng),
            };
            
            let modifyData = value.map((item) => {
                console.log(item.Lat, item.Lng);
                return (item.Position = {
                    lat: Number(item.Lat),
                    lng: Number(item.Lng),
                });
            });
            console.log(modifyData);
            this.modify_data = modifyData;

            // 自動抓取全部的 Marker 決定顯示範圍
            this.$gmapApiPromiseLazy().then((google) => {
                window.vueGoogleMapsInit(google);
                var bounds = new google.maps.LatLngBounds();
                this.$refs.gmap.$mapPromise.then(() => {
                    this.modify_data.map((item) => {
                        bounds.extend(new google.maps.LatLng(item.lat, item.lng));
                    });
                    this.$refs.gmap.$mapObject.fitBounds(bounds);
                });
            });
        },
        // changePositionType: function (value) {
        //     // 自動抓取全部的 Marker 決定顯示範圍
                
        //     this.$gmapApiPromiseLazy().then((google) => {
        //         window.vueGoogleMapsInit(google);
        //         var bounds = new google.maps.LatLngBounds();
        //         this.$refs.gmap.$mapPromise.then(() => {
        //             value.map((item) => {
        //                 console.log(item);
        //                 bounds.extend(new google.maps.LatLng(item.lat, item.lng));
        //             });
        //             this.$refs.gmap.$mapObject.fitBounds(bounds);
        //         });
        //     });
        // },

    },
    methods: {
        getTargetHotelData: function (hotel_id, hotel_position) {
            console.log("hotel_id", hotel_id);
            this.changePositionType.map((item) => {
                if (item.ID == hotel_id) {
                    this.target_hotel_data = item;
                }
            });
            this.pop_up_flag = true;
            // 把這筆資料丟出去，render 在 popup 資料裡面
            this.panToClickMarker(hotel_position);

        },
        // 改變選到的視角範圍
        panToClickMarker: function(hotel_position){
            console.log('panToClickMarker', hotel_position);
            this.$refs.gmap.$mapObject.panTo(hotel_position);
        }
    },
};


// pure js 觸發地圖事件的設定寫法
// map.addListener('zoom_changed', function() {
//   infowindow.setContent('Zoom: ' + map.getZoom());
// });

// 改變 infowindow 裡面的文字的 pureJS
// infowindow.setContent('Zoom: ' + map.getZoom());

// 在 setMarker() 方法中，先呼叫 deleteMarkers() 方法，將舊的地標刪除後，才建立新地標
// deleteMarkers() 方法：使用 marker 的 setMap() 方法，並帶入參數 null 移除地標，同時需要清空存有地標的 markers 陣列
</script>

<style lang="sass" scoped>
#map
    height: 400px
.price-marker
    background: #fff
    border-radius: 20px
    border: 1px solid #03a9f4
    font-size: 12px
    padding: 5px 10px
    font-weight: bold
    color: #03a9f4
    cursor: pointer
    position: relative
    &:hover
        background: #03a9f4
        color: #fff
        .direction
            &:after
                border-color: #03a9f4 transparent transparent transparent
    .direction
        content: ''
        width: 0
        height: 0
        border-left: 10px solid transparent
        border-right: 10px solid transparent
        border-top: 10px solid #03a9f4
        position: absolute
        left: 40%
        top: 100%
        &:after
            content: ''
            width: 0
            height: 0
            border-style: solid
            border-width: 9px 8px 0 8px
            border-color: #fff transparent transparent transparent
            position: relative
            left: -8px
            top: -1px
</style>



