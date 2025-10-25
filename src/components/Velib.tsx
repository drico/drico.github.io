import { audricVelibData } from "@/helpers/velib/audric";
import { stephanieVelibData } from "@/helpers/velib/stephanie";
import { mockVelibData } from "@/helpers/velib/mock";
import { Box, Grid, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import {
  each,
  filter,
  first,
  groupBy,
  last,
  map,
  mapValues,
  range,
  size,
  sortBy,
  sum,
  sumBy,
  values,
} from "lodash";

const SUB_VELIB_PLUS = 4.3;
const SUB_VELIB_MAX = 9.3;

const getVelibrePrice = ({
  isElectric,
  minutes,
}: {
  minutes: number;
  isElectric: boolean;
}) => {
  if (minutes < 4) return 0;
  if (isElectric) {
    return 3 + Math.max(0, Math.ceil((minutes - 45) / 30) * 2);
  }
  return 1 + Math.max(0, Math.ceil((minutes - 30) / 30) * 1);
};

const getVelibPlusPrice = ({
  isElectric,
  minutes,
}: {
  minutes: number;
  isElectric: boolean;
}) => {
  if (minutes < 4) return 0;
  if (isElectric) {
    return 2 + Math.max(0, Math.ceil((minutes - 45) / 30) * 2);
  }
  return 0 + Math.max(0, Math.ceil((minutes - 30) / 30) * 1);
};

const getVelibMaxPrice = (
  {
    isElectric,
    minutes,
  }: {
    minutes: number;
    isElectric: boolean;
  },
  electricCount: number
) => {
  if (minutes < 4) return 0;
  if (isElectric) {
    return (
      (electricCount < 2 ? 0.5 : 2) +
      Math.max(0, Math.ceil((minutes - 45) / 30) * 2)
    );
  }
  return 0 + Math.max(0, Math.ceil((minutes - 60) / 30) * 1);
};

const allMonthStringsBetweenDates = (firstDate: string, lastDate: string) => {
  let month = Number(firstDate.split("-")[1]);
  let year = Number(firstDate.split("-")[0]);

  let endMonth = Number(lastDate.split("-")[1]);
  let endYear = Number(lastDate.split("-")[0]);

  const monthStrings: string[] = [];
  while (endYear !== year || endMonth !== month) {
    monthStrings.push(`${year}-${String(month).padStart(2, "0")}`);
    month += 1;
    if (month === 13) {
      year++;
      month = 1;
    }
  }

  // console.log({ month, year, endMonth, endYear, monthStrings });
  return monthStrings;
};

export const Velib = () => {
  // const rawList = audricVelibData.walletOperations;
  const rawList = stephanieVelibData.walletOperations;
  // const rawList = mockVelibData.walletOperations;

  const sanitizedList = map(rawList, (item) => {
    const minutes = Math.ceil(item.quantity / 60);
    const isElectric = item.parameter1 === "yes";
    return {
      year: item.startDate.split("-")[0],
      month: item.startDate.split("-")[0] + "-" + item.startDate.split("-")[1],
      date: item.startDate.split("T")[0],
      isElectric,
      minutes,
    };
  });

  const listByMonth = groupBy(sanitizedList, (e) => e.month);

  each(
    allMonthStringsBetweenDates(
      last(sanitizedList)!.date,
      first(sanitizedList)!.date
    ),
    (monthString) => {
      if (!listByMonth[monthString]) {
        listByMonth[monthString] = [];
      }
    }
  );

  // TODO : add month that have no data
  const statsByMonth = mapValues(listByMonth, (list, month) => {
    const statsByDay = map(
      groupBy(list, (e) => e.date),
      (dayEvents) => {
        let electricCount = 0;
        const dayStats = map(dayEvents, (item) => {
          const velibrePrice = getVelibrePrice(item);
          const velibPlusPrice = getVelibPlusPrice(item);
          const velibMaxPrice = getVelibMaxPrice(item, electricCount);
          if (item.isElectric) electricCount++;
          return { ...item, velibrePrice, velibPlusPrice, velibMaxPrice };
        });
        return {
          month,
          minutes: sumBy(dayStats, (e) => e.minutes),
          velibrePrice: sumBy(dayStats, (e) => e.velibrePrice),
          velibPlusPrice: sumBy(dayStats, (e) => e.velibPlusPrice),
          velibMaxPrice: sumBy(dayStats, (e) => e.velibMaxPrice),
        };
      }
    );

    return {
      year: month.split("-")[0],
      month,
      minutes: sumBy(statsByDay, (e) => e.minutes),
      velibrePrice: sumBy(statsByDay, (e) => e.velibrePrice),
      velibPlusPrice:
        sumBy(statsByDay, (e) => e.velibPlusPrice) + SUB_VELIB_PLUS,
      velibMaxPrice: sumBy(statsByDay, (e) => e.velibMaxPrice) + SUB_VELIB_MAX,
    };
  });

  const statsByYear = map(
    groupBy(statsByMonth, (e) => e.year),
    (monthStats, year) => {
      return {
        year,
        minutes: sumBy(monthStats, (e) => e.minutes),
        velibrePrice: sumBy(monthStats, (e) => e.velibrePrice),
        velibPlusPrice: sumBy(monthStats, (e) => e.velibPlusPrice),
        velibMaxPrice: sumBy(monthStats, (e) => e.velibMaxPrice),
        abonnementPlus: SUB_VELIB_PLUS * size(monthStats),
        abonnementMax: SUB_VELIB_MAX * size(monthStats),
      };
    }
  );

  const monthlyData = sortBy(values(statsByMonth), (e) => e.month);
  const yearlyData = sortBy(values(statsByYear), (e) => e.year);

  const priceFormatter = (abonnement: number) => (price: number | null) =>
    `${(price! + abonnement).toFixed(2)}€`;

  return (
    <Box sx={{ width: 1 }}>
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        Coût par mois
      </Typography>
      <BarChart
        xAxis={[{ id: "pricing", data: map(monthlyData, (e) => e.month) }]}
        series={[
          {
            data: map(monthlyData, (e) => e.velibrePrice),
            valueFormatter: priceFormatter(0),
            label: "velibre",
          },
          {
            data: map(monthlyData, (e) => SUB_VELIB_PLUS),
            valueFormatter: () => null,
            label: "abonnement plus",
            stack: "plus",
          },
          {
            data: map(monthlyData, (e) => e.velibPlusPrice - SUB_VELIB_PLUS),
            valueFormatter: priceFormatter(SUB_VELIB_PLUS),
            label: "velib plus",
            stack: "plus",
          },
          {
            data: map(monthlyData, (e) => SUB_VELIB_MAX),
            valueFormatter: () => null,
            label: "abonnement max",
            stack: "max",
          },
          {
            data: map(monthlyData, (e) => e.velibMaxPrice - SUB_VELIB_MAX),
            valueFormatter: priceFormatter(SUB_VELIB_MAX),
            label: "velib max",
            stack: "max",
          },
        ]}
        height={200}
      />
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        Coût par an
      </Typography>
      <BarChart
        xAxis={[{ id: "pricingYearly", data: map(yearlyData, (e) => e.year) }]}
        series={[
          {
            data: map(yearlyData, (e) => e.velibrePrice),
            valueFormatter: priceFormatter(0),
            label: "velibre",
          },

          {
            data: map(yearlyData, (e) => e.abonnementPlus),
            valueFormatter: () => null,
            label: "abonnement plus",
            stack: "plus",
          },
          {
            data: map(yearlyData, (e) => e.velibPlusPrice - e.abonnementPlus),
            valueFormatter: (a, b) =>
              priceFormatter(yearlyData[b.dataIndex].abonnementPlus)(a),
            label: "velib plus",
            stack: "plus",
          },

          {
            data: map(yearlyData, (e) => e.abonnementMax),
            valueFormatter: () => null,
            label: "abonnement max",
            stack: "max",
          },
          {
            data: map(yearlyData, (e) => e.velibMaxPrice - e.abonnementMax),
            valueFormatter: (a, b) =>
              priceFormatter(yearlyData[b.dataIndex].abonnementMax)(a),
            label: "velib max",
            stack: "max",
          },
        ]}
        height={200}
      />
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        Durée de vélib
      </Typography>
      <BarChart
        xAxis={[{ id: "usage", data: map(monthlyData, (e) => e.month) }]}
        series={[
          {
            data: map(monthlyData, (e) => e.minutes),
            valueFormatter: (minutes) => {
              if (!minutes) return "0m";
              const hours = Math.floor(minutes / 60);
              const rest = minutes % 60;
              if (hours) return `${hours}h${rest}m`;
              return `${rest}m`;
            },
          },
        ]}
        height={200}
      />
    </Box>
  );
};
