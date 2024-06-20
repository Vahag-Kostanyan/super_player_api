import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

function init() {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        "type": process.env.FIREBASE_TYPE || null,
        "project_id": process.env.FIREBASE_PROJECT_ID || null,
        "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID || null,
        "private_key": process.env.FIREBASE_PRIVATE_KEY || null,
        "client_email": process.env.FIREBASE_CLIENT_EMAIL || null,
        "client_id": process.env.FIREBASE_CLIENT_ID || null,
        "auth_uri": process.env.FIREBASE_CLIENT_AUTH_URL || null,
        "token_uri": process.env.FIREBASE_CLIENT_TOKEN_URL || null,
        "auth_provider_x509_cert_url": process.env.FIREBASE_CLIENT_AUTH_PROVIDER_X509_CERT_URL || null,
        "client_x509_cert_url": process.env.FIREBASE_CLIENT_CLIENT_X509_CERT_URL || null,
        "universe_domain": process.env.FIREBASE_UNIVERSE_DOMAIN || null,
      })
    });

    return admin.firestore()
  } catch (error) {
    console.log(error, 'error');
  }
}

export default init();