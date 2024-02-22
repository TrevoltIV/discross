import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import styles from '@/styles/pages/groups/index.module.css'






export default function Groups() {
    const [authStatus, setAuthStatus] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [user, setUser] = useState(null)
    const [formStatus, setFormStatus] = useState(null)
    const [formData, setFormData] = useState({
        occupation: null,
        hobbies: null,
        age: null,
        length_of_belief: null,
        denomination: null,
        notable_beliefs: null,
        prophecy: null,
        history: null,
        location_based_matching: null,
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
            body: JSON.stringify({ type: 'verify', auth_token: token })
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

    function getFormStatus() {
        const token = localStorage.getItem('auth_token')

        if (token) {
            fetch('http://localhost:3000/api/qForm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ type: 'getStatus', auth_token: token })
            })
            .then(response => response.json())
            .then(data => {
                setFormStatus(data.formStatus)
            })
        }
    }

    useEffect(() => {
        verifyAuthStatus()
        getFormStatus()
    }, [])


    // Handle popup form input for recommendation algorithm
    function handleFormInput(e) {
        setFormData({...formData, [e.target.id]: e.target.value})
    }


    // Store popup form data in DB
    function handleFormSubmit() {
        const token = localStorage.getItem('auth_token')

        if (token) {
            fetch('http://localhost:3000/api/qForm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ type: 'setForm', auth_token: token, formData: formData })
            })
            .then(() => {
                setFormStatus(true)
                setUser({ ...user, form_complete: true })
            })
            .catch(() => {
                alert('Error: An unknown server API error has occurred.')
            })
        }
    }

    function handleFormSkip() {
        const token = localStorage.getItem('auth_token')
        setUser({...user, form_complete: true})

        if (token) {
            fetch('http://localhost:3000/api/qForm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ type: 'setCompletion', auth_token: token })
            })
            .then(() => {
                // After form is skipped
            })
            .catch((err) => {
                alert('Error: An unknown server API error occurred.')
            })
        }
    }



    if (loaded) {
        if (authStatus) {
            return (
                <>
                    <Head>
                        <title>Groups - Discross</title>
                    </Head>
                    <container className={styles.container}>
                        <Header reload={() => Math.random()} />
                        <main className={styles.main}>
                            {/* If form is not filled out yet, activate popup */}
                            {!user.form_complete && (
                                <popup className={styles.formPopupWrapper}>
                                    <div className={styles.formPopup}>
                                        <h4 className={styles.formTitle}>
                                            Tell us about yourself
                                        </h4>
                                        <p className={styles.formText}>
                                            To get you the most like-minded friends, we're going to need some information.<br />All fields are optional.
                                        </p>
                                        <input
                                            type="text"
                                            id="occupation"
                                            className={styles.formInput}
                                            onChange={(e) => handleFormInput(e)}
                                            placeholder="What is your current occupation?"
                                        />
                                        <input
                                            type="text"
                                            id="hobbies"
                                            className={styles.formInput}
                                            onChange={(e) => handleFormInput(e)}
                                            placeholder="What are your hobbies? (separate by commas)"
                                        />
                                        <input
                                            type="text"
                                            id="age"
                                            className={styles.formInput}
                                            onChange={(e) => handleFormInput(e)}
                                            placeholder="What is your age?"
                                        />
                                        <input
                                            type="text"
                                            id="length_of_belief"
                                            className={styles.formInput}
                                            onChange={(e) => handleFormInput(e)}
                                            placeholder="How long have you been a believer?"
                                        />
                                        <input
                                            type="text"
                                            id="denomination"
                                            className={styles.formInput}
                                            onChange={(e) => handleFormInput(e)}
                                            placeholder="What denomination do you reflect most?"
                                        />
                                        <input
                                            type="text"
                                            id="notable_beliefs"
                                            className={styles.formInput}
                                            onChange={(e) => handleFormInput(e)}
                                            placeholder="Any notable beliefs? (e.g. Pre-trib rapture)"
                                        />
                                        <input
                                            type="text"
                                            id="prophecy"
                                            className={styles.formInput}
                                            onChange={(e) => handleFormInput(e)}
                                            placeholder="Do you like studying prophecy?"
                                        />
                                        <input
                                            type="text"
                                            id="history"
                                            className={styles.formInput}
                                            onChange={(e) => handleFormInput(e)}
                                            placeholder="Do you like studying biblical history?"
                                        />
                                        <input
                                            type="text"
                                            id="location_based_matching"
                                            className={styles.formInput}
                                            onChange={(e) => handleFormInput(e)}
                                            placeholder="Do you want to enable location matching?"
                                        />
                                        <button className={styles.formBtn} onClick={() => handleFormSubmit()}>
                                            FIND A GROUP
                                        </button>
                                        <button className={styles.formSkip} onClick={handleFormSkip}>
                                            Skip
                                        </button>
                                    </div>
                                </popup>
                            )}
                            {/* Normal groups page */}
                            <banner className={styles.topBanner}>
                                <p className={styles.authBanner}>
                                    Logged in as: {user.username}
                                </p>
                            </banner>
                            <div className={styles.groupTitles}>
                                <p className={styles.groupTitle}>
                                    OFFICIAL GROUPS
                                </p>
                                <p className={styles.groupTitle}>
                                    RECOMMENDED FOR YOU
                                </p>
                                <p className={styles.groupTitle}>
                                    NEW GROUPS
                                </p>
                            </div>
                            <div className={user.form_complete ? styles.content : styles.contentDimmed}>
                                {/* Official Groups */}
                                <div className={styles.groupsContainer}>
                                    <div className={styles.groupBoxes}>
                                        <div className={styles.groupBox} onClick={() => router.push('/groups/general')}>
                                            <h3 className={styles.title}>
                                                GENERAL
                                            </h3>
                                            <p className={styles.text}>
                                                The official main group of Discross
                                            </p>
                                        </div>
                                        <div className={styles.groupBox} onClick={() => router.push('/groups/advancedstudy')}>
                                            <h3 className={styles.title}>
                                                ADVANCED BIBLE STUDY
                                            </h3>
                                            <p className={styles.text}>
                                                Bible study for knowledgeable believers
                                            </p>
                                        </div>
                                        <div className={styles.groupBox} onClick={() => router.push('/groups/beginnerstudy')}>
                                            <h3 className={styles.title}>
                                                BEGINNER BIBLE STUDY
                                            </h3>
                                            <p className={styles.text}>
                                                Bible study for newer believers
                                            </p>
                                        </div>
                                        <div className={styles.groupBox} onClick={() => router.push('/groups/gamers')}>
                                            <h3 className={styles.title}>
                                                GAMERS
                                            </h3>
                                            <p className={styles.text}>
                                                A group for anyone who likes videogames
                                            </p>
                                        </div>
                                    </div>
                                    <div className={styles.listingControl}>
                                        <div className={styles.controlBtn}>
                                            &lt;
                                        </div>
                                        <div className={styles.controlBtn}>
                                            &gt;
                                        </div>
                                    </div>
                                </div>
                                {/* Recommended For You */}
                                <div className={styles.groupsContainer}>
                                    <div className={styles.groupBoxes}>
                                        {!formStatus && formStatus !== null ? (
                                            <div className={styles.groupBox} onClick={() => setUser({...user, form_complete: false})}>
                                                <h3 className={styles.title}>
                                                    Tell us about yourself...
                                                </h3>
                                                <p className={styles.text}>
                                                    We need more information about you to recommend groups. Click to fill out the questionnaire
                                                </p>
                                            </div>
                                        ) : (
                                            <>
                                                {/* PUT ACTUAL RESULTS HERE */}
                                            </>
                                        )}
                                    </div>
                                    <div className={styles.listingControl}>
                                        <div className={styles.controlBtn}>
                                            &lt;
                                        </div>
                                        <div className={styles.controlBtn}>
                                            &gt;
                                        </div>
                                    </div>
                                </div>
                                {/* New Groups */}
                                <div className={styles.groupsContainer}>
                                    <div className={styles.groupBoxes}>
                                        
                                    </div>
                                    <div className={styles.listingControl}>
                                        <div className={styles.controlBtn}>
                                            &lt;
                                        </div>
                                        <div className={styles.controlBtn}>
                                            &gt;
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </container>
                </>
            )
        } else {
            // Not logged in
            return (
                <>
                    <Head>
                        <title>Groups - Discross</title>
                    </Head>
                    <container className={styles.container}>
                        <Header reload={() => Math.random()} />
                        <main className={styles.main}>
                            You need to login to access groups
                        </main>
                    </container>
                </>
            )
        }
    }
}