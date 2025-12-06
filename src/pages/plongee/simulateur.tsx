import { DivingGraph, Divings } from "@/divingSimulator/divingGraph";
import { DivingsForm, emptyDive } from "@/divingSimulator/DivingsForm";
import { Box } from "@mui/material";
import { useState } from "react";

const Simulator = () => {
  const [divings, setDivings] = useState<Divings>([emptyDive()]);

  return (
    <Box
      sx={{
        minWidth: "100vw",
        minHeight: "100vh",
        backgroundImage: "url(/background_dive.jpg)",
        p: 4,
      }}
    >
      <DivingsForm divings={divings} onChange={setDivings} />
      <Box sx={{ height: 30 }} />
      <DivingGraph divings={divings} />
    </Box>
  );
};

export default Simulator;
