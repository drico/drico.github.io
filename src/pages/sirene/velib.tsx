import { Box } from "@mui/material";
import { Velib } from "@/components/Velib";

export default function Home() {
  return (
    <>
      <Box component="main" sx={{ position: "relative", zIndex: 0 }}>
        <Box sx={{ display: "flex", zIndex: 1, opacity: 0.8 }}>
          <Velib />
        </Box>
      </Box>
    </>
  );
}
