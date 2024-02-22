import Head from 'next/head'
import Link from 'next/link'
import Header from '@/components/Header'
import styles from '@/styles/pages/forum/index.module.css'






export default function Groups() {
    return (
        <>
            <Head>
                <title>Forum - Discross</title>
            </Head>
            <container className={styles.container}>
                <Header />
                <main className={styles.main}>
                    <error className={styles.errorWrapper}>
                        <p className={styles.error}>
                            Sorry, the forum is still in development. Join the official group <Link href="/groups/general">here</Link> to keep updated
                        </p>
                        <Link href="/" className={styles.btn}>
                            Back to Home
                        </Link>
                    </error>
                </main>
            </container>
        </>
    )
}