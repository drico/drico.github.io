import { DivingStepForm } from "./DivingStepForm";
import { isEmpty, map } from "lodash";
import { Diving, DivingStep, Step } from "./divingGraph";
import { Grid, IconButton } from "@mui/material";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

type DivingFormProps = {
  diving: Diving;
  onChange: (divings: Diving) => void;
};

export const emptyStep = (): DivingStep => ({ duree: 10, profondeur: 10 });

export const DivingForm = ({ diving, onChange }: DivingFormProps) => {
  const onAddStep = () => {
    const newSteps = [...diving.steps, emptyStep()];
    onChange({ date: diving.date, steps: newSteps });
  };
  const onRemoveStep = () => {
    const newSteps = [...diving.steps];
    newSteps.pop();
    if (isEmpty(newSteps)) return;
    onChange({ date: diving.date, steps: newSteps });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={2}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Basic date time picker"
              sx={{ width: 1 }}
              value={diving.date}
              onChange={(date) => {
                onChange({
                  date: new Date(date!.getDate()),
                  steps: diving.steps,
                });
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid container size={8} spacing={2}>
          {map(diving.steps, (step, i) => (
            <DivingStepForm
              key={i}
              step={step}
              onChange={(step) => {
                const newSteps = [...diving.steps];
                newSteps[i] = step;
                onChange({ date: diving.date, steps: newSteps });
              }}
            />
          ))}
        </Grid>
        <Grid size={2} sx={{ alignSelf: "flex-end" }}>
          <IconButton color="secondary" onClick={onAddStep}>
            <Add />
          </IconButton>
          {diving.steps.length > 1 && (
            <IconButton color="secondary" onClick={onRemoveStep}>
              <Remove />
            </IconButton>
          )}
        </Grid>
      </Grid>
    </>
  );
};
