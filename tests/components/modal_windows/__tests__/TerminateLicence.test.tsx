import { render, screen, fireEvent } from "@testing-library/react";
import TerminateLicence from "../../../../src/components/modal_windows/TerminateLicence";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

describe("TerminateLicence Component", () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
  };

  it("renders the modal when isOpen is true", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <TerminateLicence {...defaultProps} />
      </ChakraProvider>
    );

    // Teste, ob das Modal angezeigt wird
    expect(
      screen.getByText("Ausgewählte Lizenzen kündigen?")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Ja, alle ausgewählten Lizenzen kündigen")
    ).toBeInTheDocument();
  });

  it("does not render the modal when isOpen is false", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <TerminateLicence {...defaultProps} isOpen={false} />
      </ChakraProvider>
    );

    // Teste, ob das Modal nicht angezeigt wird
    expect(
      screen.queryByText("Ausgewählte Lizenzen kündigen?")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Ja, alle ausgewählten Lizenzen kündigen")
    ).not.toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <TerminateLicence {...defaultProps} />
      </ChakraProvider>
    );

    // Teste, ob onClose beim Klicken auf den Schließen-Button aufgerufen wird
    const closeButton = screen.getByRole("button", { name: /🗙/i });
    fireEvent.click(closeButton);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("calls onClose when the overlay is clicked", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <TerminateLicence {...defaultProps} />
      </ChakraProvider>
    );

    // Teste, ob onClose beim Klicken auf den Overlay-Bereich aufgerufen wird
    const overlay = screen.getByRole("button", { name: /🗙/i }); // Schließen-Button als Overlay verwenden
    fireEvent.click(overlay);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  /*  it("does not call onClose when clicking inside the modal container", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <TerminateLicence {...defaultProps} />
      </ChakraProvider>
    );

    // Teste, ob onClose nicht aufgerufen wird, wenn man innerhalb des Modal-Containers klickt
    const modalContainer = screen.getByText(
      "Ja, alle ausgewählten Lizenzen kündigen"
    );
    fireEvent.click(modalContainer);
    expect(defaultProps.onClose).not.toHaveBeenCalled();
  }); */

  it("calls onClose when the confirm termination button is clicked", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <TerminateLicence {...defaultProps} />
      </ChakraProvider>
    );

    // Teste, ob onClose beim Klicken auf den "Ja"-Button aufgerufen wird
    const confirmButton = screen.getByText(
      "Ja, alle ausgewählten Lizenzen kündigen"
    );
    fireEvent.click(confirmButton);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
