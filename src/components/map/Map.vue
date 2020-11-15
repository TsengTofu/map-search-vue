<!-- 拆一個 Gmap 的組件，方便後續的利用，可參考寫好的那份檔案，引入 google-map-api 的方式 -->
<!-- 測試套件的寫法 -->
<!-- 這邊還有一個功能沒寫，點 List 裡面的東西，沒有關聯到對應的地圖座標位置 -->
<template>
    <!-- gmap-map 是地圖本身 -->
    <gmap-map
        :center="center"
        :zoom="15"
        style="width: 50%; height: 80vh"
        ref="gmap"
    >
        <!-- 這是另一種作法 -->
        <!-- <GmapMarker
            :key="index"
            v-for="(item, index) in find_query_result"
            :position="item.Position"
            :clickable="true"
            @click="center=item.Position"
        >
        </GmapMarker> -->

        <!-- v-for -->
        <!-- Cluster 可以用另外一組套件，好像會有不維護的問題？？？？看他開的 issue -->
        <!-- <div> 所以是因為我多包了一個 div 所以才會一直有多出的 vue-maps-hidden  -->
        <gmap-custom-marker
            v-for="(item, index) in find_query_result"
            :key="index"
            :marker="item.Position"
            alignment="bottomright"
            :offsetX="-10"
            :offsetY="17.5"
            class="price-marker"
            @click.native="getTargetHotelData(item.ID, item.Position)"
        >
            <p style="margin: 0px">NT$ {{ item.DisplayPrice.Room }}</p>
            <span class="direction"></span>
            <!-- 引入 Popup 共用版 -->
            <common-popup
                v-if="
                    target_hotel_data &&
                    pop_up_flag &&
                    item.ID == target_hotel_data.ID
                "
                :targetHotelData="target_hotel_data"
            ></common-popup>
        </gmap-custom-marker>
    </gmap-map>
</template>


<!-- 這邊做完要處理 renderList 那邊 -->
<!--  -->


<script>
// 試試看用這個套件：vue2-gmap-custom-marker 做不一樣的 marker
import GmapCustomMarker from "vue2-gmap-custom-marker";
import CommonPopUp from "../CommonPopUp";

// import { loaded } from "vue2-google-maps";

