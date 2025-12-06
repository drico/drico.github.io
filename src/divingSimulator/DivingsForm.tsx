import { isEmpty, map } from "lodash";
import { DivingForm, emptyStep } from "./DivingForm";
import { Diving, Divings } from "./divingGraph";
import { Grid, IconButton, Paper } from "@mui/material";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";

type DivingsFormProps = {
  divings: Divings;
  onChange: (divings: Divings) => void;
};

export const emptyDive = (): Diving => ({
  date: new Date(),
  steps: [emptyStep()],
});

export const DivingsForm = ({ divings, onChange }: DivingsFormProps) => {
  const onAddDiving = () => {
    const newDivings = [...divings, emptyDive()];
    onChange(newDivings);
  };
  const onRemoveDiving = () => {
    const newDivings = [...divings];
    newDivings.pop();
    if (isEmpty(newDivings)) return;
    onChange(newDivings);
  };
  return (
    <>
      <Grid container spacing={2}>
        {map(divings, (diving, i) => (
          <Grid size={12} key={i}>
            <DivingForm
              key={i}
              diving={diving}
              onChange={(diving) => {
                const newDivings = [...divings];
                newDivings[i] = diving;
                onChange(newDivings);
              }}
            />
          </Grid>
        ))}
      </Grid>
      Plongées :
      <IconButton color="secondary" onClick={onAddDiving}>
        <Add />
      </IconButton>
      {divings.length > 1 && (
        <IconButton color="secondary" onClick={onRemoveDiving}>
          <Remove />
        </IconButton>
      )}
    </>
  );
};
