const HamsterKombatLogsModel = require('../models/logs');

const sendHamsterKombatSuccessNotification =  async () => {
    try{
        let url = 'https://bot-manager-t9qe.onrender.com/send_hamster_kombat_notification';
        const options = {
            method: 'POST', // HTTP method
            headers: {
              'Content-Type': 'application/json' // Specify the content type
            },
            body: JSON.stringify({}) // Convert the data to a JSON string
          };
        await fetch(url, options);
        return true
    }catch(error) {
      HamsterKombatLogsModel.set_log('sendHamsterKombatSuccessNotification_error', error);
    }
}

module.exports = {sendHamsterKombatSuccessNotification};