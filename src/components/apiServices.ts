const API_BASE_URL = "http://localhost:5000/api/lizenzen";

// Holt alle Lizenzen
export async function fetchLicenseCounts() {
  try {
    const response = await fetch(`${API_BASE_URL}`);
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

// Holt eine Lizenz nach Typ
export async function fetchLicensesByType(type: string) {
  try {
    const response = await fetch(`${API_BASE_URL}?type=${type}`);
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

// Bucht neue Lizenzen
export async function bookLicenses(type: string, count: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lizenztyp: type, anzahl: count }),
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

// Kündigt Lizenzen
export async function terminateLicenses(keys: number[]) {
  try {
    const response = await fetch(`${API_BASE_URL}/terminate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(keys),
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
