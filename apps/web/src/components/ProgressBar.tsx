import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

interface Props {
  current: number; // 1-based
  total: number;
}

export function ProgressBar({ current, total }: Props) {
  const pct = Math.round(((current - 1) / total) * 100);

  return (
    <Box sx={{ width: "100%", px: 2, pt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
        <Typography variant="caption" color="text.secondary">
          {current}/{total}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={pct}
        sx={{ height: 10, borderRadius: 5 }}
      />
    </Box>
  );
}
