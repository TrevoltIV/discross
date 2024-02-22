import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import styles from '@/styles/pages/index.module.css'





export default function Home() {
  const [authStatus, setAuthStatus] = useState(false)
  const [user, setUser] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState({
    form: null,
    message: null
  })
  const [formData, setFormData] = useState({
    email: null,
    password: null,
    username: null,
  })

  const router = useRouter()

  function verifyAuthStatus() {
    const token = localStorage.getItem('auth_token')

    if (token) {
      fetch('http://localhost:3000/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({type: 'verify', auth_token: token})
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setAuthStatus(true)
          setUser(data.user)
          setLoaded(true)
        } else {
          setAuthStatus(false)
          setUser(null)
          setLoaded(true)
        }
      })
    } else {
      setAuthStatus(false)
      setUser(null)
      setLoaded(true)
    }
  }

  useEffect(() => {
    verifyAuthStatus()
  }, [])

  

  function handleInput(e) {
    if (e.target.id === 'email' || e.target.id === 'l-email') {
      setFormData({...formData, email: e.target.value})
    } else if (e.target.id === 'password' || e.target.id === 'l-password') {
      setFormData({...formData, password: e.target.value})
    } else if (e.target.id === 'c-password') {
      setFormData({...formData, c_password: e.target.value})
    } else if (e.target.id === 'username') {
      setFormData({...formData, username: e.target.value})
    }
  }

  function handleSubmit(type) {
    if (type === 'login') {
      fetch('http://localhost:3000/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...formData, type: 'login'})
      })
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          localStorage.setItem('auth_token', data.user.auth_token)
          setAuthStatus(true)
          setUser(data.user)
        } else {
          setError({
            form: 'login',
            message: data.error
          })
        }
      })
    } else if (type === 'signup') {
      fetch('http://localhost:3000/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...formData, type: 'signup'})
      })
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          localStorage.setItem('auth_token', data.user.auth_token)
          setAuthStatus(true)
          setUser(data.user)
        } else {
          setError({
            form: 'signup',
            message: data.error
          })
        }
      })
    }
  }

  if (loaded) {
    return (
      <>
        <Head>
          <title>Home - Discross</title>
          <meta name="description" content="Christian fellowship forum and friend groups" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <container className={styles.container}>
          <Header reload={() => Math.random()} />
          <main className={styles.main}>
            <cross className={styles.crossWrapper}>
              <div className={styles.crossX}></div>
              <div className={styles.crossY}></div>
            </cross>
            <border className={styles.crossBorder}>
              <div className={styles.borderX}></div>
            </border>
            <border className={styles.crossBorder}>
              <div className={styles.borderY}></div>
            </border>
            <content className={styles.content}>
              <top className={styles.contentTop}>
                <div className={styles.groups}>
                  <h2 className={styles.title}>
                    Find fellowship
                  </h2>
                  <p className={styles.desc}>
                    Easily connect with like-minded believers
                  </p>
                  <Link href="/groups" className={styles.link}>
                    Socialize
                  </Link>
                </div>
                <div className={styles.forums}>
                  <h2 className={styles.title}>
                    Browse forum
                  </h2>
                  <p className={styles.desc}>
                    Talk about anything
                  </p>
                  <Link href="/forum" className={styles.link}>
                    Browse
                  </Link>
                </div>
              </top>
              <bottom className={styles.contentBottom}>
                {!authStatus ? (
                  <>
                    <div className={styles.bottomBox}>
                      <h2 className={styles.title2}>
                        Login
                      </h2>
                      <input
                        type="text"
                        className={styles.input}
                        id="l-email"
                        placeholder="*Email Address"
                        onChange={(e) => handleInput(e)}
                      />
                      <input
                        type="password"
                        className={styles.input}
                        id="l-password"
                        placeholder="*Password"
                        onChange={(e) => handleInput(e)}
                      />
                      <p className={styles.desc}>
                        Forgot password? <Link href="/reset-password">Click here</Link>
                      </p>
                      {error.message !== null && error.form === 'login' && (
                        <p className={styles.error}>
                          {error.message}
                        </p>
                      )}
                      <button className={styles.button} onClick={() => handleSubmit("login")}>
                        Login
                      </button>
                    </div>
                    <div className={styles.bottomBox}>
                      <h2 className={styles.title2}>
                        Signup
                      </h2>
                      <input
                        type="text"
                        className={styles.input}
                        id="email"
                        placeholder="*Email Address"
                        onChange={(e) => handleInput(e)}
                      />
                      <input
                        type="text"
                        className={styles.input}
                        id="username"
                        placeholder="*Username"
                        onChange={(e) => handleInput(e)}
                      />
                      <input
                        type="password"
                        className={styles.input}
                        id="password"
                        placeholder="*Password"
                        onChange={(e) => handleInput(e)}
                      />
                      <input
                        type="password"
                        className={styles.input}
                        id="c-password"
                        placeholder="*Confirm Password"
                        onChange={(e) => handleInput(e)}
                      />
                      {error.message !== null && error.form === 'signup' && (
                        <p className={styles.error}>
                          {error.message}
                        </p>
                      )}
                      <button className={styles.button} onClick={() => handleSubmit("signup")}>
                        Signup
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.bottomBox}>
                      <h2 className={styles.title2}>
                        Official Groups
                      </h2>
                      <div className={styles.clickBoxWrapper}>
                        <div className={styles.groupBox} onClick={() => router.push('groups/general')}>
                          <h2 className={styles.groupTitle}>
                            GENERAL
                          </h2>
                          <p className={styles.groupText}>
                            The official main group of Discross
                          </p>
                        </div>
                        <div className={styles.groupBox} onClick={() => router.push('groups/advancedstudy')}>
                          <h2 className={styles.groupTitle}>
                            ADVANCED BIBLE STUDY
                          </h2>
                          <p className={styles.groupText}>
                            Bible study for knowledgeable believers
                          </p>
                        </div>
                        <div className={styles.groupBox} onClick={() => router.push('groups/beginnerstudy')}>
                          <h2 className={styles.groupTitle}>
                            BEGINNER BIBLE STUDY
                          </h2>
                          <p className={styles.groupText}>
                            Bible study for newer believers
                          </p>
                        </div>
                        <div className={styles.groupBox} onClick={() => router.push('groups/gamers')}>
                          <h2 className={styles.groupTitle}>
                            GAMERS
                          </h2>
                          <p className={styles.groupText}>
                            A group for anyone who likes videogames
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className={styles.bottomBox}>
                      <h2 className={styles.title2}>
                        Hot Posts
                      </h2>
                      <div className={styles.clickBoxWrapper}>
                        <div className={styles.forumBox}>
                          <p className={styles.noPosts}>
                            Forum currently unavailable
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </bottom>
            </content>
          </main>
        </container>
      </>
    )
  } else {
    return (
      <>
        <Head>
          <title>Home - Discross</title>
          <meta name="description" content="Christian fellowship forum and friend groups" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <container className={styles.container}>
          <Header authStatus={authStatus} />
          <main className={styles.main}>
            <cross className={styles.crossWrapper}>
              <div className={styles.crossX}></div>
              <div className={styles.crossY}></div>
            </cross>
            <border className={styles.crossBorder}>
              <div className={styles.borderX}></div>
            </border>
            <border className={styles.crossBorder}>
              <div className={styles.borderY}></div>
            </border>
          </main>
        </container>
      </>
    )
  }
}