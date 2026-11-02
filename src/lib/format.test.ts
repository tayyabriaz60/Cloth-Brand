import { describe, expect, it } from "vitest";
import { localizedName } from "./format";

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
