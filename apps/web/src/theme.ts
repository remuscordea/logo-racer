import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: { main: "#FF6F61" },
    secondary: { main: "#FFD166" },
    background: { default: "#FFF8F0" },
  },
  typography: {
    fontFamily: '"Comic Sans MS", "Baloo 2", system-ui, sans-serif',
  },
  shape: {
    borderRadius: 16,
  },
});
