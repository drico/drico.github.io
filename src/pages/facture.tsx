import printDiv from "@/helpers/printDiv";
import { useEffect, useState } from "react";
import { getMonth, format, getYear, setDefaultOptions } from "date-fns";
import { fr } from "date-fns/locale";
import {
  capitalize,
  cloneDeep,
  dropRight,
  isNil,
  join,
  map,
  split,
  sumBy,
  times,
} from "lodash";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { TableRows } from "@mui/icons-material";

type Cache = {
  year: number;
  month: number;
  factureOffset: number;
  companyName: string;
  companyLines: string[];
  clientName: string;
  clientLines: string[];
  prestation: string;
  footerLines: string[];
  tjm: number;
  workLines: { month: number; days: number }[];
};

setDefaultOptions({ locale: fr });

const defaultCache: Cache = {
  year: 2023,
  companyLines: [
    "Audric Debladis",
    "119 rue de Montreuil",
    "chez Mr Audric Debladis",
    "75011 Paris France",
    "Numéro SIRET : 90436439500015",
    "TVA intracom : FR93904364395",
  ],
  companyName: "DricoLogic",
  clientName: "FreelanceRepublik (ODHCOM)",
  clientLines: [
    "99 Avenue Achille Peretti",
    "92200 Neuilly-sur-Seine",
    "Contact : Manon FOURCAT",
    "Numéro d'immatriculation : 800 965 634 R.C.S. Nanterre",
    "TVA intracom : FR13800965634",
  ],
  month: 2,
  factureOffset: 2,
  footerLines: [
    "DricoLogic, SAS au capital de 1000€",
    "SIRET 90436439500015 RCS de Paris - NAF 6202A",
    "Numéro de TVA Intracommunautaire : FR93904364395",
    "",
    "",
    "La facture est payable sous 60 jours. Tout règlement effectué après expiration du délai donnera lieu, à titre de pénalité de retard, à la facturation d'un intérêt de",
    "retard égal à trois fois le taux d'intérêt légal en vigueur en France, à compter de la date d'exigibilité de cette présente facture jusqu'à la date de paiement effectif,",
    "ainsi qu'à une indemnité forfaitaire pour frais de recouvrement d'un montant de 40 €. Les pénalités de retard sont exigibles sans qu'un rappel soit nécessaire",
  ],
  workLines: [
    { month: 2, days: 1 },
    { month: 3, days: 19 },
  ],
  tjm: 456,
  prestation: "Développeur Senior Full Stack JS",
};

