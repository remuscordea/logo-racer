import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Brand } from "@logo-racer/shared";
import type { NameToLogoExercise } from "../../lib/exercises";

interface Props {
  exercise: NameToLogoExercise;
  brandMap: Map<number, Brand>;
  onAnswer: (correct: boolean) => void;
}

export function NameToLogo({ exercise, brandMap, onAnswer }: Props) {
  const { t } = useTranslation();
  const correct = brandMap.get(exercise.correctId)!;

  return (
    <Stack alignItems="center" spacing={3} sx={{ width: "100%", maxWidth: 520, mx: "auto" }}>
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: 4,
          px: 4,
          py: 2,
          boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight={900} color="primary">
          {correct.name}
        </Typography>
      </Box>

      <Typography variant="h6" fontWeight={700} textAlign="center">
        {t("exercise.nameToLogo.question")}
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {exercise.optionIds.map((id) => {
          const brand = brandMap.get(id)!;
          return (
            <Grid key={id} item xs={6}>
              <Box
                onClick={() => onAnswer(id === exercise.correctId)}
                sx={{
                  bgcolor: "white",
                  borderRadius: 3,
                  p: 2,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  aspectRatio: "1",
                  transition: "transform 0.12s, box-shadow 0.12s",
                  "&:hover": { transform: "scale(1.05)", boxShadow: "0 8px 24px rgba(0,0,0,0.18)" },
                  "&:active": { transform: "scale(0.97)" },
                }}
              >
                <Box
                  component="img"
                  src={brand.logoPngPath}
                  alt={brand.name}
                  sx={{ width: "80%", height: "80%", objectFit: "contain" }}
                />
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}
