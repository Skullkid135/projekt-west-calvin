import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLicenseCounts } from "./apiServices";
import "./Overview.css";

const Overview: React.FC = () => {
  const navigate = useNavigate();
  const [licenseCounts, setLicenseCounts] = useState<{ [key: string]: number }>(
    {
      free: 0,
      base: 0,
      professional: 0,
    }
  );

  useEffect(() => {
    async function loadLicenseCounts() {
      try {
        const data = await fetchLicenseCounts();
        setLicenseCounts(data);
      } catch (error) {
        console.error("Fehler beim Laden der Lizenzanzahlen:", error);
      }
    }
    loadLicenseCounts();
  }, []);

  return (
    <div className="overview-container">
      <header className="overview-title">
        <h1>Lizenz Übersicht</h1>
      </header>
      <div className="license-grid">
        <div
          className="license-card"
          onClick={() => navigate("/licence-view/free")}
        >
          <h3>Free Trial</h3>
          <div className="license-details">
            <p className="license-count">
              Laufende Lizenzen: <strong>12</strong>
            </p>
            <div className="divider"></div>
            <div className="advantages">
              <h4>Vorteile:</h4>
              <ul>
                <li>+ Keine Verpflichtung</li>
                <li>+ Einfach zu testen</li>
              </ul>
            </div>
            <div className="disadvantages">
              <h4>Nachteile:</h4>
              <ul>
                <li>- Begrenzte Funktionen</li>
                <li>- Kein Support</li>
                <li>- Werbung</li>
              </ul>
            </div>
            <div className="divider"></div>
            <p className="price">Kostenlos</p>
          </div>
        </div>

        <div
          className="license-card"
          onClick={() => navigate("/licence-view/base")}
        >
          <h3>Base Planner</h3>
          <div className="license-details">
            <p className="license-count">
              Laufende Lizenzen: <strong>5</strong>
            </p>
            <div className="divider"></div>
            <div className="advantages">
              <h4>Vorteile:</h4>
              <ul>
                <li>+ Grundfunktionen</li>
                <li>+ Basis-Support</li>
                <li>+ Werbungs frei</li>
              </ul>
            </div>
            <div className="disadvantages">
              <h4>Nachteile:</h4>
              <ul>
                <li>- Eingeschränkter Katalog</li>
                <li>- Begrenzte Planungsplätze</li>
              </ul>
            </div>
            <div className="divider"></div>
            <p className="price">29,99€/Monat</p>
          </div>
        </div>

        <div
          className="license-card"
          onClick={() => navigate("/licence-view/professional")}
        >
          <h3>Professional Planner</h3>
          <div className="license-details">
            <p className="license-count">
              Laufende Lizenzen: <strong>5</strong>
            </p>
            <div className="divider"></div>
            <div className="advantages">
              <h4>Vorteile:</h4>
              <ul>
                <li>+ Alle Funktionen</li>
                <li>+ Premium-Support</li>
                <li>+ Werbungs frei</li>
                <li>+ Vollen Katalog</li>
                <li>+ Unbegrenzte Planungsplätze</li>
                <li>+ Extra Datenredundanz</li>
              </ul>
            </div>
            <div className="disadvantages">
              <h4></h4>
              <ul>
                {/* Falls es keine Nachteile gibt, kann dieser Bereich entfernt oder leer bleiben */}
              </ul>
            </div>
            <div className="divider"></div>
            <p className="price">69,99€/Monat</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
