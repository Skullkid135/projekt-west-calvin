import { useState, useEffect } from "react";
import LicenceBox from "./LicenceBox";
import TerminateLicence from "./modal_windows/TerminateLicence";
import BookingLicence from "./modal_windows/BookingLicence";
import { Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { fetchLicensesByType, terminateLicenses } from "./apiServices";
import "./LicenceView.css"; // Import der CSS-Datei für LicenceView

const LicenceView: React.FC = () => {
  const [selectedLicences, setSelectedLicences] = useState<string[]>([]);
  const [isTerminateModalOpen, setTerminateModalOpen] = useState(false);
  const [isBookingModalOpen, setBookingModalOpen] = useState(false);
  const { type } = useParams();

  const [licences, setLicences] = useState<
    {
      keyId: string;
      bookingDate: string;
      nextBillingDate: string;
      expiryDate?: string;
      type: string; // Lizenztyp (free, base, professional)
    }[]
  >([]);

  // Preisstruktur für Lizenzen
  const licensePrices: { [key: string]: number } = {
    free: 0,
    base: 10,
    professional: 20,
  };

  useEffect(() => {
    async function loadLicenses() {
      try {
        const data = await fetchLicensesByType(type); // Fetch Lizenzen basierend auf dem Typ
        setLicences(data);
      } catch (error) {
        console.error("Fehler beim Laden der Lizenzen:", error);
      }
    }
    loadLicenses();
  }, [type]);

  const toggleSelection = (keyId: string) => {
    setSelectedLicences((prev) =>
      prev.includes(keyId)
        ? prev.filter((id) => id !== keyId)
        : [...prev, keyId]
    );
  };

  const handleTerminateLicenses = async () => {
    try {
      const result = await terminateLicenses(selectedLicences);
      console.log("Lizenzen erfolgreich gekündigt:", result);
      setLicences((prev) =>
        prev.filter((licence) => !selectedLicences.includes(licence.keyId))
      );
      setSelectedLicences([]); // Auswahl zurücksetzen
    } catch (error) {
      console.error("Fehler beim Kündigen der Lizenzen:", error);
    }
  };

  // Berechnung der Gesamtkosten für die ausgewählten Lizenzen
  const calculateTotalCost = () => {
    return licences
      .filter((licence) => selectedLicences.includes(licence.keyId))
      .reduce((total, licence) => {
        const price = licensePrices[licence.type] || 0;
        return total + price; // Addiere den Preis zur Gesamtkosten
      }, 0);
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
            <p>{calculateTotalCost()} € / Monat</p>
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
