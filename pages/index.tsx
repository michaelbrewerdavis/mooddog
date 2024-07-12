import App from "../src/app";
import { Box } from "@mui/material";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>mood.dog</title>
        <link rel="icon" href="/mooddog.circle.png" />
      </Head>

      <main>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundImage: "url(/mooddog.circle.png)",
            backgroundRepeat: "no-repeat",
            backgroundPositionX: "100%",
            backgroundPositionY: "100%",
            opacity: 0.05,
          }}
        ></Box>
        <App />
      </main>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
