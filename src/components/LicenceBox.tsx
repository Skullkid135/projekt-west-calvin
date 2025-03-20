import React from "react";
import "./LicenceBox.css";

interface LicenceBoxProps {
  keyId: string;
  bookingDate: string;
  nextBillingDate: string;
  expiryDate?: string;
  selected: boolean;
  onSelect: () => void;
}

const LicenceBox: React.FC<LicenceBoxProps> = ({
  keyId,
  bookingDate,
  nextBillingDate,
  expiryDate,
  selected,
  onSelect,
}) => {
  return (
    <div
      className={`licence-box ${selected ? "selected" : ""}`}
      onClick={onSelect}
    >
      <div className="checkbox">{selected ? "✔" : "⚪"}</div>
      <div className="licence-info">
        <p className="licence-key">{keyId}</p>
      </div>
      <div className="licence-details">
        <p>
          <strong>Buchungsdatum:</strong> {bookingDate}
        </p>
        <p>
          <strong>Nächstes Abrechungsdatum:</strong> {nextBillingDate}
        </p>
        {expiryDate && (
          <p className="expiry">
            <strong>Ablaufdatum:</strong> {expiryDate}
          </p>
        )}
      </div>
    </div>
  );
};

export default LicenceBox;
