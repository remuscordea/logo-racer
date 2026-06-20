import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Brand } from "@logo-racer/shared";
import { api } from "../api/client";
import { buildQueue, retryOf } from "../lib/exercises";
import type { Exercise, MascotState } from "../lib/exercises";
import { Mascot } from "../components/Mascot";
import { ProgressBar } from "../components/ProgressBar";
import { LogoToName } from "../components/exercises/LogoToName";
import { NameToLogo } from "../components/exercises/NameToLogo";
import { TrueFalse } from "../components/exercises/TrueFalse";
import { Matching } from "../components/exercises/Matching";
import { LevelSummary } from "./LevelSummary";

const FEEDBACK_MS = 900;

export function ExerciseScreen() {
  const { worldId, levelId } = useParams<{ worldId: string; levelId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [brandMap, setBrandMap] = useState<Map<number, Brand>>(new Map());
  const [queue, setQueue] = useState<Exercise[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [firstAttempt, setFirstAttempt] = useState<Record<string, boolean>>({});
  const [mascot, setMascot] = useState<MascotState>("neutral");
  const [locked, setLocked] = useState(false); // prevents double-answers during feedback
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const initialQueueRef = useRef<Exercise[]>([]);
  const [totalOriginal, setTotalOriginal] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const [level, allBrands] = await Promise.all([
          api.level(Number(levelId)),
          api.brands(),
        ]);
        const map = new Map(allBrands.map((b) => [b.id, b]));
        const q = buildQueue(level, allBrands);
        setBrandMap(map);
        setQueue(q);
        initialQueueRef.current = q;
        setTotalOriginal(q.length);
        setLoading(false);
      } catch {
        setError(t("error.levelLoadFailed"));
        setLoading(false);
      }
    }
    void load();
  }, [levelId, t]);

  const handleAnswer = useCallback(
    (correct: boolean) => {
      if (locked) return;
      const exercise = queue[currentIdx];
      if (!exercise) return;

      setLocked(true);
      setMascot(correct ? "happy" : "sad");

      // Record first-attempt result (not for retries)
      if (!exercise.isRetry) {
        setFirstAttempt((prev) => ({ ...prev, [exercise.id]: correct }));
      }

      // Re-queue once if wrong on first attempt
      if (!correct && !exercise.isRetry) {
        setQueue((prev) => [...prev, retryOf(exercise)]);
      }

      setTimeout(() => {
        setMascot("neutral");
        setLocked(false);
        if (currentIdx + 1 >= queue.length && (correct || exercise.isRetry)) {
          // Check after state update — use functional form to get latest queue length
          setQueue((prev) => {
            const nextIdx = currentIdx + 1;
            if (nextIdx >= prev.length) {
              setDone(true);
            } else {
              setCurrentIdx(nextIdx);
            }
            return prev;
          });
        } else {
          setCurrentIdx((i) => i + 1);
        }
      }, FEEDBACK_MS);
    },
    [locked, queue, currentIdx],
  );

  function handleReplay() {
    const fresh = initialQueueRef.current.map((ex) => ({ ...ex, isRetry: false }));
    setQueue(fresh);
    setCurrentIdx(0);
    setFirstAttempt({});
    setMascot("neutral");
    setDone(false);
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (done) {
    return (
      <LevelSummary
        firstAttemptResults={firstAttempt}
        onReplay={handleReplay}
        onBack={() => navigate(`/worlds/${worldId}`)}
      />
    );
  }

  const exercise = queue[currentIdx];
  // Progress counts original exercises only (retries don't advance the bar)
  const originalsDone = Object.keys(firstAttempt).length;

  if (!exercise) return null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      <ProgressBar current={originalsDone + 1} total={totalOriginal} />

      <Stack alignItems="center" sx={{ py: 1 }}>
        <Mascot state={mascot} size={72} />
      </Stack>

      {exercise.isRetry && (
        <Typography
          variant="caption"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 1 }}
        >
          {t("exercise.tryAgain")}
        </Typography>
      )}

      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          px: 2,
          pt: 1,
          pb: 4,
          pointerEvents: locked ? "none" : "auto",
          opacity: locked ? 0.7 : 1,
          transition: "opacity 0.2s",
        }}
      >
        {exercise.kind === "LOGO_TO_NAME" && (
          <LogoToName exercise={exercise} brandMap={brandMap} onAnswer={handleAnswer} />
        )}
        {exercise.kind === "NAME_TO_LOGO" && (
          <NameToLogo exercise={exercise} brandMap={brandMap} onAnswer={handleAnswer} />
        )}
        {exercise.kind === "TRUE_FALSE" && (
          <TrueFalse exercise={exercise} brandMap={brandMap} onAnswer={handleAnswer} />
        )}
        {exercise.kind === "MATCHING" && (
          <Matching exercise={exercise} brandMap={brandMap} onAnswer={handleAnswer} />
        )}
      </Box>
    </Box>
  );
}
