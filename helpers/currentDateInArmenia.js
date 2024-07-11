const currentDateInArmenia = () => {
  const currentDate = new Date();
  const utcTimestamp = currentDate.getTime(); 
  const armeniaOffset = 4 * 3600000; 
  const armeniaTimestamp = utcTimestamp + armeniaOffset;
  
  return armeniaTimestamp;
}

module.exports = {currentDateInArmenia};