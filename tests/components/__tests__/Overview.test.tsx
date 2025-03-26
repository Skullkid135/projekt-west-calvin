import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import Overview from "../../../src/components/Overview";
import React from "react";

describe("Overview Component", () => {
  const mockNavigate = vi.fn();

  /* it("renders the component correctly", () => {
    render(
      <MemoryRouter>
        <Overview />
      </MemoryRouter>
    );

    // Teste, ob der Titel der Übersicht gerendert wird
    expect(screen.getByText("Lizenz Übersicht")).toBeInTheDocument();

    // Teste, ob die Lizenzkarten angezeigt werden
    expect(screen.getByText("Free Trial")).toBeInTheDocument();
    expect(screen.getByText("Base Planner")).toBeInTheDocument();
    expect(screen.getByText("Professional Planner")).toBeInTheDocument();

    // Teste, ob die Preise angezeigt werden
    expect(screen.getByText("Kostenlos")).toBeInTheDocument();
    expect(screen.getByText("00,00€/Monat")).toBeInTheDocument();
  });*/

  /*it("navigates to the correct route when clicking on a license card", () => {
    // Mock der navigate-Funktion
    const navigate = vi.fn();

    render(
      <MemoryRouter>
        <Overview />
      </MemoryRouter>
    );

    // Klick auf die "Free Trial"-Karte
    fireEvent.click(screen.getByText("Free Trial"));
    expect(navigate).toHaveBeenCalledWith("/licence-view/free");

    // Klick auf die "Base Planner"-Karte
    fireEvent.click(screen.getByText("Base Planner"));
    expect(navigate).toHaveBeenCalledWith("/licence-view/base");

    // Klick auf die "Professional Planner"-Karte
    fireEvent.click(screen.getByText("Professional Planner"));
    expect(navigate).toHaveBeenCalledWith("/licence-view/professional");
  });*/

  /* it("displays the correct number of running licenses for each plan", () => {
    render(
      <MemoryRouter>
        <Overview />
      </MemoryRouter>
    );

    // Prüfe, ob der Text "Laufende Lizenzen:" gefolgt von einer Zahl existiert
    const freePlanLicenses = screen.getByText(/Laufende Lizenzen: 7/);
    const basePlanLicenses = screen.getByText(/Laufende Lizenzen: 5/);
    const professionalPlanLicenses = screen.getByText(/Laufende Lizenzen: 3/);

    // Teste, ob der richtige Text für jede Lizenz vorhanden ist
    expect(freePlanLicenses).toBeInTheDocument();
    expect(basePlanLicenses).toBeInTheDocument();
    expect(professionalPlanLicenses).toBeInTheDocument();
  });*/

  it("displays the correct advantages and disadvantages for each plan", () => {
    render(
      <MemoryRouter>
        {" "}
        {/* Wrape die Komponente in den MemoryRouter */}
        <Overview />
      </MemoryRouter>
    );

    // Prüfe, ob der Text "Vorteile:" für jedes Lizenz-Modell vorhanden ist
    const advantagesText = screen.getAllByText("Vorteile:");
    expect(advantagesText).toHaveLength(3); // Es gibt 3 Karten, also 3 Instanzen von "Vorteile:"

    // Prüfe, ob der Text "Nachteile:" für jedes Lizenz-Modell vorhanden ist
    const disadvantagesText = screen.getAllByText("Nachteile:");
    expect(disadvantagesText).toHaveLength(3); // Es gibt 3 Karten, also 3 Instanzen von "Nachteile:"
  });
});
