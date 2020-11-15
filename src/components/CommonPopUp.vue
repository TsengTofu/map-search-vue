<!-- 共用 PopUP 版型 -->
<template>
<!-- v-if="pop_up_flag" style="position: relative" -->
    <div class="common-popup">
        {{ targetHotelData.Name }}
        <div class="hotel-img">
            <img :src="targetHotelData.Thumb" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: "CommonPopUp",
    props:[
        'targetHotelData',
        // '',
    ],
    data() {
        return {};
    },
    mounted(){
        console.log(this.targetHotelData); // 這邊已經抓得到資料了
    },
    methods:{

    }
};
</script>




<style lang="sass" scoped>
.common-popup
    display: block
    width: 100px
    position: absolute
    background: #fff
    color: #000
    padding: 10px
    top: -80px
    .hotel-img
        width: 100%
        img
            width: 100%
            height: auto                
        
</style>
