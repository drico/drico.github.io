import { Grid, IconButton, TextField } from "@mui/material";
import { DivingStep } from "./divingGraph";
import { useState } from "react";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";

type DivingStepFormProps = {
  step: DivingStep;
  onChange: (step: DivingStep) => void;
};

export const DivingStepForm = ({ step, onChange }: DivingStepFormProps) => {
  return (
    <Grid container size={12} spacing={2}>
      <Grid size={6}>
        <TextField
          value={step.profondeur}
          label="profondeur"
          fullWidth
          onChange={(e) => {
            onChange({
              profondeur: Number(e.target.value),
              duree: step.duree,
            });
          }}
        />
      </Grid>
      <Grid size={6}>
        <TextField
          value={step.duree}
          label="duree"
          fullWidth
          onChange={(e) => {
            onChange({
              profondeur: step.profondeur,
              duree: Number(e.target.value),
            });
          }}
        />
      </Grid>
    </Grid>
  );
};
