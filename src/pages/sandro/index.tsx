import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { map } from "lodash";

const enum SandroPhotos {
  chemise_1_arriere = "sandro/chemise_1_arriere.jpg",
  chemise_1_avant = "sandro/chemise_1_avant.jpg",
  chemise_1_defaut_zoom_1 = "sandro/chemise_1_defaut_zoom_1.jpg",
  chemise_1_defaut_zoom_2 = "sandro/chemise_1_defaut_zoom_2.jpg",
  chemise_1_defaut_zoom_interieur = "sandro/chemise_1_defaut_zoom_interieur.jpg",
  chemise_1_reference = "sandro/chemise_1_reference.jpg",
  chemise_2_arriere = "sandro/chemise_2_arriere.jpg",
  chemise_2_avant = "sandro/chemise_2_avant.jpg",
  chemise_2_defaut_zoom_1 = "sandro/chemise_2_defaut_zoom_1.jpg",
  chemise_2_defaut_zoom_2 = "sandro/chemise_2_defaut_zoom_2.jpg",
  chemise_2_defaut_zoom_interieur = "sandro/chemise_2_defaut_zoom_interieur.jpg",
  chemise_2_reference = "sandro/chemise_2_reference.jpg",
  chemise_3_arriere = "sandro/chemise_3_arriere.jpg",
  chemise_3_avant = "sandro/chemise_3_avant.jpg",
  chemise_3_defaut_zoom_1 = "sandro/chemise_3_defaut_zoom_1.jpg",
  chemise_3_defaut_zoom_2 = "sandro/chemise_3_defaut_zoom_2.jpg",
  chemise_3_defaut_zoom_interieur = "sandro/chemise_3_defaut_zoom_interieur.jpg",
  chemise_3_reference = "sandro/chemise_3_reference.jpg",
  chemise_ancienne_temoin_arriere = "sandro/chemise_ancienne_temoin_arriere.jpg",
  chemise_ancienne_temoin_avant = "sandro/chemise_ancienne_temoin_avant.jpg",
  chemise_ancienne_zoom = "sandro/chemise_ancienne_zoom.jpg",
  ticket = "sandro/Sales_Order-011401-00023628.jpg",
}

type Chemise = {
  name: string;
  url?: string;
  photoFront: string;
  photoBack: string;
  photoDefect1?: string;
  photoDefect2?: string;
  photoDefect3?: string;
  reference?: string;
};

const data = {
  chemise1: {
    name: "Chemise 1",
    photoBack: SandroPhotos.chemise_1_arriere,
    photoDefect1: SandroPhotos.chemise_1_defaut_zoom_1,
    photoDefect2: SandroPhotos.chemise_1_defaut_zoom_2,
    photoDefect3: SandroPhotos.chemise_1_defaut_zoom_interieur,
    photoFront: SandroPhotos.chemise_1_avant,
    reference: SandroPhotos.chemise_1_reference,
    url: "https://fr.Sandro-paris.com/fr/p/chemise-fluide-imprime-col-requin/SHPCM01655_44.html",
  } as Chemise,
  chemise2: {
    name: "Chemise 2",
    photoBack: SandroPhotos.chemise_2_arriere,
    photoDefect1: SandroPhotos.chemise_2_defaut_zoom_1,
    photoDefect2: SandroPhotos.chemise_2_defaut_zoom_2,
    photoDefect3: SandroPhotos.chemise_2_defaut_zoom_interieur,
    photoFront: SandroPhotos.chemise_2_avant,
    reference: SandroPhotos.chemise_2_reference,
    url: "https://fr.Sandro-paris.com/fr/p/chemise-fluide-imprime-col-requin/SHPCM01655_44.html",
  } as Chemise,
  chemise3: {
    name: "Chemise 3",
    photoBack: SandroPhotos.chemise_3_arriere,
    photoDefect1: SandroPhotos.chemise_3_defaut_zoom_1,
    photoDefect2: SandroPhotos.chemise_3_defaut_zoom_2,
    photoDefect3: SandroPhotos.chemise_3_defaut_zoom_interieur,
    photoFront: SandroPhotos.chemise_3_avant,
    reference: SandroPhotos.chemise_3_reference,
    url: "https://fr.Sandro-paris.com/fr/p/chemise-fluide-a-imprime-maillons/SHPCM01604_44.html",
  } as Chemise,
  chemiseTemoin: {
    name: "Chemise Sandro Témoin utilisée plus d'un an",
    photoBack: SandroPhotos.chemise_ancienne_temoin_arriere,
    photoFront: SandroPhotos.chemise_ancienne_temoin_avant,
  } as Chemise,
};

const columnsNames = {
  name: "Nom",
  photoBack: "Arrière",
  photoDefect1: "Défaut",
  photoDefect2: "Défaut zoomé",
  photoDefect3: "Défaut intérieur",
  photoFront: "Avant",
  reference: "Référence",
  url: "Url",
};

const Sandro = () => {
  const chemises = [
    data.chemise1,
    data.chemise2,
    data.chemise3,
    data.chemiseTemoin,
  ];

  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 4 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Typography>
          {"Bonjour, et tout d'abord merci pour votre réponse."}
        </Typography>
        <Typography>
          {
            "Problème concerné : J'ai acheté 3 chemises le 26 juillet 2026, je ne les ai portées que deux jours chacune, et je me suis rendu compte, en les défroissant qu'elles avaient toutes subi une dégradation anormale de l'impression au niveau du bas du dos. Ce défaut n'était bien sûr pas visible lors de l'achat, mais il s'est révélé dès les premières utilisations. Je tiens également à préciser qu'il ne s'agit pas d'un défaut d'entretien de ma part, j'ai en effet appliqué les conseils d'entretien des vendeurs Sandro, et je n'ai pas utilisé ces chemises dans des conditions anormales. D'autre part, je porte depuis longtemps d'autres chemises Sandro en viscose qui sont encore intactes. S'agissant donc d'une dégradation anormalement rapide de l'impression, je souhaiterais mettre en application la garantie légale de conformité afin d'être remboursé, ou, à défaut, d'obtenir l'échange de ces 3 chemises. Vous trouverez ci-joint, comme demandé, des photos des trois articles concernés"
          }
        </Typography>
        {
          "Je me permets aussi de joindre des photos d'une chemise Sandro que je porte depuis plus d'un an, afin que vous puissiez constater que pour la même utilisation, le même entretien et la même matière, celle-ci est restée comme neuve, contrairement aux 3 chemises concernées par cette réclamation. Vous trouverez également le ticket de caisse en pièce jointe de l'email."
        }
        <Typography>
          {
            "La boutique Sandro relativement proche de mon domicile est celle de Paris Les Halles."
          }
        </Typography>
        <Typography>{"Bien cordialement, Audric Debladis"}</Typography>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {map(chemises, ({ name }) => (
              <TableCell key={name}>{name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {map(
            [
              "reference" as keyof Chemise,
              "photoFront" as keyof Chemise,
              "photoBack" as keyof Chemise,
              "photoDefect1" as keyof Chemise,
              "photoDefect2" as keyof Chemise,
              "photoDefect3" as keyof Chemise,
            ],
            (key) => (
              <TableRow key={key}>
                <TableCell>{columnsNames[key]}</TableCell>
                {map(chemises, (chemise, i) => (
                  <TableCell key={i}>
                    <Box
                      component="a"
                      href={chemise[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Box
                        component="img"
                        src={chemise[key]}
                        sx={{ width: "20vw", height: "auto" }}
                      />
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Sandro;
