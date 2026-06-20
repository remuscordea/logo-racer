import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { api } from "../api/client";
import type { WorldWithLevels } from "../api/client";
import { WORLD_COLORS } from "../theme";

export function LevelSelect() {
  const { worldId } = useParams<{ worldId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
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
        setError(t("error.loadFailed"));
        setLoading(false);
      });
  }, [worldId, t]);

  const worldIndex = world ? world.order - 1 : 0;
  const accentColor = WORLD_COLORS[worldIndex % WORLD_COLORS.length];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Box sx={{ px: 2, pt: 2 }}>
        <Button
          onClick={() => navigate("/")}
          sx={{ textTransform: "none", fontWeight: 700, color: "text.secondary" }}
        >
          ← {t("nav.worlds")}
        </Button>
      </Box>

      <Stack spacing={2} sx={{ p: 3, maxWidth: 480, mx: "auto" }}>
        {loading && <CircularProgress sx={{ mx: "auto" }} />}
        {error && <Typography color="error">{error}</Typography>}

        {world && (
          <>
            <Box sx={{ bgcolor: accentColor, borderRadius: 3, px: 3, py: 2, mb: 1 }}>
              <Typography variant="caption" fontWeight={700} color="white" sx={{ opacity: 0.85, textTransform: "uppercase", letterSpacing: 1 }}>
                {t("worlds.worldNumber", { order: world.order })}
              </Typography>
              <Typography variant="h5" fontWeight={800} color="white" sx={{ lineHeight: 1.2 }}>
                {t(`worlds.order.${world.order}.name`)}
              </Typography>
            </Box>

            {world.levels.map((level) => (
              <Card key={level.id} sx={{ borderRadius: 3 }}>
                <CardActionArea onClick={() => navigate(`/worlds/${worldId}/levels/${level.id}`)}>
                  <CardContent sx={{ display: "flex", alignItems: "center", gap: 2, py: 2 }}>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        bgcolor: accentColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Typography fontWeight={800} color="white" fontSize="1.1rem">
                        {level.order}
                      </Typography>
                    </Box>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="subtitle1" fontWeight={800}>
                        {t("levels.label", { order: level.order })}
                      </Typography>
                      <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ mt: 0.5 }}>
                        {(level.exerciseConfig as Array<{ type: string }>).map((c) => (
                          <Chip
                            key={c.type}
                            label={t(`exerciseType.${c.type}`)}
                            size="small"
                            sx={{
                              bgcolor: `${accentColor}22`,
                              color: accentColor,
                              fontWeight: 700,
                              fontSize: "0.7rem",
                              height: 22,
                            }}
                          />
                        ))}
                      </Stack>
                    </Box>

                    <Typography color="text.secondary" fontSize="1.4rem" sx={{ flexShrink: 0 }}>
                      ›
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
