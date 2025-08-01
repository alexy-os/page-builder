import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider as JotaiProvider } from 'jotai';

import PagePins from "./pages/PagePins";
import PageBuilder from "./pages/PageBuilder";
import { useThemeStore, useProjectStore } from "./store";
import { HeroBlocks } from "./Blocks";

function App() {
  // Initialize stores
  const { initialize: initializeTheme } = useThemeStore();
  const { initializeProject } = useProjectStore();

  useEffect(() => {
    // Initialize stores on app mount
    initializeTheme();
    initializeProject();
  }, [initializeTheme, initializeProject]);

  return (
    <JotaiProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PagePins />} />
          <Route path="/builder" element={<PageBuilder />} />
          <Route path="/blocks" element={<HeroBlocks />} />
        </Routes>
      </Router>
    </JotaiProvider>
  );
}

export default App; 