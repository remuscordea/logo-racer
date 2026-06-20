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
      <Typography variant="h6" textAlign="center">
        {t("exercise.logoToName.question")}
      </Typography>

      <Box
        sx={{
          bgcolor: "white",
          borderRadius: 3,
          p: 2,
          boxShadow: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src={correct.logoPngPath}
          alt="Brand logo"
          sx={{ width: 160, height: 160, objectFit: "contain" }}
        />
      </Box>

      <Stack spacing={1.5} sx={{ width: "100%" }}>
        {exercise.optionIds.map((id) => {
          const brand = brandMap.get(id)!;
          return (
            <Button
              key={id}
              variant="outlined"
              size="large"
              onClick={() => onAnswer(id === exercise.correctId)}
              sx={{ borderRadius: 3, py: 1.5, fontSize: "1rem", textTransform: "none" }}
            >
              {brand.name}
            </Button>
          );
        })}
      </Stack>
    </Stack>
  );
}
