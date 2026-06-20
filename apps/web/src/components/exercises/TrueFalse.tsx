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
  const target = brandMap.get(exercise.targetBrandId)!;
  const shown = brandMap.get(exercise.shownBrandId)!;

  function handleAnswer(userSaysYes: boolean) {
    onAnswer(userSaysYes === exercise.isMatch);
  }

  return (
    <Stack alignItems="center" spacing={3} sx={{ width: "100%", maxWidth: 400, mx: "auto" }}>
      <Typography variant="h6" textAlign="center">
        Is this the logo of{" "}
        <Box component="span" fontWeight="bold">
          {target.name}
        </Box>
        ?
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
          src={shown.logoPngPath}
          alt="Brand logo"
          sx={{ width: 160, height: 160, objectFit: "contain" }}
        />
      </Box>

      <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
        <Button
          variant="contained"
          color="success"
          size="large"
          fullWidth
          onClick={() => handleAnswer(true)}
          sx={{ borderRadius: 3, py: 2, fontSize: "1.1rem", textTransform: "none" }}
        >
          ✅ Yes
        </Button>
        <Button
          variant="contained"
          color="error"
          size="large"
          fullWidth
          onClick={() => handleAnswer(false)}
          sx={{ borderRadius: 3, py: 2, fontSize: "1.1rem", textTransform: "none" }}
        >
          ❌ No
        </Button>
      </Stack>
    </Stack>
  );
}
