import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { api } from "../api/client";
import type { WorldWithLevels } from "../api/client";

export function LevelSelect() {
  const { worldId } = useParams<{ worldId: string }>();
  const navigate = useNavigate();
  const [world, setWorld] = useState<WorldWithLevels | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .world(Number(worldId))
      .then((data) => {
        setWorld(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load world.");
        setLoading(false);
      });
  }, [worldId]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Box sx={{ px: 2, pt: 2 }}>
        <Button onClick={() => navigate("/")} sx={{ textTransform: "none" }}>
          ← Worlds
        </Button>
      </Box>

      <Stack spacing={2} sx={{ p: 3, maxWidth: 480, mx: "auto" }}>
        {loading && <CircularProgress sx={{ mx: "auto" }} />}
        {error && <Typography color="error">{error}</Typography>}

        {world && (
          <>
            <Typography variant="h5" fontWeight="bold">
              {world.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {world.description}
            </Typography>

            {world.levels.map((level) => (
              <Card key={level.id} sx={{ borderRadius: 4, boxShadow: 2 }}>
                <CardActionArea
                  onClick={() =>
                    navigate(`/worlds/${worldId}/levels/${level.id}`)
                  }
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      Level {level.order}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {(level.exerciseConfig as Array<{ type: string }>)
                        .map((c) => c.type.replace(/_/g, " "))
                        .join(" · ")}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </>
        )}
      </Stack>
    </Box>
  );
}
