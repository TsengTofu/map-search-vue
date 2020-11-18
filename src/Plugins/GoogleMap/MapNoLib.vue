<!-- index.html 引入 CDN -->
<!-- 待辦：
1. 
2. 
3. 

 地圖的 render 是透過 searchbar 的事件帶出來的
 地圖沒有出現的可能，要做對應的處理    
 -->
<template>
    <div id="map"></div>
</template>

<!-- index.html & 需要用的 Component 都要放，index.html 把 CDN Script 打開 -->
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyANoV26TKh0Y-kCQJzs0g0nZ2fr6Kunk3I"></script>

<script>
export default {
    name: "MapNoLib",
    data() {
        return {
            // center: {},
            map: null
        };
    },
    mounted() {
        console.log("初步載入");
    },
    
    // 暫存資料，原始資料有變動的話才更新，可以直接操作 state
    // getter & setter 只能讀取，不能改變 state
    computed: {
        changePositionType() {
            return this.$store.getters.changePositionType;
        },
    },
    watch: {
        changePositionType: function (value) {
            let map_center = this.changePositionType[0].Position; // 預設中心點是搜尋結果第一個
            this.initMap(map_center);
        },
    },
    methods: {
        // 建立地圖
        initMap: function (map_center) {
            // console.log(map_center);
            this.map = new google.maps.Map(document.getElementById("map"), {
                center: map_center,              // 設定地圖的中心點經緯度：會變動、型別：Number
                zoom: 15,                        // 設定地圖縮放比例 0-20
                maxZoom: 20,                     // 限制縮放地圖的最大比例：(1)世界層級 (5)洲層級 (10)城市層級 (15)街道層級 (20)建築物層級
                minZoom: 3,                      // 限制縮放地圖的最小比例
                streetViewControl: false,        // 是否呈現右下角街景小人
                mapTypeControl: false,           // 設定是否讓使用者可以切換地圖樣式
                gestureHandling: "cooperative",  // 如何跟地圖做互動的手勢屬性
            });

            this.map.setOptions({
                // GCP UI 控制：https://console.cloud.google.com/google/maps-apis/client-styles?project=boreal-mode-293906&folder=&organizationId=79326032923
                // 搜尋關鍵字：Styled Map Types
                styles: [
                    {featureType: "poi.business", stylers: [{ visibility: "off" }]},
                    {featureType: "poi.medical", stylers: [{ visibility: "off" }]},
                    {featureType: "transit", elementType: "labels.icon", stylers: [{ visibility: "off" }]},
                ],
            });
            this.setMarker();
        },
        // 建立地標
        setMarker: function () {
            for (var i = 0; this.changePositionType.length > i; i++) {
                // Marker -> setMap(null) 清空
                const marker = new google.maps.Marker({
                    position: this.changePositionType[i].Position,
                    map: this.map,
                    animation: google.maps.Animation.DROP,
                });

                // 地圖檢視範圍
                const bounds = new google.maps.LatLngBounds();
                this.changePositionType.map((item) => {
                    bounds.extend(
                        new google.maps.LatLng(item.Position.lat, item.Position.lng)
                    );
                });
                this.map.fitBounds(bounds);

                let infoWindowContent = `<div class="info-window"><p>` +
                    this.changePositionType[i].Name + `</p><div style="width:100%;height:100px;"><img style="width:100%;height:auto" src="` + this.changePositionType[i].Thumb  +  `"></div></div>`;

                var infowindow = new google.maps.InfoWindow({
                    content: "",   // 設定顯示的內容
                    maxWidth: 200, // 設定訊息視窗最大寬度
                });

                marker.addListener("click", () => {
                    if (infowindow) {
                        infowindow.close();
                    }
                    this.map.panTo(marker.getPosition());     // 點到的 Marker 自動置中
                    infowindow.setContent(infoWindowContent); // 指定地圖的地標開啟視窗
                    infowindow.open(this.map, marker);
                });
            }
        },
    },
};
</script>

<style lang="sass" scoped>
#map
    width: 50%
    height: 80vh
</style>



