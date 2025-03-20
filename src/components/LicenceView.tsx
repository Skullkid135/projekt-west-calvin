import { useState } from "react";
import LicenceBox from "./LicenceBox";
import "./LicenceView.css";

const LicenceView: React.FC = () => {
  const [selectedLicences, setSelectedLicences] = useState<string[]>([]);

  const licences = [
    {
      keyId: "X9L7Q-T5Z2D-Y8M3K",
      bookingDate: "01.01.2025",
      nextBillingDate: "31.01.2025",
    },
    {
      keyId: "T2X9K-Y7L5D-Q8V3M",
      bookingDate: "01.01.2025",
      nextBillingDate: "31.01.2025",
      expiryDate: "01.02.2025",
    },
    {
      keyId: "V8T5Q-X7L9D-Y3M2K",
      bookingDate: "01.01.2025",
      nextBillingDate: "31.01.2025",
    },
    {
      keyId: "L7X9T-Q2M5D-Y8V3K",
      bookingDate: "01.01.2025",
      nextBillingDate: "31.01.2025",
      expiryDate: "01.02.2025",
    },
    {
      keyId: "X9L7Q-T5Z2D-Y8M3K",
      bookingDate: "01.01.2025",
      nextBillingDate: "31.01.2025",
    },
    {
      keyId: "T2X9K-Y7L5D-Q8V3M",
      bookingDate: "01.01.2025",
      nextBillingDate: "31.01.2025",
      expiryDate: "01.02.2025",
    },
    {
      keyId: "V8T5Q-X7L9D-Y3M2K",
      bookingDate: "01.01.2025",
      nextBillingDate: "31.01.2025",
    },
    {
      keyId: "L7X9T-Q2M5D-Y8V3K",
      bookingDate: "01.01.2025",
      nextBillingDate: "31.01.2025",
      expiryDate: "01.02.2025",
    },
    {
      keyId: "X9L7Q-T5Z2D-Y8M3K",
      bookingDate: "01.01.2025",
      nextBillingDate: "31.01.2025",
    },
    {
      keyId: "T2X9K-Y7L5D-Q8V3M",
      bookingDate: "01.01.2025",
      nextBillingDate: "31.01.2025",
      expiryDate: "01.02.2025",
    },
    {
      keyId: "V8T5Q-X7L9D-Y3M2K",
      bookingDate: "01.01.2025",
      nextBillingDate: "31.01.2025",
    },
    {
      keyId: "L7X9T-Q2M5D-Y8V3K",
      bookingDate: "01.01.2025",
      nextBillingDate: "31.01.2025",
      expiryDate: "01.02.2025",
    },
    {
      keyId: "X9L7Q-T5Z2D-Y8M3K",
      bookingDate: "01.01.2025",
      nextBillingDate: "31.01.2025",
    },
    {
      keyId: "T2X9K-Y7L5D-Q8V3M",
      bookingDate: "01.01.2025",
      nextBillingDate: "31.01.2025",
      expiryDate: "01.02.2025",
    },
    {
      keyId: "V8T5Q-X7L9D-Y3M2K",
      bookingDate: "01.01.2025",
      nextBillingDate: "31.01.2025",
    },
    {
      keyId: "L7X9T-Q2M5D-Y8V3K",
      bookingDate: "01.01.2025",
      nextBillingDate: "31.01.2025",
      expiryDate: "01.02.2025",
    },
    {
      keyId: "X9L7Q-T5Z2D-Y8M3K",
      bookingDate: "01.01.2025",
      nextBillingDate: "31.01.2025",
    },
    {
      keyId: "T2X9K-Y7L5D-Q8V3M",
      bookingDate: "01.01.2025",
      nextBillingDate: "31.01.2025",
      expiryDate: "01.02.2025",
    },
    {
      keyId: "V8T5Q-X7L9D-Y3M2K",
      bookingDate: "01.01.2025",
      nextBillingDate: "31.01.2025",
    },
    {
      keyId: "L7X9T-Q2M5D-Y8V3K",
      bookingDate: "01.01.2025",
      nextBillingDate: "31.01.2025",
      expiryDate: "01.02.2025",
    },
  ];

  const toggleSelection = (keyId: string) => {
    setSelectedLicences((prev) =>
      prev.includes(keyId)
        ? prev.filter((id) => id !== keyId)
        : [...prev, keyId]
    );
  };

  return (
    <div className="licence-view">
      <header className="viewHeader">
        <h1>Base Planner</h1>
      </header>

      <div className="content">
        {/* Linke Spalte mit Lizenzboxen */}
        <div className="licence-container">
          {licences.map((licence) => (
            <LicenceBox
              key={licence.keyId}
              keyId={licence.keyId}
              bookingDate={licence.bookingDate}
              nextBillingDate={licence.nextBillingDate}
              expiryDate={licence.expiryDate}
              selected={selectedLicences.includes(licence.keyId)}
              onSelect={() => toggleSelection(licence.keyId)}
            />
          ))}
        </div>

        <div className="sidebar">
          <div className="sidebar-box booking">
            <h2>Neue Lizenzen Buchen</h2>
          </div>
          <div className="sidebar-box terminate">
            <h2>Ausgewählte Lizenzen kündigen</h2>
          </div>
          <div className="sidebar-box total">
            <h2>Gesamtkosten für Professional Licences:</h2>
            <p>0,00€ / Monat</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LicenceView;
