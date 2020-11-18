<!-- 搜尋列的 wrapper 以防萬一架構包得更深 所以匡起來 -->
<!-- 昨天 James 有提到他會把功能的 js 跟 template 拆開，讓其他組建也可以引用 map -->
<template>
    <div class="search-bar-wrapper">
        <SearchBar></SearchBar>
    </div>
</template>

<script>
import SearchBar from "../SearchBar"

export default {
    name: "SearchBarWrapper",
    components: {
        SearchBar
    },
};
</script>
<style lang="sass" scoped>

</style>
