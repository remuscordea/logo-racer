import { Trans, useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Brand } from "@logo-racer/shared";
import type { TrueFalseExercise } from "../../lib/exercises";

interface Props {
  exercise: TrueFalseExercise;
  brandMap: Map<number, Brand>;
  onAnswer: (correct: boolean) => void;
}

export function TrueFalse({ exercise, brandMap, onAnswer }: Props) {
  const { t } = useTranslation();
  const target = brandMap.get(exercise.targetBrandId)!;
  const shown = brandMap.get(exercise.shownBrandId)!;

  function handleAnswer(userSaysYes: boolean) {
    onAnswer(userSaysYes === exercise.isMatch);
  }

  return (
    <Stack alignItems="center" spacing={3} sx={{ width: "100%", maxWidth: 400, mx: "auto" }}>
      <Typography variant="h6" fontWeight={700} textAlign="center">
        <Trans
          i18nKey="exercise.trueFalse.question"
          values={{ name: target.name }}
          components={{ bold: <Box component="span" fontWeight={900} color="primary.main" /> }}
        />
      </Typography>

      <Box
        sx={{
          bgcolor: "white",
          borderRadius: 4,
          p: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Box
          component="img"
          src={shown.logoPngPath}
          alt="Brand logo"
          sx={{ width: 180, height: 180, objectFit: "contain" }}
        />
      </Box>

      <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={() => handleAnswer(true)}
          sx={{ py: 2.5, fontSize: "1.15rem", boxShadow: "0 4px 12px rgba(255,107,53,0.35)" }}
        >
          {t("exercise.yes")}
        </Button>
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={() => handleAnswer(false)}
          sx={{ py: 2.5, fontSize: "1.15rem", boxShadow: "0 4px 12px rgba(255,107,53,0.35)" }}
        >
          {t("exercise.no")}
        </Button>
      </Stack>
    </Stack>
  );
}
