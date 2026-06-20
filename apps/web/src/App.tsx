import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WorldSelect } from "./screens/WorldSelect";
import { LevelSelect } from "./screens/LevelSelect";
import { ExerciseScreen } from "./screens/ExerciseScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WorldSelect />} />
        <Route path="/worlds/:worldId" element={<LevelSelect />} />
        <Route path="/worlds/:worldId/levels/:levelId" element={<ExerciseScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