const Facture = () => {
  const [cache, setCache] = useState<Cache>(defaultCache);

  useEffect(() => {
    setCache(
      JSON.parse(
        localStorage.getItem("facture") || JSON.stringify(defaultCache)
      )
    );
  }, []);

  const updateCache = (key: keyof Cache, value: any) => {
    setCache((oldCache) => {
      const newCache = { ...oldCache, [key]: value };
      localStorage.setItem("facture", JSON.stringify(newCache));
      return newCache;
    });
  };

  const updateTextField = (key: keyof Cache) => (event: any) => {
    const value = event.target.value;
    updateCache(key, value);
  };

  const updateNumberTextField = (key: keyof Cache) => (event: any) => {
    const value = parseInt(event.target.value, 10);
    updateCache(key, value);
  };

  const updateWorkMonthNumberValue =
    (key: keyof Cache["workLines"][number], workIndex: number) =>
    (event: any) => {
      const value = parseInt(event.target.value, 10);
      setCache((oldCache) => {
        const newWorkLines = [...oldCache.workLines];
        newWorkLines[workIndex] = { ...newWorkLines[workIndex], [key]: value };
        const newCache = { ...oldCache, workLines: newWorkLines };
        localStorage.setItem("facture", JSON.stringify(newCache));
        return newCache;
      });
    };

  const updateTextArea = (key: keyof Cache) => (event: any) => {
    const value = split(event.target.value, "\n");
    updateCache(key, value);
  };

  const factureNumber = (cache.factureOffset + cache.month + 1).toLocaleString(
    undefined,
    { minimumIntegerDigits: 3 }
  );
  const factureReference = `${cache.year % 100}${factureNumber}`;

  const text = ({
    cacheKey,
    label,
  }: {
    cacheKey: keyof Cache;
    label: string;
  }) => {
    return (
      <TextField
        label={label}
        size="small"
        value={cache[cacheKey]}
        onChange={updateTextField(cacheKey)}
        InputLabelProps={{ shrink: !!cache[cacheKey] }}
        fullWidth
      />
    );
  };

  const numberText = ({
    cacheKey,
    label,
    fullWidth,
  }: {
    cacheKey: keyof Cache;
    label: string;
    fullWidth?: boolean;
  }) => {
    return (
      <TextField
        label={label}
        value={cache[cacheKey]}
        onChange={updateNumberTextField(cacheKey)}
        InputLabelProps={{ shrink: true }}
        type="number"
        fullWidth={fullWidth}
      />
    );
  };

  const workLineNumberText = ({
    cacheKey,
    label,
    workIndex,
    fullWidth,
  }: {
    cacheKey: keyof Cache["workLines"][number];
    label: string;
    workIndex: number;
    fullWidth?: boolean;
  }) => {
    return (
      <TextField
        label={label}
        value={cache.workLines[workIndex][cacheKey]}
        onChange={updateWorkMonthNumberValue(cacheKey, workIndex)}
        InputLabelProps={{ shrink: true }}
        type="number"
        fullWidth={fullWidth}
      />
    );
  };

  const addWorkLine = () => {
    updateCache("workLines", [
      ...cache.workLines,
      { month: cache.month, days: 0 },
    ]);
  };

  const removeWorkLine = () => {
    updateCache("workLines", dropRight(cache.workLines));
  };

  const area = ({
    cacheKey,
    label,
  }: {
    cacheKey: keyof Cache;
    label: string;
  }) => {
    const value = join(cache[cacheKey] as string[], "\n");
    return (
      <TextField
        label={label}
        size="small"
        value={value}
        onChange={updateTextArea(cacheKey)}
        InputLabelProps={{ shrink: !!value }}
        multiline
        fullWidth
      />
    );
  };

  const monthSelect = ({
    label,
    value,
    onChange,
    fullWidth,
  }: {
    label: string;
    value: number;
    onChange: any;
    fullWidth?: boolean;
  }) => {
    return (
      <FormControl fullWidth={fullWidth}>
        <InputLabel>{label}</InputLabel>
        <Select
          value={value}
          onChange={onChange}
          label={label}
          fullWidth={fullWidth}
        >
          {times(12, (i) => (
            <MenuItem value={i} key={i}>
              {getMonthName(i)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  const goToNextMonth = () => {
    setCache((oldCache) => {
      const newCache = cloneDeep(oldCache);
      newCache.month = (newCache.month + 1) % 12;
      if (newCache.month === 0) {
        newCache.year = newCache.year + 1;
      }
      newCache.workLines = map(newCache.workLines, (workLine) => ({
        month: (workLine.month + 1) % 12,
        days: workLine.days,
      }));
      localStorage.setItem("facture", JSON.stringify(newCache));
      return newCache;
    });
  };

  const goToPreviousMonth = () => {
    setCache((oldCache) => {
      const newCache = cloneDeep(oldCache);
      newCache.month = (newCache.month - 1 + 12) % 12;
      if (newCache.month === 11) {
        newCache.year = newCache.year - 1;
      }
      newCache.workLines = map(newCache.workLines, (workLine) => ({
        month: (workLine.month - 1 + 12) % 12,
        days: workLine.days,
      }));
      localStorage.setItem("facture", JSON.stringify(newCache));
      return newCache;
    });
  };

  const totalHT = sumBy(cache.workLines, "days") * cache.tjm;

  return (
    <div>
      <div className="bg-white flex flex-col gap-5 p-5">
        <div className="flex justify-evenly">
          <Button size="large" onClick={goToPreviousMonth}>
            Mois précédent
          </Button>
          <Button size="large" onClick={() => printDiv("pdf")}>
            Exporter
          </Button>
          <Button size="large" onClick={goToNextMonth}>
            Mois suivant
          </Button>
        </div>

        <div className="flex">
          <div className="flex flex-col gap-5 grow">
            {map(cache.workLines, ({ month, days }, i) => (
              <div className="flex gap-5" key={i}>
                {monthSelect({
                  label: "Month",
                  value: cache.workLines[i].month,
                  onChange: updateWorkMonthNumberValue("month", i),
                  fullWidth: true,
                })}
                {workLineNumberText({
                  label: "Days",
                  cacheKey: "days",
                  workIndex: i,
                  fullWidth: true,
                })}
              </div>
            ))}
          </div>
          <div>
            <Button size="large" onClick={addWorkLine}>
              +1
            </Button>
            <Button size="large" onClick={removeWorkLine}>
              -1
            </Button>
          </div>
        </div>

        <Accordion defaultExpanded={false}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {"Données comptables"}
          </AccordionSummary>
          <AccordionDetails className="flex flex-col gap-5">
            <div className="flex gap-5">
              {monthSelect({
                label: "Mois",
                value: cache.month,
                onChange: updateNumberTextField("month"),
                fullWidth: true,
              })}
              {numberText({
                label: "Année",
                cacheKey: "year",
                fullWidth: true,
              })}
              {numberText({
                label: "Offset de facture",
                cacheKey: "factureOffset",
                fullWidth: true,
              })}
              {numberText({ label: "tjm", cacheKey: "tjm", fullWidth: true })}
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded={false}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {"Données légales"}
          </AccordionSummary>
          <AccordionDetails className="flex flex-col gap-5">
            <div className="flex gap-5">
              <div className="flex flex-col w-full gap-5">
                <div className="font-bold">Company</div>
                {text({ label: "Name", cacheKey: "companyName" })}
                {area({ label: "Lines", cacheKey: "companyLines" })}
              </div>
              <div className="flex flex-col w-full gap-5">
                <div className="font-bold">Client</div>
                {text({ label: "Name", cacheKey: "clientName" })}
                {area({ label: "Lines", cacheKey: "clientLines" })}
              </div>
            </div>
            {text({ label: "Prestation", cacheKey: "prestation" })}
            {area({ label: "Footer", cacheKey: "footerLines" })}
          </AccordionDetails>
        </Accordion>
      </div>

      <div id="pdf">
        <div className="font-arial bg-white w-full min-h-screen p-2 flex flex-col gap-5">
          <div className="">
            <div className="text-xl">Facture</div>
            <div className="text-xs">
              Référence de facture : {factureReference}
            </div>
            <div className="text-xs">
              Émise le {format(new Date(), "dd LLLL yyyy")}
            </div>
          </div>

          <div className="flex w-full justify-between text-xs">
            {map(
              [
                {
                  title: "AU NOM ET POUR LE COMPTE DE",
                  name: cache.companyName,
                  lines: cache.companyLines,
                },
                {
                  title: "ADRESSÉ À",
                  name: cache.clientName,
                  lines: cache.clientLines,
                },
              ],
              ({ title, name, lines }) => (
                <div className="w-2/5" key={title}>
                  <div className="text-xxs border-b border-gray-300 text-gray-500 leading-5 mb-1">
                    {title}
                  </div>
                  <div>
                    <div className="font-bold">{name}</div>
                    {map(lines, (line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>

          <div>
            <div className="text-xxs border-b border-gray-300 text-gray-500 leading-5 mb-1">
              PRESTATION
            </div>
            <div className="text-basetext-gray-500">{cache.prestation}</div>
          </div>

          <Table>
            <TableHead>
              <TableRow className="h-8">
                <TableCell align="left" className="text-xxs border-b-0">
                  Mois
                </TableCell>
                <TableCell align="center" className="text-xxs border-b-0">
                  Nombre de jours
                </TableCell>
                <TableCell
                  align="right"
                  className="text-xxs border-b-0 w-[90px]"
                >
                  Prix unitaire (HT)
                </TableCell>
                <TableCell align="right" className="text-xxs border-b-0">
                  TOTAL (HT)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {map(cache.workLines, ({ month, days }, i) => (
                <TableRow key={i} className="h-8">
                  <TableCell align="left" className="text-xxs">{`${capitalize(
                    getMonthName(month)
                  )} ${cache.year}`}</TableCell>
                  <TableCell align="center" className="text-xxs">
                    {days}
                  </TableCell>
                  <TableCell align="right" className="text-xxs">
                    {cache.tjm}
                  </TableCell>
                  <TableCell align="right" className="text-xxs">
                    {toEuro(days * cache.tjm)}
                  </TableCell>
                </TableRow>
              ))}

              {map(
                [
                  { label: "TOTAL (HT)", value: totalHT },
                  { label: "TVA (20%)", value: totalHT * 0.2 },
                  { label: "TOTAL TTC", value: totalHT * 1.2 },
                ],
                ({ label, value }, i) => (
                  <TableRow className="h-8" key={label}>
                    <TableCell className="border-b-0" />
                    <TableCell className="border-b-0" />
                    <TableCell align="right" className="text-xxs">
                      {label}
                    </TableCell>
                    <TableCell align="right" className="font-bold text-xs">
                      {toEuro(value)}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>

          <div className="grow" />

          <div className="text-[9px] text-center">
            {map(cache.footerLines, (line, i) =>
              line ? <div key={i}>{line}</div> : <br key={i} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facture;

const getMonthName = (month: number) => {
  const date = new Date();
  date.setMonth(month);
  return format(new Date(date), "LLLL");
};

const toEuro = (number: number) => {
  return (
    number.toLocaleString(undefined, {
      minimumFractionDigits: 2,
    }) + " €"
  );
};
