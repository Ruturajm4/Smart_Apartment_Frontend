import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RoomsPage from "./pages/RoomsPage";
import SensorsPage from "./pages/SensorPage";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/rooms">Rooms</Link>
      </nav>

      <Routes>
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/rooms/:roomId/sensors" element={<SensorsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
