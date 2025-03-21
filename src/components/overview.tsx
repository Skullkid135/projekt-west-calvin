import React from "react";
import { useNavigate } from "react-router-dom";
import "./Overview.css";

const Overview: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="overview-container">
      <header className="overview-title">
        <h1>Lizenz Übersicht</h1>
      </header>
      <div className="license-grid">
        <div className="license-card" onClick={() => navigate("/licence-view")}>
          <h3>Free Trial</h3>
          <p>
            Laufende Lizenzen: <strong>7</strong>
          </p>
          <hr />
          <p>Vorteile:</p>
          <p>
            +<br />+<br />+<br />
          </p>
          <p>Nachteile:</p>
          <p>
            -<br />-<br />-<br />
          </p>
          <hr />
          <p className="price">Kostenlos</p>
        </div>

        <div className="license-card" onClick={() => navigate("/licence-view")}>
          <h3>Base Planner</h3>
          <p>
            Laufende Lizenzen: <strong>5</strong>
          </p>
          <hr />
          <p>Vorteile:</p>
          <p>
            +<br />+<br />+<br />+<br />+<br />+<br />
          </p>
          <p>Nachteile:</p>
          <p>
            -<br />-<br />
          </p>
          <hr />
          <p className="price">00,00€/Monat</p>
        </div>

        <div className="license-card" onClick={() => navigate("/licence-view")}>
          <h3>Professional Planner</h3>
          <p>
            Laufende Lizenzen: <strong>3</strong>
          </p>
          <hr />
          <p>Vorteile:</p>
          <p>
            +<br />+<br />+<br />+<br />+<br />+<br />+<br />+
          </p>
          <p>Nachteile:</p>
          <hr />
          <p className="price">00,00€/Monat</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
