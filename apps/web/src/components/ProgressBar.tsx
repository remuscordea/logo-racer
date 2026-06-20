import Box from "@mui/material/Box";

interface Props {
  current: number; // 1-based
  total: number;
}

export function ProgressBar({ current, total }: Props) {
  const pct = Math.min(100, Math.round(((current - 1) / total) * 100));

  return (
    <Box sx={{ width: "100%", px: 2, pt: 2 }}>
      <Box
        sx={{
          width: "100%",
          height: 14,
          borderRadius: 7,
          bgcolor: "#E9ECEF",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: `${pct}%`,
            borderRadius: 7,
            background: "linear-gradient(90deg, #FF6B35 0%, #FF8C42 100%)",
            transition: "width 0.4s ease",
          }}
        />
      </Box>
    </Box>
  );
}
