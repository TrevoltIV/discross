const admin = require('firebase-admin')



const serviceAccountKey = {
    type: "service_account",
    project_id: "discross-9de9a",
    private_key_id: "1968b1b5568fa12d995d839f8a1615c7a9be2383",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDg1AjA6zz1DAYC\nPU7yhmO8ldNWq9R3UnybBZt3Ln5Fg8u+3EBvwR5mY1Xza10F952YNUTfHZHQ8ggW\n8tu8F6ptkSuCPJ0XMoOn0TRc8Uxf8rPWqtWWWDXN+e2sWz+639wLuplz0xWWdxny\nW9ojJ/2YLsL1BGHetAoTRO+4xfQOthYbprbpC7WzB6WRbMAXqaersV3FG6bt3/h2\nDvzX64d1l6AkMn1uvZ/qHR3RIqIyTR/MKVHUb37m8d3rHNjMPSyFI1To6cGn3xbP\n9oWcRdqi6GA/NOzc0wQnLe77sXbIzm6r123M708qy5KOMIErVO66Wty7xEi0AYZD\nhoafAxnzAgMBAAECggEABP832DA74TP/zv1VchB7ypo6rnRDoaJ+TUryz9ODUCcD\n8hCeu50hzT0rkOBzzdXy271hwK+9XCG0/YWVgRKDLpijMrhtwv4HBqwHEbXCcJnj\nvPavdP4uG/Wp5Nwv7qBasxJvpkjGJw6SNg/FwzHe8grABiAVzy3wBDBsP457kSp/\nApfjsDMvt0eJB+vhPeLy4Wz8nmxspdV1iXYK+k8BUbC0T8faIpso/qj+gLMts11e\n6SohPTYkWVwsDYzGu998rYFRoGvTX0sZ+30eeU8aGgCST3WpME55/fQLbqY2kflR\nR2b5C7EIUBMA6zoH10Pw61rpGv/W6l0Y4GRykqF5EQKBgQD1EqARtjAvR5mcraXa\n3/kzRpB31uYGR/BrEfDka6L0CbmX/+/4Jg7ogGdT8uQtS+IHILUdsceI2yDJInI/\nUj0TaAm5HPb0ByUkIaQ6MYfIOJN9xnqHqhuEEr6Cs0du09ClKZm+THAQYYRd3kcw\nbK40nHdBOQaAN2OUbqEfiCHR2QKBgQDq2lQsMgkzPgquMR+WEJqP0Rk6QR8eZ+ln\n+FCigIh5bbDl/ubCA3Rm4UImggfDOZtPMwWMuX1Upyj0bJE9y7ilZmycTJ/rfBY0\nTvDUSZmVggKT8LOIUaw8IQM7lUevjl8/8cOQl+242DtTgjmNQbrn75dAELkohFkK\n+8kl3yieqwKBgE5rjlL8lICcjbgIDNlz7/8LZnEij+qUnIb2b7n4A2XJstzDphsm\nuoCFjgrb303rSUF0ouAEok/VprEV168Rdr+9+9aDQTanDqh4J2ADt2pHSFLn7w94\nTGO/x7x097esCci//hVZykZDniKXXPpO3JOzOaniQIVItBGsMNyxJ/lJAoGBALkm\nROPO0qf+SodHnQI+tsuY6o2dl33uJ/narx9du7oXezXnfl8IQDV3cyJOsvX7LXED\n5WUrOx6I5mXETcDtIfXryMZ0NkN9QTgd4AlMuPNAWu3s/m0DDokc8aKArtI9qOQN\nosMUs8pdVnAgo2S0pDiED7bnOEI0DMr2836S70AfAoGAaAsAI4IqS35EXdwcIj7G\nXykoIfNgtIoRy2ZTbRSv9xofRLO3X/yTqFd9GHJiD7tNLf81OJTerlXo2c2QGOgc\nUApB4+ulU93o0J1AxptEMnUW6NLNZInAKZFPKifh7sugsJNsQJeuAyNdEVXpbjUU\nB/D4Mxk2t5yE+iN6knlSsQU=\n-----END PRIVATE KEY-----\n",
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