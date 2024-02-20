export const API_URL = "https://img.paratic.com";

export const SPOT_PARITELER = "/data/spot-pariteler-data.json";

export const getApiUrl = (api) => {
  return `${API_URL}${api}`;
};
