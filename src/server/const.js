export const API_URL = "https://img.paratic.com";
export const USER_FAV = "USER_FAV";
export const SPOT_PARITELER = "/data/spot-pariteler-data.json";

export const getApiUrl = (api) => {
  return `${API_URL}${api}`;
};
