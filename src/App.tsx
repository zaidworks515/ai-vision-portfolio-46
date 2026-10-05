import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const App = () => (
  <MotionConfig reducedMotion="user">
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/work/:slug" element={<Index />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </MotionConfig>
);

export default App;
