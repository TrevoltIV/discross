import styles from '@/styles/pages/groups/group.module.css'
import Header from '@/components/Header'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'





export default function Group() {
    const [authStatus, setAuthStatus] = useState(false)
    const [user, setUser] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [groupData, setGroupData] = useState({
        title: null
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


    function getGroupData(id) {
        const token = localStorage.getItem('auth_token')

        if (token) {
            fetch('http://localhost:3000/api/groups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({type: 'getData', auth_token: token, group_id: id})
            })
            .then(response => response.json())
            .then(data => {
                if (!data.error) {
                    setGroupData(data.groupData)
                } else if (data.error === 'Group not found') {
                    setGroupData('404')
                } else if (data.error === 'Auth token invalid') {
                    router.push('login')
                }
            })
        }
    }


    useEffect(() => {
        // Get URL path manually because too lazy to implement cookies for SSR
        // Bite me
        const currentPath = window.location.pathname.split('/')
        const id = currentPath[currentPath.length - 1]

        verifyAuthStatus()
        getGroupData(id)
    }, [])


    if (loaded) {
        if (authStatus) {
            if (groupData === '404') {
                // If group is not found in DB
                return (
                    <>
                        <container className={styles.container}>
                            <Header reload={() => Math.random()} />
                            <main className={styles.main}>
                                404 - Page not found
                            </main>
                        </container>
                    </>
                )
            } else if (groupData.title !== null) {
                return (
                    <>
                        <container className={styles.container}>
                            <Header reload={() => Math.random()} />
                            <main className={styles.main}>
                                <h3>{groupData.title[0].toUpperCase() + groupData.title.slice(1, groupData.title.length)}</h3>
                                <Link href={groupData.discord_link} target="_blank">
                                    Click here to join the Discord group
                                </Link>
                            </main>
                        </container>
                    </>
                )
            }
        } else {
            router.push('/login')
        }
    }
}