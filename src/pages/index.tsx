import Head from 'next/head'

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <Head>
        <title>Conexão ECI</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <h1>Hello World</h1>
    </main>
  )
}
