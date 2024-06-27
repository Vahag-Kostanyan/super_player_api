const sendSendNotification =  async (message) => {
  try{
      let url = 'http://localhost:5000/send_notification';
      const options = {
          method: 'POST', // HTTP method
          headers: {
            'Content-Type': 'application/json' // Specify the content type
          },
          body: JSON.stringify({message}) // Convert the data to a JSON string
        };
      await fetch(url, options);
      return true
  }catch(error) {
    console.log(error);
  }
}

module.exports = {sendSendNotification};