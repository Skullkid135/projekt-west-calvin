import { render, screen, fireEvent } from "@testing-library/react";
import LicenceBox from "../../../src/components/LicenceBox";
import { describe, it, expect, vi } from "vitest";
import React from "react";

describe("LicenceBox Component", () => {
  const defaultProps = {
    keyId: "ABCDE-12345-VWXYZ",
    bookingDate: "2024-03-25",
    nextBillingDate: "2024-04-25",
    expiryDate: "2025-03-25",
    selected: false,
    onSelect: vi.fn(),
  };

  it("renders the component with provided props", () => {
    render(<LicenceBox {...defaultProps} />);
    expect(screen.getByText("ABCDE-12345-VWXYZ")).toBeInTheDocument();
    expect(screen.getByText("Buchungsdatum:")).toBeInTheDocument();
    expect(screen.getByText("Nächstes Abrechnungsdatum:")).toBeInTheDocument();
    expect(screen.getByText("Ablaufdatum:")).toBeInTheDocument();
  });

  it("calls onSelect when clicked", () => {
    render(<LicenceBox {...defaultProps} />);
    const box = screen.getByText("ABCDE-12345-VWXYZ").closest(".licence-box");
    fireEvent.click(box);
    expect(defaultProps.onSelect).toHaveBeenCalled();
  });

  it("shows checkmark when selected is true", () => {
    render(<LicenceBox {...defaultProps} selected={true} />);
    expect(screen.getByText("✔")).toBeInTheDocument();
  });

  it("shows empty circle when selected is false", () => {
    render(<LicenceBox {...defaultProps} selected={false} />);
    expect(screen.getByText("⚪")).toBeInTheDocument();
  });

  it("does not render expiry date if not provided", () => {
    render(<LicenceBox {...defaultProps} expiryDate={undefined} />);
    expect(screen.queryByText("Ablaufdatum:")).not.toBeInTheDocument();
  });
});
