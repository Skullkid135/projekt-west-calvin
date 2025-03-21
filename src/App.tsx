import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Overview from "./components/Overview";
import LicenceView from "./components/LicenceView";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <header className="header">
          <h1 className="title">Visual Events Planner</h1>
          <div className="profile-circle">Profile</div>
        </header>

        {/* Routen für die Navigation */}
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/licence-view" element={<LicenceView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
