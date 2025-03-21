import "./BookingLicence.css";
import { Button } from "@chakra-ui/react";
import { useState } from "react";

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

  if (!isOpen) return null;

  const increase = () => setCount(count + 1);
  const decrease = () => setCount(count > 1 ? count - 1 : 1);
  const toggleCheckbox = () => setIsChecked(!isChecked);

  return (
    <div className="booking-modal-overlay" onClick={onClose}>
      <div
        className="booking-modal-container"
        onClick={(e) => e.stopPropagation()}
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
            onClick={onClose}
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
