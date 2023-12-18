export const combineDateAndTime = (date: Date, time: number) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Jan is 0, dec is 11
  const day = date.getDate();

  const timeString = time + ":00" + ":00";

  const dateString = "" + year + "/" + month + "/" + day;

  const combined = new Date(dateString + " " + timeString);

  return combined;
};
