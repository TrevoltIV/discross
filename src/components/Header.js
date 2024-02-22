import Link from 'next/link'
import { useState, useEffect } from 'react'
import styles from '@/styles/components/Header.module.css'








export default function Header({ reload }) {
  const [menu, setMenu] = useState(false)
  const [authStatus, setAuthStatus] = useState(false)
  const [user, setUser] = useState(null)
  const [loaded, setLoaded] = useState(false)



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
  }, [reload])


  if (loaded) {
    return (
      <header className={styles.header}>
        <authbox className={styles.authBox}>
          {!authStatus && (
            <>
              <Link href="/login" className={styles.authLink}>
                Login
              </Link>
              <Link href="/signup" className={styles.authLink}>
                Signup
              </Link>
            </>
          )}
        </authbox>
        <logo className={styles.logoWrapper}>
          <h1 className={styles.logo}>
            DISCROSS
          </h1>
        </logo>
        <menubtn className={styles.menuBtnWrapper}>
          <div className={styles.menuBtn} onClick={() => setMenu(!menu)}>
            <div className={styles.menuBtnBar}></div>
            <div className={styles.menuBtnBar}></div>
            <div className={styles.menuBtnBar}></div>
          </div>
        </menubtn>
      </header>
    )
  }
}