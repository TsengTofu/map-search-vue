// map 的 store 處理，在 store 裡面不會直接改變狀態
const state = () => ({
    // James 建議用同樣的名稱
    find_query_result: [],
})

// getters：跟 computed 很像
const getters = {
    // 更新 find_query_result 的資料處理
    changePositionType(state) {
        // console.log(state.find_query_result, 'getters');
        let modifyPositionData = state.find_query_result.map((item) => {
            item.Position = {
                lat: Number(item.Lat),
                lng: Number(item.Lng)
            }
            return item;
        })
        // console.log(modifyPositionData);
        return modifyPositionData;
    }
}

// actions，類似 methods，component 會 dispatch action
// action commit 給 mutations 資料
// mutations 改變 state 回傳
const actions = {
    async updateSearchHotelResult({commit}, hotelResult) {
        commit("updateHotelResult", hotelResult);
    }
}

// mutations，只能執行同步事件，全部用成大寫
const mutations = {
    // 更新飯店搜尋結果
    updateHotelResult: (state, hotelResult) => {
        state.find_query_result = hotelResult;
    }
}

export default {
    // namespaced: true, 重複用
    state,
    getters,
    actions,
    mutations
}