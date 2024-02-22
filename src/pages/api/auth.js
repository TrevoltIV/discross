import { db } from '@/database/firebase.js'
const crypto = require('crypto')

export default async function handler(req, res) {
  const { email, password, c_password, username, type, auth_token } = req.body

  if (type === 'login') {
    // Log user in and return auth token from database
    const usersCollection = db.collection('users')
    const querySnapshot = await usersCollection.where('email', '==', email).get()

    if (!querySnapshot.empty) {
      const user = querySnapshot.docs[0].data()

      const salt = 'discross_hashing_salt_0x1f7aJhN9xH98AZxk8Fs'
      const password_hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex')

      if (user.password === password_hash) {
        res.status(200).json({ user: {...user, auth_token: user.auth_token } })
      } else {
        res.status(200).json({ error: 'Incorrect password' })
      }
    } else {
      res.status(200).json({ error: 'Email address not found' })
    }


    res.status(200).json({ error: 'An unknown error occurred' })
  } else if (type === 'signup') {
    // Create user account
    const usersCollection = db.collection('users')
    const querySnapshot = await usersCollection.where('email', '==', email).get()

    if (!querySnapshot.empty) {
      res.status(200).json({ error: 'Email is already registered' })
    } else {
      if (password === c_password) {
        // Confirm username is not registered
        const querySnapshot2 = await db.collection('users').where('username', '==', username).get()

        if (querySnapshot2.empty) {
          // Generate auth token and register user
          const randomBuffer = crypto.randomBytes(32)
          const new_auth_token = randomBuffer.toString('hex')

          const salt = 'discross_hashing_salt_0x1f7aJhN9xH98AZxk8Fs' // TODO: Create dynamic salt generator
          const password_hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex')
          
          await db.collection('users').doc(email).set({
            email: email,
            password: password_hash,
            username: username,
            auth_token: new_auth_token,
          })
          .then(() => {
            res.status(200).json({ user: {email: email, username: username, auth_token: new_auth_token } })
          })
        } else {
          res.status(200).json({ error: 'Username is already taken' })
        }
      } else {
        res.status(200).json({ error: 'Passwords do not match' })
      }
    }
  } else if (type === 'verify') {
    // Verify a user's auth token
    const usersCollection = db.collection('users')
    const querySnapshot = await usersCollection.where('auth_token', '==', auth_token).get()

    if (!querySnapshot.empty) {
      const user = querySnapshot.docs[0].data()

      res.status(200).json({ success: true, user: user })
    } else {
      res.status(200).json({ success: false })
    }
  }

  res.status(200).json({error: 'No type defined'})
}