export default {
    name: "Map",
    components: {
        "gmap-custom-marker": GmapCustomMarker,
        "common-popup": CommonPopUp,
    },
    data() {
        return {
            // 測試套件的 marker
            // center: { lat: 25.0325917, lng: 121.5624999 },
            center: {},
            target_hotel_data: "",
            // 控制 popup 的開關
            pop_up_flag: false,

            markers: [],
            places: [],
            currentPlace: null,

            modify_data: [],

            marker: {
                lat: 25.0325917,
                lng: 121.5624999,
            },

            map: null,
            // 預設經緯度在信義區附近
            lat: 25.0325917,
            lng: 121.5624999,
            // 應該要嘗試寫一整組，標記多個位置，一定要有經緯度
            test_map_data: [
                {
                    position: {
                        lat: 25.033977,
                        lng: 121.563998,
                    },
                    map: this.map,
                    title: "測試",
                },
                {
                    position: {
                        lat: 25.034385,
                        lng: 121.566047,
                    },
                    map: this.map,
                    title: "測試1",
                },
                {
                    position: {
                        lat: 25.034315,
                        lng: 121.562047,
                    },
                    map: this.map,
                    title: "測試4",
                },
                {
                    position: {
                        lat: 25.033385,
                        lng: 121.563247,
                    },
                    map: this.map,
                    title: "測試3",
                },
                {
                    position: {
                        lat: 24.960041,
                        lng: 121.219902,
                    },
                    map: this.map,
                    title: "桃園飯店",
                },
            ],
        };
    },
    mounted() {
        console.log(this.find_query_result, "find_query_result");
        // this.$gmapApiPromiseLazy().then(() => {
        // console.log(google);

        // this.$refs.map.$mapPromise.then((map) => {
        //     var bounds = new google.maps.LatLngBounds();
        //     this.modify_data.map((item) => {
        //         console.log(item);
        //         bounds.extend(map.LatLng(item.position.lat, item.position.lng));
        //     });
        //     map.fitBounds(bounds);
        // });

        // console.log(this.find_query_result[0][0].Lat);
        // this.center = { lat: this.find_query_result[0].Lat, lng:this.find_query_result[0].LatLng }
        // 先抓到資料裡面的第一筆作為中心點
    },
    // 試試看能不能放這 或別的方法
    computed: {
        // 這是單純從 vuex 拿到資料的方式，好像要用 getter 先篩選過再帶過來比較好？（hmmmm思考）
        find_query_result() {
            return this.$store.state.map.find_query_result;
        },
    },
    // 不考慮 watcher 是效能問題
    watch: {
        find_query_result: function (value) {
            let first_item = value[0];
            // console.log(typeof(first_item.Lat));
            // console.log(parseInt(first_item.Lat), parseInt(first_item.Lng));
            this.center = {
                lat: Number(first_item.Lat),
                lng: Number(first_item.Lng),
            };

            // 把資料格式改成 position
            let modifyData = value.map((item) => {
                console.log(item.Lat, item.Lng);
                return (item.Position = {
                    lat: Number(item.Lat),
                    lng: Number(item.Lng),
                });
            });
            console.log(modifyData);
            this.modify_data = modifyData;

            // 自動抓取要顯示的範圍
            this.$gmapApiPromiseLazy().then((google) => {
                window.vueGoogleMapsInit(google);
                console.log("sadsdsd");
                var bounds = new google.maps.LatLngBounds();
                this.$refs.gmap.$mapPromise.then(() => {
                    this.modify_data.map((item) => {
                        console.log(item);
                        bounds.extend(new google.maps.LatLng(item.lat, item.lng));
                    });
                    this.$refs.gmap.$mapObject.fitBounds(bounds);
                });
                /* etc */
            });
        },
    },
    methods: {
        renderMarker: function () {
            //   const marker = new google.maps.Marker({
            //         // position: this.map.getCenter(),
            //         position: this.test_map_data[i].position,
            //         map: this.map,
            //         // html:`<p style="display:block;width:100px;height:100px;background-color:red;">dssdsd</p>`
            //        animation: google.maps.Animation.DROP, // 這可以設定動畫，加上動畫之前最好先判斷原本是沒有動畫的
            //     });
        },
        getTargetHotelData: function (hotel_id, hotel_position) {
            console.log("hotel_id", hotel_id);
            this.find_query_result.map((item) => {
                console.log(item.ID);
                if (item.ID == hotel_id) {
                    this.target_hotel_data = item;
                }
            });
            console.log(this.target_hotel_data);
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

// 這邊都先記錄純js的寫法
// >>>>pure js 觸發地圖事件的設定寫法，vue 的寫法要改掉：
// map.addListener('zoom_changed', function() {
//   infowindow.setContent('Zoom: ' + map.getZoom());
// });

// >>>>改變 infowindow 裡面的文字的 pureJS
// infowindow.setContent('Zoom: ' + map.getZoom());

// 這邊要搭配看 place api
// var request = {
//     location: pyrmont,
//     type: ['restaurant']
//   };
// type 可以看這篇文件：https://developers.google.com/places/web-service/supported_types

// 研究一下這邊的步驟：
// 透過 beforeRouteUpdate() ，根據路由的 query string 辨別使用者所點擊的地區，取得相對應的假資料 — 包含該地區的預設中心點及四間營運中的餐廳資料
// 建立 resetCenter() 方法，設定地圖新的中心點：透過 google.maps.Map 的 panTo() 方法重新給予地圖中心（相對於 setCenter() 方法，panTo() 讓地圖在移動時會有滑順的*移動效果）
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



