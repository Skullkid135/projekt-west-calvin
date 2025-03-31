const API_BASE_URL = "http://localhost:5000/api"; // Passe die URL an dein Backend an

// Holt die Lizenzanzahlen für die Übersicht
export async function fetchLicenseCounts() {
  try {
    const response = await fetch(`${API_BASE_URL}/licenses/counts`);
    if (!response.ok) {
      throw new Error(
        `Fehler beim Abrufen der Lizenzanzahlen: ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Fehler beim Laden der Lizenzanzahlen:", error);
    return { free: 0, base: 0, professional: 0 };
  }
}

// Holt alle Lizenzen für eine bestimmte Lizenzart (free, base, professional)
export async function fetchLicensesByType(type: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/licenses?type=${type}`);
    if (!response.ok) {
      throw new Error(
        `Fehler beim Abrufen der Lizenzen: ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Fehler beim Laden der Lizenzen:", error);
    return [];
  }
}

// Bucht neue Lizenzen anhand der übergebenen Anzahl und des Typs
export async function bookLicenses(type: string, count: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/licenses/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type, count }),
    });

    if (!response.ok) {
      throw new Error(
        `Fehler beim Buchen der Lizenzen: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Fehler beim Buchen der Lizenzen:", error);
    return null;
  }
}

// Kündigt eine oder mehrere Lizenzen anhand ihrer Key-IDs
export async function terminateLicenses(keys: string[]) {
  try {
    const response = await fetch(`${API_BASE_URL}/licenses/terminate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keys }),
    });

    if (!response.ok) {
      throw new Error(
        `Fehler beim Kündigen der Lizenzen: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Fehler beim Kündigen der Lizenzen:", error);
    return null;
  }
}
