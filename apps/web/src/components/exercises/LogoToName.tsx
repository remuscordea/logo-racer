import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Brand } from "@logo-racer/shared";
import type { LogoToNameExercise } from "../../lib/exercises";

interface Props {
  exercise: LogoToNameExercise;
  brandMap: Map<number, Brand>;
  onAnswer: (correct: boolean) => void;
}

export function LogoToName({ exercise, brandMap, onAnswer }: Props) {
  const { t } = useTranslation();
  const correct = brandMap.get(exercise.correctId)!;

  return (
    <Stack alignItems="center" spacing={3} sx={{ width: "100%", maxWidth: 480, mx: "auto" }}>
      <Typography variant="h6" fontWeight={700} textAlign="center" color="text.primary">
        {t("exercise.logoToName.question")}
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
          src={correct.logoPngPath}
          alt="Brand logo"
          sx={{ width: 180, height: 180, objectFit: "contain" }}
        />
      </Box>

      <Stack spacing={1.5} sx={{ width: "100%" }}>
        {exercise.optionIds.map((id) => {
          const brand = brandMap.get(id)!;
          return (
            <Button
              key={id}
              variant="contained"
              size="large"
              onClick={() => onAnswer(id === exercise.correctId)}
              sx={{
                borderRadius: 3,
                py: 2,
                fontSize: "1rem",
                bgcolor: "#4A90D9",
                "&:hover": { bgcolor: "#3A7BC8" },
                boxShadow: "0 4px 12px rgba(74,144,217,0.35)",
              }}
            >
              {brand.name}
            </Button>
          );
        })}
      </Stack>
    </Stack>
  );
}
