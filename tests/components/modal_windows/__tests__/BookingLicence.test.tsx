import { render, screen, fireEvent } from "@testing-library/react";
import BookingLicence from "../../../../src/components/modal_windows/BookingLicence";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

describe("BookingLicence Component", () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
  };

  it("renders the modal when isOpen is true", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <BookingLicence {...defaultProps} />
      </ChakraProvider>
    );

    expect(
      screen.getByText("Bitte Anzahl zu buchender Lizenzen eingeben:")
    ).toBeInTheDocument();
  });

  it("does not render the modal when isOpen is false", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <BookingLicence {...defaultProps} isOpen={false} />
      </ChakraProvider>
    );

    expect(
      screen.queryByText("Bitte Anzahl zu buchender Lizenzen eingeben:")
    ).not.toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <BookingLicence {...defaultProps} />
      </ChakraProvider>
    );

    const closeButton = screen.getByRole("button", { name: /🗙/i });
    fireEvent.click(closeButton);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("calls onClose when the overlay is clicked", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <BookingLicence {...defaultProps} />
      </ChakraProvider>
    );

    const overlay = screen
      .getByText("Bitte Anzahl zu buchender Lizenzen eingeben:")
      .closest(".booking-modal-overlay")!;
    fireEvent.click(overlay);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  /* it("does not call onClose when clicking inside the modal", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <BookingLicence {...defaultProps} />
      </ChakraProvider>
    );

    const modalContainer = screen
      .getByText("Bitte Anzahl zu buchender Lizenzen eingeben:")
      .closest(".booking-modal-container")!;
    fireEvent.click(modalContainer);
    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });*/

  it("increases the count when clicking the + button", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <BookingLicence {...defaultProps} />
      </ChakraProvider>
    );

    const increaseButton = screen.getByText("+");
    const counterValue = screen.getByText("1");

    fireEvent.click(increaseButton);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("decreases the count when clicking the - button but not below 1", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <BookingLicence {...defaultProps} />
      </ChakraProvider>
    );

    const decreaseButton = screen.getByText("-");
    const counterValue = screen.getByText("1");

    fireEvent.click(decreaseButton);
    expect(screen.getByText("1")).toBeInTheDocument(); // Wert bleibt bei 1
  });

  it("toggles the checkbox when clicked", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <BookingLicence {...defaultProps} />
      </ChakraProvider>
    );

    const checkboxContainer = screen
      .getByText("Ich erkläre mich mit den Lizenzbedingungen einverstanden.")
      .closest(".booking-checkbox-container")!;

    fireEvent.click(checkboxContainer);
    expect(screen.getByText("✔")).toBeInTheDocument();

    fireEvent.click(checkboxContainer);
    expect(screen.queryByText("✔")).not.toBeInTheDocument();
  });

  it("disables the confirm button when the checkbox is unchecked", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <BookingLicence {...defaultProps} />
      </ChakraProvider>
    );

    expect(screen.getByText("Bestätigen")).toHaveClass(
      "confirm-button-disabled"
    );
  });

  it("enables the confirm button when the checkbox is checked", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <BookingLicence {...defaultProps} />
      </ChakraProvider>
    );

    const checkboxContainer = screen
      .getByText("Ich erkläre mich mit den Lizenzbedingungen einverstanden.")
      .closest(".booking-checkbox-container")!;

    fireEvent.click(checkboxContainer);
    expect(screen.getByRole("button", { name: /Bestätigen/i })).toBeEnabled();
  });

  it("calls onClose when clicking the confirm button", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <BookingLicence {...defaultProps} />
      </ChakraProvider>
    );

    const checkboxContainer = screen
      .getByText("Ich erkläre mich mit den Lizenzbedingungen einverstanden.")
      .closest(".booking-checkbox-container")!;

    fireEvent.click(checkboxContainer); // Checkbox aktivieren
    const confirmButton = screen.getByRole("button", { name: /Bestätigen/i });

    fireEvent.click(confirmButton);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
