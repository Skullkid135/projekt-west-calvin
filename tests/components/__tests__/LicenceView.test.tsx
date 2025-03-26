import { render, screen, fireEvent } from "@testing-library/react";
import LicenceView from "../../../src/components/LicenceView";
import { describe, it, expect } from "vitest";
import React from "react";
import { BrowserRouter } from "react-router-dom"; // Da `useParams` verwendet wird
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

describe("LicenceView Component", () => {
  it("renders all licences", () => {
    render(
      <BrowserRouter>
        <ChakraProvider value={defaultSystem}>
          <LicenceView />
        </ChakraProvider>
      </BrowserRouter>
    );
    // Teste, ob alle Lizenzen gerendert werden
    expect(screen.getByText("X9L7Q-T5Z2D-Y8M3K")).toBeInTheDocument();
    expect(screen.getByText("T2X9K-Y7L5D-Q8V3M")).toBeInTheDocument();
    expect(screen.getByText("V8T5Q-X7L9D-Y3M2K")).toBeInTheDocument();
    expect(screen.getByText("L7X9T-Q2M5D-Y8V3K")).toBeInTheDocument();
  });

  it("should toggle selection on click", () => {
    render(
      <BrowserRouter>
        <ChakraProvider value={defaultSystem}>
          <LicenceView />
        </ChakraProvider>
      </BrowserRouter>
    );

    const licenceBox = screen
      .getByText("X9L7Q-T5Z2D-Y8M3K")
      .closest(".licence-box");
    fireEvent.click(licenceBox);

    // Teste, ob die Box als ausgewählt angezeigt wird
    expect(screen.getByText("✔")).toBeInTheDocument();
  });

  it("opens the booking modal when 'Neue Lizenzen Buchen' button is clicked", () => {
    render(
      <BrowserRouter>
        <ChakraProvider value={defaultSystem}>
          <LicenceView />
        </ChakraProvider>
      </BrowserRouter>
    );

    const bookingButton = screen.getByText("Neue Lizenzen Buchen");
    fireEvent.click(bookingButton);

    // Teste, ob das BookingModal geöffnet wurde
    expect(screen.getByText("Bestätigen")).toBeInTheDocument(); // Angenommene Modal-Bezeichnung
  });

  /*  it("opens the terminate modal when 'Ausgewählte Lizenzen kündigen' button is clicked", () => {
    render(
      <BrowserRouter>
        <ChakraProvider value={defaultSystem}>
          <LicenceView />
        </ChakraProvider>
      </BrowserRouter>
    );

    const terminateButton = screen.getByText("Ausgewählte Lizenzen kündigen");
    fireEvent.click(terminateButton);

    // Teste, ob das TerminateModal geöffnet wurde
    expect(screen.getByText("kündigen")).toBeInTheDocument();
  });*/

  /* it("renders total cost correctly", () => {
    render(
      <BrowserRouter>
        <ChakraProvider value={defaultSystem}>
          <LicenceView />
        </ChakraProvider>
      </BrowserRouter>
    );

    expect(
      screen.getByText("Gesamtkosten für Planner Licences:")
    ).toBeInTheDocument();
    expect(screen.getByText("0,00€ / Monat")).toBeInTheDocument();
  });*/
});
