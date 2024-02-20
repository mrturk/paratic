import axios from "axios";
import { SPOT_PARITELER, getApiUrl } from "./const";

export const getSpotData = () => {
  return axios.get(getApiUrl(SPOT_PARITELER));
};
