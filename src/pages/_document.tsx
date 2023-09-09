import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#000" />

        {/* Primary Meta Tags */}
        <meta name="title" content="Conexão ECI, Areial PB" />
        <meta name="description" content="Uma plataforma para conectar alunos e professores!" />

        {/* Open Graph | Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://conexao-eci.vercel.app/" />
        <meta property="og:title" content="Conexão ECI, Areial PB" />
        <meta property="og:description" content="Uma plataforma para conectar alunos e professores!" />
        <meta property="og:image" content="https://curiozzzo.com/wp-content/uploads/2016/08/post-frases-tipicas-colegio-escola-mao-levantada-sala-aula-thumb-1-370x250.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://conexao-eci.vercel.app/" />
        <meta property="twitter:title" content="Conexão ECI, Areial PB" />
        <meta property="twitter:description" content="Uma plataforma para conectar alunos e professores!" />
        <meta property="twitter:image" content="https://curiozzzo.com/wp-content/uploads/2016/08/post-frases-tipicas-colegio-escola-mao-levantada-sala-aula-thumb-1-370x250.png" />

        {/* Meta Keywords */}
        <meta name="keywords" content="eci, escola cidada integral, eci inferno, areial, eci areial, conexao eci, professores eci, alunos eci, professores eci areial, alunos eci areial, conexao eci areial" />

        {/* Google Font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
