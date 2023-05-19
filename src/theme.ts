import { Roboto } from "@next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiTableRow: {},
    MuiTableCell: {
      defaultProps: {
        // padding: "0 0 0 0",
        padding: "none",
      },
      // padding: "0 0 0 0",

      styleOverrides: {
        // paddingNone: true,
        // padd
        // paddingCheckbox: false,
      },
    },
  },
});

export default theme;
