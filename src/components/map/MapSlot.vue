<!-- Load CDN Script Version -->
<!-- 待辦：
1. infowindow 還沒寫好
2. 點擊地圖上的地標、點擊清單會跳到對應的位置
3. infoWindow 的輪播、連結功能
4. UI
 -->
<template>
    <div id="map"></div>
</template>

<script>
/*
    Load CDN Script 的套件(8kb)
    https://www.npmjs.com/package/@zaichaopan/load-script
*/
import { load } from "@zaichaopan/load-script";

/*
    Marker 地標集合套件，需額外引入(735kb)
    https://www.npmjs.com/package/@googlemaps/markerclustererplus
    https://googlemaps.github.io/js-markerclustererplus/index.html
*/
import MarkerClusterer from "@googlemaps/markerclustererplus";
export default {
    name: "MapSlot",
    computed: {
        // Vuex 取：修改飯店座標經緯度、型別的資料
        changePositionType() {
            return this.$store.getters.changePositionType;
        },
    },
    // 確定 Google 部分載入
    async mounted() {
        try {
            let google = await load({
                src: "https://maps.googleapis.com/maps/api/js",
                callbackName: "callback",
                resolve: "google",
                params: {
                    key: "AIzaSyANoV26TKh0Y-kCQJzs0g0nZ2fr6Kunk3I",
                    libraries: "places",
                },
            });
            this.googleMaps = google;
            // this.googleMaps = google.maps;
            // console.log(google);
        } catch (error) {
            console.log(error);
        }
    },
    watch: {
        // 資料變動，重新渲染 Map
        changePositionType: function () {
            let map_center = this.changePositionType[0].Position; // 預設中心點：搜尋結果的第一個
            this.initMap(this.googleMaps, map_center);
        },
    },
    methods: {
        // 地圖載入
        initMap: function (google, map_center) {
            this.map = new google.maps.Map(document.getElementById("map"), {
                center: map_center,
                zoom: 8,
                streetViewControl: false, // 設定是否讓使用者可以切換地圖樣式：一般、衛星圖等
                mapTypeControl: false,
                gestureHandling: "cooperative",
            });
            this.setMarker(google);
        },
        // 設定地標
        setMarker: function (google) {
            console.log(google);
            for (var i = 0; this.changePositionType.length > i; i++) {
                // this.map.getCenter(); 取得地圖的中心點

                // var infoWindowContent = `<div class="info-window"><p>` + 
                //     this.changePositionType[i].Name +
                //     `</p><div style="width:100%;height:100px;"><img  style="width:100%;height:auto" src="` +
                //     this.changePositionType[i].Thumb +
                //     `"></div></div>`;

                // var infowindow = new google.maps.InfoWindow({
                //     content: infoWindowContent,  // 設定想要顯示的內容
                //     maxWidth: 200,               // 設定訊息視窗最大寬度
                // });
            }

            const markers = this.changePositionType.map((item) => {
                return new google.maps.Marker({
                    position: item.Position,
                    map: this.map,
                    animation: google.maps.Animation.DROP,
                    // label: "", 地標上的文字
                    // icon: "",  客製化 icon 圖片
                });
            });

            // markers.addListener("click", () => {
            //     if (infowindow) {
            //         infowindow.close();
            //     }
            //     this.map.panTo(markers.getPosition()); // 點到的 Marker 自動置中
            //     infowindow.setContent(infoWindowContent); // 指定地圖的地標開啟視窗
            //     infowindow.open(this.map, markers);
            // });

            const bounds = new google.maps.LatLngBounds();
            this.changePositionType.map((item) => {
                return bounds.extend(
                    new google.maps.LatLng(item.Position.lat, item.Position.lng)
                );
            });
            this.map.fitBounds(bounds);
            // Google 官方推薦的套件：https://googlemaps.github.io/js-markerclustererplus/interfaces/markerclustereroptions.html
            new MarkerClusterer(this.map, markers, {
                styles: [
                // Array Object
                    {
                        textColor: "black",  // 文字顏色
                        url: "https://unpkg.com/@googlemaps/markerclustererplus@1.0.3/images/m1.png",
                        height: 52,          // 高度：更改 inline CSS
                        width: 53,           // 寬度：更改 inline CSS
                        anchorText: [0, 28], // 文字的位置
                        textLineHeight: 53,  // 跑版問題是 LineHeight 造成的
                        // className: "",    // 設定 Cluster 的 Class，但無法操控（？）
                    },
                ],
                // Cluster 不出現數字的做法
                // calculator: function (markers) {
                //     var index = 0;
                //     var count = markers.length.toString();
                //     var dv = count;
                //     while (dv !== 0) {
                //         dv = parseInt(dv / 10, 10);
                //         index++;
                //     }
                //     return {
                //         text: "",
                //         index: index,
                //     };
                // },
            });
        },
    },
};
</script>
<style lang="sass" scoped>
#map
    width: 50%
    height: 80vh
    .cluster
        div
            background: url("https://unpkg.com/@googlemaps/markerclustererplus@1.0.3/images/m1.png") no-repeat
</style>
