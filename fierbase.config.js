import admin from "firebase-admin"
import key from "./configs/key.json"
  
function init() {
  try{
    admin.initializeApp({
      credential: admin.credential.cert(key)
    });

    return admin.firestore()
  }catch(error) {
    console.log(error, 'error');
  }
}

module.exports = init();