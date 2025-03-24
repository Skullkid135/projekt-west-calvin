import { useState } from "react";
import LicenceBox from "./LicenceBox";
import TerminateLicence from "./modal_windows/TerminateLicence";
import BookingLicence from "./modal_windows/BookingLicence";
import "./LicenceView.css";
import { Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const LicenceView: React.FC = () => {
  const [selectedLicences, setSelectedLicences] = useState<string[]>([]);
  const [isTerminateModalOpen, setTerminateModalOpen] = useState(false);
  const [isBookingModalOpen, setBookingModalOpen] = useState(false);
  const { type } = useParams();

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
      <header className="view-title">
        <h1>{type?.charAt(0).toUpperCase() + type?.slice(1)} Planner</h1>
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

        {/* Rechte Spalte */}
        <div className="sidebar">
          <Button
            className="sidebar-box booking"
            variant="solid"
            onClick={() => setBookingModalOpen(true)}
          >
            Neue Lizenzen Buchen
          </Button>

          <Button
            className="sidebar-box terminate"
            variant="solid"
            onClick={() => setTerminateModalOpen(true)}
          >
            Ausgewählte Lizenzen kündigen
          </Button>

          <div className="sidebar-box total">
            <h2>
              Gesamtkosten für {type?.charAt(0).toUpperCase() + type?.slice(1)}{" "}
              Licences:
            </h2>
            <p>0,00€ / Monat</p>
          </div>
        </div>
      </div>

      <TerminateLicence
        isOpen={isTerminateModalOpen}
        onClose={() => setTerminateModalOpen(false)}
      />

      <BookingLicence
        isOpen={isBookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </div>
  );
};

export default LicenceView;
