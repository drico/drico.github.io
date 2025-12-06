import { parse } from "csv-parse/sync";
import { readFileSync, writeFileSync } from "fs";
import { each, filter, padEnd, split } from "lodash";

const csvPath = __dirname + "/mn90.csv";

export type Mn90Row = {
  profondeur: number;
  duree: number;
  dureeHuman: string;
  p15?: number;
  p12?: number;
  p9?: number;
  p6?: number;
  p3?: number;
  dtr: number;
  gps: string;
};

const csvData = filter(
  parse<Mn90Row>(readFileSync(csvPath).toString(), {
    delimiter: ";",
    columns: true,
    cast: function (value, context) {
      if (context.header) return value;
      if (!value) return undefined;
      if (context.column === "duree") {
        const [a, b] = split(value, "h");
        if (a && b) {
          return Number(a) * 60 + Number(b);
        } else {
          return Number(a || b);
        }
      }
      if (context.column === "gps") {
        return value;
      }
      return Number(value);
    },
  }),
  (row) => !!row.profondeur
);

// add human readable duration
each(
  csvData,
  (row) =>
    (row.dureeHuman = `${Math.floor(row.duree / 60)}h${padEnd(
      String(row.duree % 60),
      2,
      "0"
    )}`)
);

console.log(csvData);

writeFileSync(
  __dirname + "/mn90Data.ts",
  'import { Mn90Row } from "./generate-mn90";\nexport const mn90Data : Mn90Row[] = ' + JSON.stringify(csvData, null, 4)
);
