<!-- 搜尋到的結果清單最外層 wrapper -->
<template>
    <div class="map-list-wrapper">
        <ul>
            <li v-for="(item, index) in find_query_result" :key="index">
                <a href="#">
                    <div class="left-pic">
                        <img :src="item.Thumb" alt="">
                    </div>
                    <div class="right-info">
                        <h4>{{item.Name}}</h4>
                        <span>{{item.Address}}</span>
                        <!-- 星星數 -->
                        <div>
                            <span v-for="n in parseInt(item.Star)" :key="n" class="material-icons-round">star_rate</span>
                        </div>
                        <!-- 這兩個有可能是空的 -->
                        <p>{{item.ScoreAvg}}</p>
                        <p>{{item.ScoreDesc}}</p>
                        
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>


export default {
    name: "MapListWrapper",
    components: {
        // Map,
        // SearchBar
    },
    computed: {
        // 這樣不就跟 Map.vue 的寫法重複了嗎？
        find_query_result() {
            return this.$store.state.map.find_query_result;
        },
    },
    watch: {
        // 少用 watcher 效能不好
        // find_query_result(value){
        //     console.log(value);
        // }
    },
    mounted() {
        // console.log(this.find_query_result);

    },
    methods:{
    }
};
</script>




<style lang="sass" scoped>
// reset css 之後要拆開，不能全部都寫在一起
.map-list-wrapper
    ul
        width: 100%
        li
            a
                width: 50%
                display: flex
                .left-pic
                    width: 35%
                    img
                        width: 100%
                        height: auto
                .right-info
                    text-align: left
                    h4
                        margin: 0
                    p
                        margin: 0

</style>
