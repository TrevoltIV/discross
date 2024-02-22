import { db } from '@/database/firebase.js'



export default async function handler(req, res) {
    const { type, group_id, auth_token } = req.body

    if (type === 'getData') {
        const usersCollection = db.collection('users')
        const usersQuery = await usersCollection.where('auth_token', '==', auth_token).get()

        if (!usersQuery.empty) {
            const groupsCollection = db.collection('groups')
            const groupsQuery = await groupsCollection.where('id', '==', group_id.toLowerCase()).get()

            if (!groupsQuery.empty) {
                res.status(200).json({groupData: groupsQuery.docs[0].data()})
            } else {
                res.status(200).json({error: 'Group not found'})
            }
        } else {
            res.status(200).json({error: 'Auth token invalid'})
        }
    }
}