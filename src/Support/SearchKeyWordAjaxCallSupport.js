import axios from "axios";
import store from "../store/index";

export default async function SearchKeyWordAjaxCallSupport(search_key_words) {
  let find_query_result = [];
  await axios.get("fake_hotel_data.json").then((response) => {
    response.data.filter((item) => {
      if (item.City == search_key_words) {
        find_query_result.push(item);
      }
    });
  });

  store.dispatch("updateSearchHotelResult", find_query_result);
  // this.renderMap(this.find_query_result);
}
