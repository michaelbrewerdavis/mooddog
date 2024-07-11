import { Box, Button, IconButton, Typography } from '@mui/material';

import App from '../src/app'
import Head from 'next/head';
import React from 'react'
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/mooddog.circle.png" />
      </Head>

      <main>
        <Box sx={{
          position: "absolute", top: 0, left: 0, bottom: 0, right: 0, backgroundImage: "url(/mooddog.circle.png)",
          backgroundRepeat: "no-repeat",
          backgroundPositionX: "100%",
          backgroundPositionY: "100%",
          opacity: 0.05

        }}></Box>
        <App />
      </main>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
