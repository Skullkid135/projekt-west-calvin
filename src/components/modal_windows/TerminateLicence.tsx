import "./TerminateLicence.css";
import { Button } from "@chakra-ui/react";

interface TerminateLicenceProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TerminateLicence({
  isOpen,
  onClose,
}: TerminateLicenceProps) {
  if (!isOpen) return null;

  return (
    <div className="terminate-modal-overlay" onClick={onClose}>
      <div
        className="terminate-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="terminate-modal-header">
          <h2>Ausgewählte Lizenzen kündigen?</h2>
          <button className="terminate-close-button" onClick={onClose}>
            🗙
          </button>
        </div>
        <Button className="confirm-termination" onClick={onClose}>
          Ja, alle ausgewählten Lizenzen kündigen
        </Button>
      </div>
    </div>
  );
}
