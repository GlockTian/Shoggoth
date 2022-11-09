import type { AppProps } from 'next/app'
import '../css/style.css'
import '../css/form.css'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Shoggoth TTRPG App</title>
      </Head>

      <div className="top-bar">
        <div className="nav">
          <Link href="/">Home</Link>
          <Link href="/new">Add character</Link>
        </div>

        <img
          id="title"
          src="https://upload.wikimedia.org/wikipedia/commons/8/80/Shoggoth_by_Nottsuo.jpg"
          alt="character care logo"
          width={200}
          height={200}
        />
      </div>
      <div className="grid wrapper">
        <Component {...pageProps} />
      </div>
    </>
  )
}