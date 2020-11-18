import axios from "axios";

export default async function AutoCompleteAjaxCallSupport(keyword) {
  const cors = "https://cors-anywhere.herokuapp.com/";
  let api =
    cors +
    "http://www.tripresso.com/hotel/search/ajaxKeywordCT?term=" +
    keyword;
  let auto_complete_result_list = [];
  await axios.get(api).then((response) => {
    auto_complete_result_list = response.data;
  });

  return auto_complete_result_list;
}
