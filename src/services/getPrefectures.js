import axios from "axios";
const url = "https://opendata.resas-portal.go.jp/api/v1/prefectures";

const getPrefectures = async () => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const response = await axios.get(`${url}`, {
    headers: { "X-API-KEY": API_KEY },
  });
  return response.data;
};

export default getPrefectures;
