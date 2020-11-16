<!-- Load CDN Script 的方法 -->
<template>
    <div id="map"></div>
</template>

<script>
// 可以直接 Load CDN Script 的套件
import { load } from "@zaichaopan/load-script";
import MarkerClusterer from "@googlemaps/markerclustererplus";
export default {
    name: "MapSlot",
    computed: {
        changePositionType() {
            // console.log(this.$store.getters);
            return this.$store.getters.changePositionType;
        },
    },
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

            // this.googleMaps = google.maps;
            // console.log(google);

            this.map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8,
                streetViewControl: false,
                // 設定是否讓使用者可以切換地圖樣式：一般、衛星圖等
                mapTypeControl: false,
                gestureHandling: "cooperative",
            });

            this.setMarker(google);
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        setMarker: function (google) {
            console.log(google);
            // 建立一個新地標，先用最簡單的陣列處理
            // this.modify_data = this.changePositionType;

            // 想辦法把 modify_data 跟 find_query_result 整併：getters
            // 這樣比較方便處理
            for (var i = 0; this.changePositionType.length > i; i++) {
                //  console.log(i, this.test_map_data);
                // this.test_map_data[i].map = this.map;
                // marker
                // marker 相關的方法：https://developers.google.com/maps/documentation/javascript/reference/marker

                // marker 要設定一個清掉的 function，如果碰到問題，marker 用 push 的方法解決
                // marker ----> setMap(null) 清空
                // const marker = new google.maps.Marker({
                //     // position: this.map.getCenter(),
                //     position: this.changePositionType[i].Position,
                //     map: this.map,
                //     // label: 'C', google 預設的地標 icon 裡面會塞指定的文字
                //     // html:`<p style="display:block;width:100px;height:100px;background-color:red;">dssdsd</p>`
                //     // icon:
                //     //     "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
                //     animation: google.maps.Animation.DROP, // 這可以設定動畫，加上動畫之前最好先判斷原本是沒有動畫的
                // });

                // 地圖檢視範圍
                // 這個方法要查：new google.maps.LatLng(25.014304, 121.463782)
                // const bounds = new google.maps.LatLngBounds();
                // this.changePositionType.map((item) => {
                //     // console.log(item);
                //     bounds.extend(
                //         new google.maps.LatLng(
                //             item.Position.lat,
                //             item.Position.lng
                //         )
                //     );
                // });
                // this.map.fitBounds(bounds);
                // ------

                // info_window------------------------
                // 透過 InfoWindow 物件建構子建立新訊息視窗
                // 組字串 但其實好像不能這樣寫，因為在 vue 裡面就有可以自己更新畫面的方式，所以這裡需要想看看
                // 假設要做輪播的話，可能需要用別的方式處理
                // let infoWindowContent =
                //     `
                // <div class="info-window"><p>` +
                //     this.changePositionType[i].Name +
                //     `</p>` +
                //     `<div style="width:100%;height:100px;"><img style="width:100%;height:auto" src="` +
                //     this.changePositionType[i].Thumb +
                //     `"></div>` +
                //     `</div>`;

                // var infowindow = new google.maps.InfoWindow({
                //     // 設定想要顯示的內容
                //     content: "",
                //     // 設定訊息視窗最大寬度
                //     maxWidth: 200,
                // });
                // // 這兩種寫法都可以
                // // google.maps.event.addListener(marker, "click", function () {
                // marker.addListener("click", () => {
                //     if (infowindow) {
                //         infowindow.close();
                //     }

                //     this.map.panTo(marker.getPosition());
                //     // 沒有這行，點到的 marker 不會自動置中
                //     infowindow.setContent(infoWindowContent);
                //     // 指定在哪個地圖和地標上開啟訊息視窗
                //     infowindow.open(this.map, marker);
                // });
            }

            // infowindows這邊要重新寫

            const markers = this.changePositionType.map((item) => {
                return new google.maps.Marker({
                    position: item.Position,
                    map: this.map,
                    animation: google.maps.Animation.DROP,
                });
            });

            const bounds = new google.maps.LatLngBounds();
            this.changePositionType.map((item) => {
                // console.log(item);
                return bounds.extend(
                    new google.maps.LatLng(item.Position.lat, item.Position.lng)
                );
            });
            this.map.fitBounds(bounds);

            // 文件看這邊：https://googlemaps.github.io/js-markerclustererplus/interfaces/markerclustereroptions.html#enableretinaicons
            new MarkerClusterer(this.map, markers, {
                imagePath:
                    "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
                clusterClass: 'test',
                averageCenter: true,
            });
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
#map
    width: 50%
    height: 80vh
</style>
