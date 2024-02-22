import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import styles from '@/styles/pages/reset-password.module.css'



export default function ResetPassword() {


    return (
        <>
            <Head>
                <title>Reset Password - Discross</title>
                <meta name="description" content="Christian fellowship forum and friend groups" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <container className={styles.container}>
                <Header authStatus={false} />
                <main className={styles.main}>
                    <h2>Reset Password</h2>
                </main>
            </container>
        </>
    )
}