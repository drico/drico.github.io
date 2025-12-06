import { compact, each, first, last, map } from "lodash";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getMn90Row } from "./mn90";
import { addMinutes, format } from "date-fns";
import { Mn90Row } from "@/scripts/generate-mn90";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const padding = 50;
const profondeurSpeed = 16; // on monte et descend à 16m / minute

export type StepType = "debut" | "fin" | "balade";

export type DivingStep = { duree: number; profondeur: number };

export type Step =
  | { date: Date; type: "debut" }
  | { type: "fin" }
  | { duree: number; profondeur: number; type: "balade" };

export type Steps = Step[];

export type Diving = {
  date: Date;
  steps: DivingStep[];
};

export type Divings = Diving[];

type DivingGraph = {
  steps: Steps;
};

const getDataFromSteps = (steps: Steps) => {
  let data: { date: Date; profondeur: number }[] = [];
  let currentDate = new Date();
  let currentProfondeur = 0;
  let maxProfondeur = 0;
  let currentDuree = 0;
  let mn90Rows: Mn90Row[] = [];
  each(steps, (step) => {
    switch (step.type) {
      case "debut": {
        currentDate = step.date;
        currentProfondeur = 0;
        data.push({ date: currentDate, profondeur: currentProfondeur });
        break;
      }
      case "balade": {
        const deltaProfondeur = step.profondeur - currentProfondeur;
        const transitionDuree = Math.abs(deltaProfondeur / profondeurSpeed);

        currentProfondeur = step.profondeur;
        maxProfondeur = Math.max(maxProfondeur, currentProfondeur);

        currentDuree = currentDuree + transitionDuree;
        currentDate = addMinutes(currentDate, transitionDuree);
        data.push({ date: currentDate, profondeur: currentProfondeur });

        currentDuree = currentDuree + step.duree - transitionDuree;
        currentDate = addMinutes(currentDate, step.duree - transitionDuree);
        data.push({ date: currentDate, profondeur: currentProfondeur });
        break;
      }
      case "fin": {
        console.log({ duree: currentDuree, profondeur: currentProfondeur });
        const mn90Row = getMn90Row({
          duree: currentDuree,
          profondeur: currentProfondeur,
        });
        if (!mn90Row) {
          // C'est un problème, y'a le danger !!!
          return data;
        }
        mn90Rows.push(mn90Row);

        const paliers = compact(
          [15, 12, 9, 6, 3].map((p) => {
            const d = mn90Row[`p${p}` as "p3"];
            return d ? { p, d } : null;
          })
        );

        each(paliers, ({ p, d }) => {
          const deltaProfondeur = p - currentProfondeur;
          const transitionDuree = Math.abs(deltaProfondeur / profondeurSpeed);

          currentProfondeur = p;
          maxProfondeur = Math.max(maxProfondeur, currentProfondeur);

          currentDuree = currentDuree + transitionDuree;
          currentDate = addMinutes(currentDate, transitionDuree);
          data.push({ date: currentDate, profondeur: currentProfondeur });

          currentDuree = currentDuree + d;
          currentDate = addMinutes(currentDate, d);
          data.push({ date: currentDate, profondeur: currentProfondeur });
        });

        const transitionDuree = Math.abs(currentProfondeur / profondeurSpeed);
        currentProfondeur = 0;
        currentDuree = currentDuree + transitionDuree;
        currentDate = addMinutes(currentDate, transitionDuree);
        data.push({ date: currentDate, profondeur: currentProfondeur });
        break;
      }
    }
  });
  return { data, mn90Rows };
};

const divingToSteps = (divings: Divings) => {
  const steps: Steps = [];
  each(divings, (diving) => {
    steps.push({ date: diving.date, type: "debut" });
    each(diving.steps, (step) => {
      steps.push({ ...step, type: "balade" });
    });
    steps.push({ type: "fin" });
  });
  return steps;
};

export const DivingGraph = ({ divings }: { divings: Divings }) => {
  const steps = divingToSteps(divings);

  const { data, mn90Rows } = getDataFromSteps(steps);

  return (
    <>
      <ResponsiveContainer width="95%" height={400}>
        <LineChart
          responsive
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="black" />
          <XAxis
            dataKey="date"
            type="number"
            scale="time"
            domain={[first(data)!.date.getTime(), last(data)!.date.getTime()]}
            tickFormatter={(date: Date) => format(date, "HH:mm")}
            padding={{ left: padding, right: padding }}
            tick={{ fill: "black" }}
            tickLine={{ stroke: "black" }}
            axisLine={{ stroke: "black" }}
            tickCount={10}
          />
          <YAxis
            reversed
            padding={{ top: padding, bottom: padding }}
            tick={{ fill: "black" }}
            tickLine={{ stroke: "black" }}
            axisLine={{ stroke: "black" }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="linear"
            dataKey="profondeur"
            stroke="#0d068aff"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
      Lignes MN90 utilisées :
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Profondeur</TableCell>
            <TableCell>Durée</TableCell>
            <TableCell>Paliers :</TableCell>
            <TableCell>15m</TableCell>
            <TableCell>12m</TableCell>
            <TableCell>9m</TableCell>
            <TableCell>6m</TableCell>
            <TableCell>3m</TableCell>
            <TableCell>GPS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {map(mn90Rows, (mn90Row, i) => {
            return (
              <TableRow key={i}>
                <TableCell>{mn90Row.profondeur}</TableCell>
                <TableCell>{mn90Row.duree}</TableCell>
                <TableCell></TableCell>
                <TableCell>{mn90Row.p15}</TableCell>
                <TableCell>{mn90Row.p12}</TableCell>
                <TableCell>{mn90Row.p9}</TableCell>
                <TableCell>{mn90Row.p6}</TableCell>
                <TableCell>{mn90Row.p3}</TableCell>
                <TableCell>{mn90Row.gps}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};
