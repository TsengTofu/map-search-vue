<template>
    <div class="search-bar-wrapper">
        <div class="search-btn-wrapper">
            <input type="text" v-model="search_key_words" />
            <button>搜尋<span class="material-icons">Search</span></button>
        </div>
        <div class="auto-complete-list">
            <ul>
                <li v-for="item in auto_complete_result" :key="item.value" @click="chooseLocation(item.label)">
                    <a href="#"><span>{{ item.icon }} {{ item.label }}</span></a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "SearchBar",
    data() {
        return {
            search_key_words: "",
            auto_complete_result: [], // autocomplete show 出來的結果
            find_query_result: [],
        };
    },
    watch: {
        search_key_words(val) {
            console.log("搜尋關鍵字有變動：", val);
            this.autoCompleteAjaxCall(val);
        },
    },
    created() {
        // console.log(this.$store.state.map);
    },
    mounted() {
        // this.searchKeywordAjaxCall('台北'); // 因為 api 壞掉先這樣寫
    },
    methods: {
        // call ajax 自動完成
        autoCompleteAjaxCall: function (keyword) {
            // https://www.tripresso.com/hotel/search/ajaxKeywordCT?term=桃園
            const cors = "https://cors-anywhere.herokuapp.com/";
            // 這邊的文字會變動
            let api =
                "http://www.tripresso.com/hotel/search/ajaxKeywordCT?term=" +
                keyword;
            // 這邊會有跨網域請求的問題，解決方法蠻神奇的
            this.axios.get(`${cors}${api}`).then((response) => {
                console.log(response.data);
                this.auto_complete_result = response.data;
                // icon: "location"
                // label: "桃園忠烈祠"
                // value: "6177728-6332213"
            });
        },
        chooseLocation: function (auto_complete_keyword) {
            console.log("選了！", auto_complete_keyword);
            // 原本官網的做法是把 keyword 直接塞到網址做搜尋
            this.search_key_words = auto_complete_keyword;
            console.log(this.search_key_words, "!!!!");
            // 帶入搜索 call 的 ajax function

            this.searchKeywordAjaxCall(this.search_key_words);
        },
        // 搜索的 function
        // 這隻怪怪的，明天記得先處理這邊
        searchKeywordAjaxCall: function (query_string) {
            console.log(query_string, "query_string");
            this.find_query_result = [];
            this.axios.get("fake_hotel_data.json").then((response) => {
                console.log(response.data);
                response.data.filter((item) => {
                    console.log(item.City);
                    if (item.City == query_string) {
                        this.find_query_result.push(item);
                    }
                });

                console.log(this.find_query_result, "哈囉我是結果");
                // 再繼續把 map 的結果 render 出來
                this.$store.dispatch("updateSearchHotelResult", this.find_query_result);
                // this.renderMap(this.find_query_result);
            });
        },

        // render 出對應的畫面，這隻 function 要回到 map component 裡面去處理
        renderMap: function (find_query_result) {
            console.log(find_query_result);
            // 這邊的資料要傳回去最上面再 Render
            // this.$store.dispatch("updateSearchHotelResult", find_query_result);
            console.log(this.$store.state.map); // 測試資料有沒有改變
        },
    },
};
</script>
<style lang="sass" scoped>
.search-bar-wrapper
    width: 80%
    margin: 0 auto
    .search-btn-wrapper
        width: 100%
        display: flex
        justify-content: center
        input
            width: 75%
            font-size: 18px
            border-radius: 4px 0 0 4px
            border: 1px solid #ddd
            padding: 0 10px
        button
            width: 25%
            background: #000
            color: #fff
            border-style: none
            font-weight: bold
            font-size: 18px
            padding: 10px
            border-radius: 0 4px 4px 0
    .auto-complete-list
        width: 75%
        background: #eeeeee
        position: relative
        z-index: 999
        ul
            li
                padding: 10px
</style>