import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { api } from "../api/client";
import type { WorldWithCount } from "../api/client";
import { LanguageToggle } from "../components/LanguageToggle";
import { WORLD_COLORS } from "../theme";

export function WorldSelect() {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
        setError(t("error.apiUnreachable"));
        setLoading(false);
      });
  }, [t]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          pt: 3,
          pb: 1,
        }}
      >
        <Typography variant="h5" fontWeight={900} color="primary" letterSpacing={-0.5}>
          🚗 {t("app.title")}
        </Typography>
        <LanguageToggle />
      </Box>

      <Stack spacing={2.5} sx={{ p: 3, maxWidth: 480, mx: "auto" }}>
        <Typography variant="h6" fontWeight={800} color="text.primary">
          {t("worlds.title")}
        </Typography>

        {loading && <CircularProgress sx={{ mx: "auto", color: "primary.main" }} />}
        {error && <Typography color="error">{error}</Typography>}

        {worlds.map((world, i) => {
          const color = WORLD_COLORS[i % WORLD_COLORS.length];
          return (
            <Card key={world.id} sx={{ borderRadius: 3, overflow: "hidden", boxShadow: "0 6px 20px rgba(0,0,0,0.12)" }}>
              <CardActionArea onClick={() => navigate(`/worlds/${world.id}`)}>
                <Box sx={{ bgcolor: color, px: 3, py: 2.5, position: "relative", overflow: "hidden" }}>
                  <Box
                    sx={{
                      position: "absolute",
                      top: -18,
                      right: -18,
                      width: 90,
                      height: 90,
                      borderRadius: "50%",
                      bgcolor: "rgba(255,255,255,0.18)",
                    }}
                  />
                  <Typography variant="caption" fontWeight={700} color="white" sx={{ opacity: 0.85, textTransform: "uppercase", letterSpacing: 1 }}>
                    {t("worlds.worldNumber", { order: world.order })}
                  </Typography>
                  <Typography variant="h6" fontWeight={800} color="white" sx={{ mt: 0.25, lineHeight: 1.2 }}>
                    {t(`worlds.order.${world.order}.name`)}
                  </Typography>
                  <Typography variant="body2" color="white" sx={{ opacity: 0.85, mt: 0.5 }}>
                    {t(`worlds.order.${world.order}.description`)}
                  </Typography>
                </Box>
                <Box sx={{ px: 3, py: 1.5, bgcolor: "white", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    {t("worlds.levelCount", { count: world._count.levels })}
                  </Typography>
                  <Typography color="text.secondary" fontSize="1rem">›</Typography>
                </Box>
              </CardActionArea>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
}
