import { useState } from "react";
import { getHours, endOfDay, startOfDay } from "date-fns";

import { Typography } from "@mui/material";

const Heure = () => {
  const [now, setNow] = useState(new Date());

  setTimeout(() => {
    setNow(new Date());
  }, 1000);

  const isMorning = getHours(now) > 12;

  const goDate = isMorning ? endOfDay(now) : startOfDay(now);
  const diff = (goDate.getTime() - now.getTime()) / 1000;

  const hours = Math.abs(Math.floor(diff / 60 / 60));
  const minutes = Math.abs(Math.floor((diff / 60) % 60));

  let diffString = (hours ? `${hours} heures et ` : "") + `${minutes} minutes`;

  return (
    <div className="bg-white min-h-[100vh] relative flex flex-col justify-center">
      <div className="flex flex-col gap-4">
        <Typography variant="h4" className="text-center">
          {"Est-ce que c'est bientôt l'heure de partir ?"}
        </Typography>

        <Typography variant="body1" className="text-center">
          {getText(hours, minutes, diff)}
        </Typography>

        <Typography variant="body2" className="text-center">
          {(diff > 0 ? "Tu pourras partir dans " : "Tu devrais être partie depuis ") +
            diffString}
        </Typography>
      </div>
    </div>
  );
};

const getText = (hours: number, minutes: number, diff: number) => {
  if (diff > 0) {
    if (hours > 1) return "Non Chilou, c'est pas du tout l'heure de partir";
    if (minutes > 30) return "Non Chilou, mais ça se rapproche";
    if (minutes > 10) return "C'est presque l'heure Chilou !!!";
  } else {
    if (hours > 1)
      return "Oui, et ça fait déjà super longtemps que tu devrais être partie !";
    if (minutes > 30) return "Oui, j'espère que tu es déjà partie";
    if (minutes > 10)
      return "Oui Chilou !!! c'est l'heure !!! Allez casse toi vite de là !";
  }
};

export default Heure;
