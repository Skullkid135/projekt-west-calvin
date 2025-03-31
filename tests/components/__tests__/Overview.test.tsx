import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Overview from "../../../src/components/Overview";
import React from "react";

// Mock der API-Funktion
vi.mock("../../../src/components/apiServices", () => ({
  fetchLicenseCounts: vi.fn(() =>
    Promise.resolve({
      free: 7,
      base: 5,
      professional: 3,
    })
  ),
}));

// Mock für useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Overview Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the component correctly", async () => {
    render(
      <MemoryRouter>
        <Overview />
      </MemoryRouter>
    );

    // Teste, ob der Titel der Übersicht gerendert wird
    expect(await screen.findByText("Lizenz Übersicht")).toBeInTheDocument();

    // Teste, ob die Lizenzkarten angezeigt werden
    expect(screen.getByText("Free Trial")).toBeInTheDocument();
    expect(screen.getByText("Base Planner")).toBeInTheDocument();
    expect(screen.getByText("Professional Planner")).toBeInTheDocument();

    // Teste, ob die Preise angezeigt werden
    expect(screen.getByText("Kostenlos")).toBeInTheDocument();
    expect(screen.getByText("29,99€/Monat")).toBeInTheDocument();
    expect(screen.getByText("69,99€/Monat")).toBeInTheDocument();
  });

  /* it("displays the correct number of running licenses for each plan", async () => {
    render(
      <MemoryRouter>
        <Overview />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Laufende Lizenzen:/)).toBeInTheDocument();
      expect(
        screen.getByText((content) => content.includes("7"))
      ).toBeInTheDocument();
      expect(
        screen.getByText((content) => content.includes("5"))
      ).toBeInTheDocument();
      expect(
        screen.getByText((content) => content.includes("3"))
      ).toBeInTheDocument();
    });
  });*/

  it("displays the correct advantages and disadvantages for each plan", async () => {
    render(
      <MemoryRouter>
        <Overview />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByText("Vorteile:")).toHaveLength(3);
      expect(screen.getAllByText("Nachteile:")).toHaveLength(2); // Professional hat keine Nachteile
    });
  });

  it("navigates to the correct route when clicking on a license card", async () => {
    render(
      <MemoryRouter>
        <Overview />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Free Trial")).toBeInTheDocument();
    });

    // Klick auf die "Free Trial"-Karte
    fireEvent.click(screen.getByText("Free Trial"));
    expect(mockNavigate).toHaveBeenCalledWith("/licence-view/free");

    // Klick auf die "Base Planner"-Karte
    fireEvent.click(screen.getByText("Base Planner"));
    expect(mockNavigate).toHaveBeenCalledWith("/licence-view/base");

    // Klick auf die "Professional Planner"-Karte
    fireEvent.click(screen.getByText("Professional Planner"));
    expect(mockNavigate).toHaveBeenCalledWith("/licence-view/professional");
  });
});
