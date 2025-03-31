import {
  fetchLicenseCounts,
  fetchLicensesByType,
  bookLicenses,
  terminateLicenses,
} from "../../../src/components/apiServices";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

describe("fetchLicenseCounts", () => {
  beforeEach(() => {
    // Mock der globalen fetch-Funktion vor jedem Test
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks(); // Aufräumen nach jedem Test
  });

  it("should return the correct license counts on success", async () => {
    // Simuliere eine erfolgreiche Antwort von fetch
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ free: 5, base: 10, professional: 2 }),
    });

    const result = await fetchLicenseCounts();
    expect(result).toEqual({ free: 5, base: 10, professional: 2 });
  });

  it("should return default values when API fails", async () => {
    // Simuliere einen Fehler bei fetch
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: "Error",
      json: async () => ({ free: 0, base: 0, professional: 0 }),
    });

    const result = await fetchLicenseCounts();
    expect(result).toEqual({ free: 0, base: 0, professional: 0 });
  });
});

describe("fetchLicensesByType", () => {
  beforeEach(() => {
    global.fetch = vi.fn(); // Mock der globalen fetch-Funktion
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return licenses for the given type", async () => {
    // Simuliere eine erfolgreiche Antwort von fetch
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          keyId: "123",
          type: "free",
          bookingDate: "2025-01-01",
          nextBillingDate: "2025-02-01",
        },
      ],
    });

    const result = await fetchLicensesByType("free");
    expect(result).toEqual([
      {
        keyId: "123",
        type: "free",
        bookingDate: "2025-01-01",
        nextBillingDate: "2025-02-01",
      },
    ]);
  });

  it("should return an empty array if API fails", async () => {
    // Simuliere einen Fehler bei fetch
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: "Error",
      json: async () => [],
    });

    const result = await fetchLicensesByType("free");
    expect(result).toEqual([]);
  });
});

describe("bookLicenses", () => {
  beforeEach(() => {
    global.fetch = vi.fn(); // Mock der globalen fetch-Funktion
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should successfully book new licenses", async () => {
    // Simuliere eine erfolgreiche Antwort von fetch
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, type: "free", count: 3 }),
    });

    const result = await bookLicenses("free", 3);
    expect(result).toEqual({ success: true, type: "free", count: 3 });
  });

  it("should return null if API fails", async () => {
    // Simuliere einen Fehler bei fetch
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: "Error",
      json: async () => null,
    });

    const result = await bookLicenses("free", 3);
    expect(result).toBeNull();
  });
});

describe("terminateLicenses", () => {
  beforeEach(() => {
    global.fetch = vi.fn(); // Mock der globalen fetch-Funktion
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should successfully terminate licenses", async () => {
    // Simuliere eine erfolgreiche Antwort von fetch
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, keys: ["key1", "key2"] }),
    });

    const result = await terminateLicenses(["key1", "key2"]);
    expect(result).toEqual({ success: true, keys: ["key1", "key2"] });
  });

  it("should return null if API fails", async () => {
    // Simuliere einen Fehler bei fetch
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: "Error",
      json: async () => null,
    });

    const result = await terminateLicenses(["key1", "key2"]);
    expect(result).toBeNull();
  });
});
