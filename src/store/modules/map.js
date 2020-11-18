const state = {
  find_query_result: [],
};

const getters = {
  // 更新 find_query_result 的資料處理
  changePositionType(state) {
    let modifyPositionData = state.find_query_result.map((item) => {
      item.Position = {
        lat: Number(item.Lat),
        lng: Number(item.Lng),
      };
      return item;
    });
    return modifyPositionData;
  },
};

const actions = {
  async updateSearchHotelResult({ commit }, hotelResult) {
    commit("UPDATESEARCHHOTELRESULT", hotelResult);
  },
};

const mutations = {
  // 更新飯店搜尋結果
  UPDATESEARCHHOTELRESULT: (state, hotelResult) => {
    state.find_query_result = hotelResult;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
