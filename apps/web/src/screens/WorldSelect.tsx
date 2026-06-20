import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { api } from "../api/client";
import type { WorldWithCount } from "../api/client";
import { LanguageToggle } from "../components/LanguageToggle";

const WORLD_COLORS = ["#FF6F61", "#FFD166", "#06D6A0"];

export function WorldSelect() {
  const navigate = useNavigate();
  const [worlds, setWorlds] = useState<WorldWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .worlds()
      .then((data) => {
        setWorlds(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not reach API on localhost:3001.");
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          pt: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="primary">
          🚗 Logo Racer
        </Typography>
        <LanguageToggle />
      </Box>

      <Stack spacing={2} sx={{ p: 3, maxWidth: 480, mx: "auto" }}>
        <Typography variant="h6" fontWeight="bold">
          Choose a world
        </Typography>

        {loading && <CircularProgress sx={{ mx: "auto" }} />}
        {error && <Typography color="error">{error}</Typography>}

        {worlds.map((world, i) => (
          <Card
            key={world.id}
            sx={{ borderRadius: 4, boxShadow: 3, overflow: "hidden" }}
          >
            <CardActionArea onClick={() => navigate(`/worlds/${world.id}`)}>
              <Box sx={{ bgcolor: WORLD_COLORS[i % WORLD_COLORS.length], px: 3, py: 2 }}>
                <Typography variant="h6" fontWeight="bold" color="white">
                  World {world.order} — {world.name}
                </Typography>
                <Typography variant="body2" color="white" sx={{ opacity: 0.85 }}>
                  {world.description}
                </Typography>
              </Box>
              <CardContent>
                <Typography variant="caption" color="text.secondary">
                  {world._count.levels} levels
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
