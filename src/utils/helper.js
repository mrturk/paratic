export const convertUnixTime = (time) => {
  let clock = new Date(time).toLocaleTimeString("tr-TR");
  return clock;
};
