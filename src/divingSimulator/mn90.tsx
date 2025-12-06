import { mn90Data } from "@/scripts/mn90Data";
import { sortBy, groupBy, keys, mapValues, first, filter } from "lodash";

export const mn90RowsByDureeByProfondeur = mapValues(
  groupBy(mn90Data, (row) => row.profondeur),
  (group) => {
    const value = mapValues(
      groupBy(group, (row) => row.duree),
      (x) => first(x)!
    );
    return { durees: sortBy(keys(value).map(Number)), value };
  }
);

export const profondeurs = sortBy(
  keys(mn90RowsByDureeByProfondeur).map(Number)
);

const nearestUp = (value: number, array: number[]) => {
  return first(filter(array, (x) => x >= value));
};

export const getMn90Row = ({
  profondeur,
  duree,
}: {
  profondeur: number;
  duree: number;
}) => {
  const p = nearestUp(profondeur, profondeurs);
  if (!p) return;
  const d = nearestUp(duree, mn90RowsByDureeByProfondeur[p].durees);
  if (!d) return;
  return mn90RowsByDureeByProfondeur[p].value[d];
};
