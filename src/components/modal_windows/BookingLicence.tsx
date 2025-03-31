import "./BookingLicence.css";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { bookLicenses } from "../apiServices"; // API Call importieren
import { useParams } from "react-router-dom";

interface BookingLicenceProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingLicence({
  isOpen,
  onClose,
}: BookingLicenceProps) {
  const [count, setCount] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const { licenseType } = useParams(); // Holt den Lizenztyp aus der URL

  if (!isOpen) return null;

  const increase = () => setCount(count + 1);
  const decrease = () => setCount(count > 1 ? count - 1 : 1);
  const toggleCheckbox = () => setIsChecked(!isChecked);

  const handleBooking = async () => {
    if (!isChecked) return;

    if (!licenseType) {
      alert("Lizenztyp ist nicht verfügbar.");
      return;
    }

    try {
      await bookLicenses(licenseType, count);
      alert(`${count} Lizenzen wurden erfolgreich gebucht!`);
      onClose();
    } catch (error) {
      console.error("Fehler beim Buchen der Lizenzen:", error);
      alert("Fehler beim Buchen. Bitte erneut versuchen.");
    }
  };

  return (
    <div className="booking-modal-overlay" onClick={onClose}>
      <div
        className="booking-modal-container"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="booking-modal-header">
          <p>Bitte Anzahl zu buchender Lizenzen eingeben:</p>
          <button className="booking-close-button" onClick={onClose}>
            🗙
          </button>
        </div>
        <div className="counter-container">
          <Button className="counter-button" onClick={decrease}>
            -
          </Button>
          <span className="counter-value">{count}</span>
          <Button className="counter-button" onClick={increase}>
            +
          </Button>
        </div>

        <div className="booking-checkbox-container" onClick={toggleCheckbox}>
          <div className={`booking-checkbox ${isChecked ? "checked" : ""}`}>
            {isChecked ? "✔" : ""}
          </div>
          <span>Ich erkläre mich mit den Lizenzbedingungen einverstanden.</span>
        </div>

        {isChecked ? (
          <Button
            className="confirm-button"
            colorScheme="blue"
            onClick={handleBooking}
            isDisabled={!isChecked}
          >
            Bestätigen
          </Button>
        ) : (
          <div className="confirm-button-disabled">Bestätigen</div>
        )}
      </div>
    </div>
  );
}
