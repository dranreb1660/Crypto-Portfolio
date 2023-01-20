import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { HomePage } from "./pages";
const App = () => {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
