import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Mascot } from "../components/Mascot";

interface Props {
  firstAttemptResults: Record<string, boolean>; // exerciseId → correct?
  onReplay: () => void;
  onBack: () => void;
}

export function LevelSummary({ firstAttemptResults, onReplay, onBack }: Props) {
  const total = Object.keys(firstAttemptResults).length;
  const correct = Object.values(firstAttemptResults).filter(Boolean).length;
  const perfect = correct === total;

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
        <Mascot state={perfect ? "happy" : correct >= total / 2 ? "happy" : "sad"} size={100} />

        <Typography variant="h4" fontWeight="bold" textAlign="center">
          {perfect ? "Perfect! 🎉" : correct >= total / 2 ? "Well done! 👍" : "Keep going! 💪"}
        </Typography>

        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 4,
            p: 3,
            textAlign: "center",
            boxShadow: 2,
            width: "100%",
          }}
        >
          <Typography variant="h3" fontWeight="bold" color="primary">
            {correct}/{total}
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={0.5}>
            correct on first try
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
          <Button
            variant="outlined"
            fullWidth
            size="large"
            onClick={onReplay}
            sx={{ borderRadius: 3, textTransform: "none" }}
          >
            Play again
          </Button>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={onBack}
            sx={{ borderRadius: 3, textTransform: "none" }}
          >
            Back to levels
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
