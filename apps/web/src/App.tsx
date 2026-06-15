import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "./components/LanguageToggle";

function App() {
  const { t } = useTranslation();

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Stack direction="row" justifyContent="flex-end" p={2}>
        <LanguageToggle />
      </Stack>
      <Stack
        flex={1}
        alignItems="center"
        justifyContent="center"
        spacing={2}
        textAlign="center"
        px={2}
      >
        <Typography variant="h1" fontSize={{ xs: 40, sm: 64 }} color="primary">
          {t("app.title")}
        </Typography>
        <Typography variant="h5">{t("app.tagline")}</Typography>
      </Stack>
    </Box>
  );
}

export default App;
