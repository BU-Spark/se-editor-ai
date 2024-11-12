import LoginPage from "./LoginPage";
import Head from 'next/head';

// Inside your component or page


function App() {
  return (

    <main>
      <Head>
       <link rel="preconnect" href="https://fonts.googleapis.com" />
       <link rel="preconnect" href="https://fonts.gstatic.com" />
       <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap"
        rel="stylesheet"
       />
      </Head>
      <LoginPage />
    </main>

  );
}

export default App;