import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Mascot } from "../components/Mascot";

interface Props {
  firstAttemptResults: Record<string, boolean>;
  onReplay: () => void;
  onBack: () => void;
}

export function LevelSummary({ firstAttemptResults, onReplay, onBack }: Props) {
  const { t } = useTranslation();
  const total = Object.keys(firstAttemptResults).length;
  const correct = Object.values(firstAttemptResults).filter(Boolean).length;
  const perfect = correct === total;
  const goodEnough = correct >= total / 2;

  const headline = perfect
    ? t("summary.perfect")
    : goodEnough
    ? t("summary.wellDone")
    : t("summary.keepGoing");

  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 3,
      }}
    >
      <Stack alignItems="center" spacing={3} sx={{ maxWidth: 400, width: "100%" }}>
        <Mascot state={goodEnough ? "happy" : "sad"} size={110} />

        <Typography variant="h4" fontWeight={900} textAlign="center" color={goodEnough ? "primary" : "text.primary"}>
          {headline}
        </Typography>

        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 4,
            p: 3,
            textAlign: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
            width: "100%",
          }}
        >
          <Typography variant="h2" fontWeight={900} color={goodEnough ? "primary.main" : "error.main"}>
            {correct}/{total}
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={0.5} fontWeight={600}>
            {t("summary.correctOnFirstTry")}
          </Typography>

          <Box sx={{ mt: 2, bgcolor: "#F0F0F0", borderRadius: 2, height: 12, overflow: "hidden" }}>
            <Box
              sx={{
                height: "100%",
                width: `${pct}%`,
                bgcolor: goodEnough ? "primary.main" : "error.main",
                borderRadius: 2,
                transition: "width 0.8s ease",
              }}
            />
          </Box>
        </Box>

        <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
          <Button
            variant="outlined"
            fullWidth
            size="large"
            onClick={onReplay}
            sx={{ borderWidth: 2, fontWeight: 700, "&:hover": { borderWidth: 2 } }}
          >
            {t("summary.playAgain")}
          </Button>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={onBack}
            sx={{ fontWeight: 700, boxShadow: "0 4px 12px rgba(255,107,53,0.4)" }}
          >
            {t("summary.backToLevels")}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
