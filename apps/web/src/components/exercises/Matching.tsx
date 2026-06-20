import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Brand } from "@logo-racer/shared";
import { shuffle } from "../../lib/exercises";
import type { MatchingExercise } from "../../lib/exercises";

interface Props {
  exercise: MatchingExercise;
  brandMap: Map<number, Brand>;
  onAnswer: (correct: boolean) => void; // called once when all pairs matched (always true)
}

export function Matching({ exercise, brandMap, onAnswer }: Props) {
  const { t } = useTranslation();

  const logos = useMemo(
    () => shuffle(exercise.pairIds.map((id) => brandMap.get(id)!)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [exercise.id],
  );
  const names = useMemo(
    () => shuffle(exercise.pairIds.map((id) => brandMap.get(id)!)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [exercise.id],
  );

  const [selectedLogoId, setSelectedLogoId] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [shaking, setShaking] = useState<number | null>(null);
  const calledRef = useRef(false);

  useEffect(() => {
    if (!calledRef.current && matched.size === exercise.pairIds.length) {
      calledRef.current = true;
      setTimeout(() => onAnswer(true), 400);
    }
  }, [matched, exercise.pairIds.length, onAnswer]);

  function handleLogoClick(brandId: number) {
    if (matched.has(brandId)) return;
    setSelectedLogoId((prev) => (prev === brandId ? null : brandId));
  }

  function handleNameClick(brandId: number) {
    if (!selectedLogoId || matched.has(selectedLogoId)) return;
    if (selectedLogoId === brandId) {
      setMatched((prev) => new Set([...prev, brandId]));
      setSelectedLogoId(null);
    } else {
      setShaking(selectedLogoId);
      setTimeout(() => {
        setShaking(null);
        setSelectedLogoId(null);
      }, 500);
    }
  }

  return (
    <Stack alignItems="center" spacing={2} sx={{ width: "100%", maxWidth: 520, mx: "auto" }}>
      <Typography variant="h6" fontWeight={700} textAlign="center">
        {t("exercise.matching.question")}
      </Typography>

      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-8px); }
          40%      { transform: translateX(8px); }
          60%      { transform: translateX(-6px); }
          80%      { transform: translateX(6px); }
        }
      `}</style>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5, width: "100%" }}>
        {/* Logo column */}
        <Stack spacing={1}>
          {logos.map((brand) => {
            const isMatched = matched.has(brand.id);
            const isSelected = selectedLogoId === brand.id;
            const isShaking = shaking === brand.id;
            return (
              <Box
                key={brand.id}
                onClick={() => handleLogoClick(brand.id)}
                sx={{
                  bgcolor: isMatched ? "success.light" : isSelected ? "#FFF0EB" : "white",
                  border: 2.5,
                  borderColor: isMatched ? "success.main" : isSelected ? "primary.main" : "#E9ECEF",
                  borderRadius: 3,
                  p: 1.5,
                  display: "flex",
                  justifyContent: "center",
                  cursor: isMatched ? "default" : "pointer",
                  opacity: isMatched ? 0.75 : 1,
                  animation: isShaking ? "shake 0.45s ease" : "none",
                  transition: "background-color 0.15s, border-color 0.15s",
                  boxShadow: isSelected ? "0 0 0 3px rgba(255,107,53,0.2)" : "0 2px 8px rgba(0,0,0,0.07)",
                }}
              >
                <Box
                  component="img"
                  src={brand.logoPngPath}
                  alt={brand.name}
                  sx={{ width: 60, height: 60, objectFit: "contain" }}
                />
              </Box>
            );
          })}
        </Stack>

        {/* Name column */}
        <Stack spacing={1}>
          {names.map((brand) => {
            const isMatched = matched.has(brand.id);
            return (
              <Box
                key={brand.id}
                onClick={() => handleNameClick(brand.id)}
                sx={{
                  bgcolor: isMatched ? "success.light" : "white",
                  border: 2.5,
                  borderColor: isMatched ? "success.main" : "#E9ECEF",
                  borderRadius: 3,
                  px: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 76,
                  cursor: isMatched ? "default" : "pointer",
                  opacity: isMatched ? 0.75 : 1,
                  transition: "background-color 0.15s",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                }}
              >
                <Typography fontWeight={800} textAlign="center" fontSize="0.9rem">
                  {brand.name}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Stack>
  );
}
