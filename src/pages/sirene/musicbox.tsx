/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import LeftBanner from "@/components/LeftBanner";
import CV from "@/components/CV";
import { Box, Button, Grid } from "@mui/material";
import { useCallback, useState } from "react";

export default function Home() {
  const [soungCount, setSoundCount] = useState(0);

  const playSound = useCallback((fileName: string) => {
    setSoundCount((old) => old + 1);
    const audio = new Audio(fileName);
    audio.play();
  }, []);

  return (
    <>
      <Head>
        <title>💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧💧</title>
        <meta name="description" content="machine à bruit" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/myFace.jpg" />
      </Head>
      <Box component="main" sx={{ position: "relative", zIndex: 0 }}>
        <Box
          component="img"
          src="/tortue.jpg"
          alt="background"
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: 1,
            height: 1,
            objectFit: "fill", // étire l'image pour remplir tout
            zIndex: -1, // passe derrière tout
            // opacity: 0.5,
          }}
        />
        <Box sx={{ display: "flex", zIndex: 1, opacity: 0.8 }}>
          <Grid container spacing={3} sx={{ m: 10 }}>
            <Grid size={{ xs: 3 }}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={() => playSound(`/goutte${soungCount % 11}.mp3`)}
              >
                💧💧💧
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
