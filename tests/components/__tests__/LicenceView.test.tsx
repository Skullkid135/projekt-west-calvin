import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LicenceView from "../../../src/components/LicenceView";
import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { fetchLicensesByType } from "../../../src/components/apiServices";

import "@testing-library/jest-dom";

// Mock für `useParams`, damit der Lizenztyp definiert ist
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ type: "base" }), // Simuliere den "base" Lizenztyp
  };
});

// Mock für API-Call `fetchLicensesByType`
vi.mock("../../../src/components/apiServices", () => ({
  fetchLicensesByType: vi.fn(),
  terminateLicenses: vi.fn(),
}));

describe("LicenceView Component", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Mock-Calls zurücksetzen

    // Testdaten für Lizenzen
    fetchLicensesByType.mockResolvedValue([
      {
        keyId: "ABC123",
        bookingDate: "2024-01-01",
        nextBillingDate: "2024-02-01",
        expiryDate: "2024-12-31",
        type: "base",
      },
      {
        keyId: "XYZ789",
        bookingDate: "2024-02-01",
        nextBillingDate: "2024-03-01",
        expiryDate: "2025-02-01",
        type: "base",
      },
    ]);
  });

  it("renders the component and displays licenses", async () => {
    render(
      <BrowserRouter>
        <ChakraProvider value={defaultSystem}>
          <LicenceView />
        </ChakraProvider>
      </BrowserRouter>
    );

    // Warte, bis API-Daten geladen sind
    await waitFor(() => {
      expect(screen.getByText("Base Planner")).toBeInTheDocument();
      expect(screen.getByText("ABC123")).toBeInTheDocument();
      expect(screen.getByText("XYZ789")).toBeInTheDocument();
    });
  });

  it("toggles selection on click", async () => {
    render(
      <BrowserRouter>
        <ChakraProvider value={defaultSystem}>
          <LicenceView />
        </ChakraProvider>
      </BrowserRouter>
    );

    await waitFor(() => screen.getByText("ABC123")); // Warte, bis die Lizenz geladen ist

    const licenceBox = screen.getByText("ABC123").closest(".licence-box");
    expect(licenceBox).not.toBeNull();

    if (licenceBox) {
      fireEvent.click(licenceBox);
      expect(licenceBox.classList.contains("selected")).toBe(true); // Prüfe, ob die Klasse gesetzt wird
    }
  });

  /* it("opens the booking modal when 'Neue Lizenzen Buchen' button is clicked", async () => {
    render(
      <BrowserRouter>
        <ChakraProvider value={defaultSystem}>
          <LicenceView />
        </ChakraProvider>
      </BrowserRouter>
    );

    const bookingButton = screen.getByText("Neue Lizenzen Buchen");
    fireEvent.click(bookingButton);

    // Überprüfe, ob das Modal geöffnet wurde
    expect(screen.getByText("Neue Lizenz buchen")).toBeInTheDocument(); // Angenommener Modal-Titel
  });*/

  /* it("opens the terminate modal when 'Ausgewählte Lizenzen kündigen' button is clicked", async () => {
    render(
      <BrowserRouter>
        <ChakraProvider value={defaultSystem}>
          <LicenceView />
        </ChakraProvider>
      </BrowserRouter>
    );

    const terminateButton = screen.getByText("Ausgewählte Lizenzen kündigen");
    fireEvent.click(terminateButton);

    // Überprüfe, ob das Kündigungsmodal geöffnet wurde
    expect(screen.getByText("Lizenzen kündigen")).toBeInTheDocument();
  });*/

  /*it("calculates and displays the total cost correctly", async () => {
    render(
      <BrowserRouter>
        <ChakraProvider value={defaultSystem}>
          <LicenceView />
        </ChakraProvider>
      </BrowserRouter>
    );

    await waitFor(() => screen.getByText("Gesamtkosten für Base Licences:"));

    expect(screen.getByText("20 € / Monat")).toBeInTheDocument(); // 2 Base-Lizenzen à 10€
  });*/
});
