import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageBuilder from "./pages/PageBuilder";
import PagePins from "./pages/PagePins";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PagePins />} />
        <Route path="/builder" element={<PageBuilder />} />
      </Routes>
    </BrowserRouter>
  );
} 