<!-- 不用套件的寫法 No Library：CDN -->
<template>
    <!-- CDN 引入的寫法 -->
    <div id="map"></div>
</template>

<!-- CDN 引入的話 index.html & 需要使用的 Component 都要放 -->
<!-- 記得把 index.html 打開 -->
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyANoV26TKh0Y-kCQJzs0g0nZ2fr6Kunk3I"></script>

<script>
export default {
    name: "MapNoLib",
    components: {},
    data() {
        return {
            // 測試套件的 marker
            center: {},
            modify_data: [],
            // center: { lat: 25.0325917, lng: 121.5624999 }, 這是舊的預設的中心點
            markers: [],
            places: [],
            currentPlace: null,

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
        console.log("初步載入");
    },
    // 會暫存資料
    // 原始資料有變動的話才會跟著更新，可以直接操作 state
    // getter & setter 只能讀取，不能改變
    //
    computed: {
        changePositionType() {
            // console.log('HelloHelloHelloHelloHelloHelloHello');
            // console.log(this.$store.getters);
            return this.$store.getters.changePositionType;
        },
    },
    // 不要用 watch 寫的原因研究
    watch: {
        changePositionType: function (value) {
            let map_center = this.changePositionType[0].Position; // 預設中心點是搜尋結果的第一個
            this.initMap(map_center);
        },
        // 地圖的 render 是透過 searchbar 的事件帶出來的
        // find_query_result: function (value) {
        //     console.log(value);
        //     // 拿資料的方式可能要經過 getter 篩選，如果都一樣，就不要在每個組件重複寫
        //     // Q:這邊會有地圖沒有出現的可能，要做對應的處理

        //     // 這和 Map 的 Code 是重複的，覺得要寫成 getter 處理
        //     let first_item = value[0];
        //     // console.log(typeof(first_item.Lat));
        //     // console.log(parseInt(first_item.Lat), parseInt(first_item.Lng));
        //     this.center = {
        //         lat: Number(first_item.Lat),
        //         lng: Number(first_item.Lng),
        //     };

        //     // 把資料格式改成 position
        //     let modifyData = value.map((item) => {
        //         console.log(item.Lat, item.Lng);
        //         return (item.Position = {
        //             lat: Number(item.Lat),
        //             lng: Number(item.Lng),
        //         });
        //     });
        //     console.log(modifyData);
        //     this.modify_data = modifyData;

        //     this.initMap(this.center);
        // },
    },
    methods: {
        // 拿到搜尋結果之後，建立地圖
        // googleMap 的座標傳入的型別一定要是數字
        initMap: function (map_center) {
            console.log(map_center);
            // 透過 Map 物件建構子建立新地圖 map 物件實例，並將地圖呈現在 id 為 map 的元素中
            this.map = new google.maps.Map(document.getElementById("map"), {
                // 設定地圖的中心點經緯度位置：這個應該會是一直改變的
                center: map_center,
                // 設定地圖縮放比例 0-20
                zoom: 15,
                // 限制使用者能縮放地圖的最大比例
                // 1：世界層級
                // 5：洲層級
                // 10：城市層級
                // 15：街道層級
                // 20：建築物層級

                maxZoom: 20,
                // 限制使用者能縮放地圖的最小比例
                minZoom: 3,
                // 設定是否呈現右下角街景小人，
                streetViewControl: false,
                // 設定是否讓使用者可以切換地圖樣式：一般、衛星圖等
                mapTypeControl: false,
                gestureHandling: "cooperative", // 如何跟地圖做互動的手勢屬性
            });

            this.map.setOptions({
                styles: [
                    // 這邊是程式碼的寫法
                    // https://console.cloud.google.com/google/maps-apis/client-styles?project=boreal-mode-293906&folder=&organizationId=79326032923
                    // 文件裡面搜尋這個也可以：Styled Map Types，有不同設定的寫法
                    {
                        featureType: "poi.business",
                        stylers: [{ visibility: "off" }],
                    },
                    {
                        featureType: "poi.medical",
                        stylers: [{ visibility: "off" }],
                    },
                    {
                        featureType: "transit",
                        elementType: "labels.icon",
                        stylers: [{ visibility: "off" }],
                    },
                ],
            });
            this.setMarker();
        },
        // 建立地標
        setMarker: function () {
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
                const marker = new google.maps.Marker({
                    // position: this.map.getCenter(),
                    position: this.changePositionType[i].Position,
                    map: this.map,
                    // label: 'C', google 預設的地標 icon 裡面會塞指定的文字
                    // html:`<p style="display:block;width:100px;height:100px;background-color:red;">dssdsd</p>`
                    // icon:
                    //     "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
                    animation: google.maps.Animation.DROP, // 這可以設定動畫，加上動畫之前最好先判斷原本是沒有動畫的
                });

                // 地圖檢視範圍
                // 這個方法要查：new google.maps.LatLng(25.014304, 121.463782)
                const bounds = new google.maps.LatLngBounds();
                this.changePositionType.map((item) => {
                    // console.log(item);
                    bounds.extend(
                        new google.maps.LatLng(
                            item.Position.lat,
                            item.Position.lng
                        )
                    );
                });
                this.map.fitBounds(bounds);
                // ------

                // info_window------------------------
                // 透過 InfoWindow 物件建構子建立新訊息視窗
                // 組字串 但其實好像不能這樣寫，因為在 vue 裡面就有可以自己更新畫面的方式，所以這裡需要想看看
                // 假設要做輪播的話，可能需要用別的方式處理
                let infoWindowContent =
                    `
                <div class="info-window"><p>` +
                    this.changePositionType[i].Name +
                    `</p>` + `<div style="width:100%;height:100px;"><img style="width:100%;height:auto" src="` + this.changePositionType[i].Thumb  +  `"></div>` +
                    `</div>`;

                var infowindow = new google.maps.InfoWindow({
                    // 設定想要顯示的內容
                    content: "",
                    // 設定訊息視窗最大寬度
                    maxWidth: 200,
                });
                // 這兩種寫法都可以
                // google.maps.event.addListener(marker, "click", function () {
                marker.addListener("click", () => {
                    if (infowindow) {
                        infowindow.close();
                    }

                    this.map.panTo(marker.getPosition());
                    // 沒有這行，點到的 marker 不會自動置中
                    infowindow.setContent(infoWindowContent);
                    // 指定在哪個地圖和地標上開啟訊息視窗
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



