<template>
  <div class="search-bar-wrapper">
    <div class="search-btn-wrapper">
      <input type="text" v-model="search_key_words" />
      <button>
        搜尋
        <span class="material-icons">Search</span>
      </button>
    </div>
    <div class="auto-complete-list">
      <ul>
        <li
          v-for="item in auto_complete_result_list"
          :key="item.value"
          @click="searchHotelService(item.label)"
        >
          <a href="#">
            <span>{{ item.icon }} {{ item.label }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SearchKeyWordAjaxCallSupport from "../../../Support/SearchKeyWordAjaxCallSupport";
import AutoCompleteAjaxCallSupport from "../../../Support/AutoCompleteAjaxCallSupport";

export default {
  name: "SearchBar",
  data() {
    return {
      search_key_words: "",
      auto_complete_result_list: [],
      find_query_result: []
    };
  },
  watch: {
    search_key_words(val) {
      let vm = this;
      vm.autoCompleteAjaxCall(val);
    }
  },

  methods: {
    autoCompleteAjaxCall: async function(keyword) {
      let vm = this;
      vm.auto_complete_result_list = await AutoCompleteAjaxCallSupport(keyword);
    },

    searchHotelService: function(auto_complete_keyword) {
      let vm = this;

      vm.search_key_words = auto_complete_keyword;
      this.find_query_result = [];
      SearchKeyWordAjaxCallSupport(vm.search_key_words);
    }
  }
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