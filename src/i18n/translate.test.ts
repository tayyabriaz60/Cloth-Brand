import { describe, expect, it } from "vitest";
import { en } from "./en";
import { translate } from "./translate";
import { ur } from "./ur";

describe("translations", () => {
  it("ur and en have exactly the same keys", () => {
    expect(Object.keys(en).sort()).toEqual(Object.keys(ur).sort());
  });

  it("has no empty strings", () => {
    for (const value of [...Object.values(ur), ...Object.values(en)]) {
      expect(value.trim()).not.toBe("");
    }
  });

  it("returns the text for the chosen language", () => {
    expect(translate("en", "home.newBill.button")).toBe("New Bill");
    expect(translate("ur", "home.newBill.button")).toBe("نیا بل");
  });
});
