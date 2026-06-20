import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

interface Props {
  current: number; // 1-based
  total: number;
}

export function ProgressBar({ current, total }: Props) {
  const pct = Math.round(((current - 1) / total) * 100);

  return (
    <Box sx={{ width: "100%", px: 2, pt: 2 }}>
      <LinearProgress
        variant="determinate"
        value={pct}
        sx={{
          height: 14,
          borderRadius: 7,
          bgcolor: "#E9ECEF",
          "& .MuiLinearProgress-bar": {
            borderRadius: 7,
            background: "linear-gradient(90deg, #FF6B35 0%, #FF8C42 100%)",
          },
        }}
      />
    </Box>
  );
}
