import { db } from '@/database/firebase.js'




export default async function handler(req, res) {
    const { type, auth_token, formData } = req.body

    if (type === 'getStatus') {
        // Let the client know if the user has filled out the form or not
        const userDataCollection = db.collection('user_data')
        const querySnapshot = await userDataCollection.where('auth_token', '==', auth_token).get()


        if (!querySnapshot.empty) {
            res.status(200).json({ formStatus: true })
        } else {
            res.status(200).json({ formStatus: false })
        }
    } else if (type === 'setForm') {
        const docRef = db.collection('user_data').doc(auth_token)

        docRef.set({ ...formData, auth_token: auth_token })
        res.status(200).json(true)
    } else if (type === 'setCompletion') {
        const usersCollection = db.collection('users')
        const querySnapshot = await usersCollection.where('auth_token', '==', auth_token).get()

        const doc = querySnapshot.docs[0].data()

        const updatedUser = {...doc, form_complete: true}

        const docRef = db.collection('users').doc(doc.email)
        docRef.set(updatedUser)
        .then(() => [
            res.status(200).json(true)
        ])
    }
}