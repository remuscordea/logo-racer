import { createTheme } from "@mui/material/styles";

export const WORLD_COLORS = ["#FF4757", "#FFA502", "#2ED573"];

export const theme = createTheme({
  palette: {
    primary: { main: "#FF6B35" },
    secondary: { main: "#FFA502" },
    success: { main: "#2ED573", light: "#DCFFE9" },
    error: { main: "#FF4757", light: "#FFE0E3" },
    background: { default: "#F8F9FA" },
  },
  typography: {
    fontFamily: '"Nunito", system-ui, sans-serif',
    button: { fontWeight: 700 },
    h4: { fontWeight: 800 },
    h5: { fontWeight: 800 },
    h6: { fontWeight: 700 },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          textTransform: "none",
          fontSize: "1rem",
          fontWeight: 700,
          paddingTop: 12,
          paddingBottom: 12,
        },
        sizeLarge: {
          paddingTop: 16,
          paddingBottom: 16,
          fontSize: "1.05rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
        },
      },
    },
  },
});
