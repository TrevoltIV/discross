const admin = require('firebase-admin')



const serviceAccountKey = {
    type: "service_account",
    project_id: "discross-9de9a",
    private_key_id: "1968b1b5568fa12d995d839f8a1615c7a9be2383",
    private_key: process.env.DB_PRIVATE_KEY,
    client_email: "firebase-adminsdk-o8hxb@discross-9de9a.iam.gserviceaccount.com",
    client_id: "108677245329895662675",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-o8hxb%40discross-9de9a.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
}


if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccountKey),
        databaseURL: 'https://thetruthstudies.firebaseio.com'
    })
}
  
export const db = admin.firestore()