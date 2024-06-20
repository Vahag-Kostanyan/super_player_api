export const currentDateInArmenia = () => {

  let currentDate = new Date();

  // Convert to Armenia Time Zone (UTC+4)
  let options = { timeZone: 'Asia/Yerevan', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  let armeniaDate = currentDate.toLocaleString('en-US', options);

  let date = new Date(armeniaDate);

  // Get the Unix timestamp in milliseconds
  let unixTimestamp = date.getTime();

  return unixTimestamp;
}