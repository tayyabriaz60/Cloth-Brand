import { describe, expect, it } from "vitest";
import { formatMoney, formatQty, localizedName } from "./format";

describe("localizedName", () => {
  it("uses English when the UI is English and a name exists", () => {
    expect(localizedName("ڈیمو", "Demo", "en")).toBe("Demo");
  });

  it("falls back to Urdu when English is missing or blank", () => {
    expect(localizedName("ڈیمو", null, "en")).toBe("ڈیمو");
    expect(localizedName("ڈیمو", "  ", "en")).toBe("ڈیمو");
  });

  it("uses Urdu when the UI is Urdu", () => {
    expect(localizedName("ڈیمو", "Demo", "ur")).toBe("ڈیمو");
  });
});

describe("formatMoney", () => {
  it("prefixes Rs and groups thousands with Latin digits", () => {
    expect(formatMoney(1250)).toBe("Rs 1,250");
    expect(formatMoney(0)).toBe("Rs 0");
  });
});

describe("formatQty", () => {
  it("keeps two decimal places in Latin digits", () => {
    expect(formatQty(3.5)).toBe("3.50");
    expect(formatQty(120.5)).toBe("120.50");
  });
});
