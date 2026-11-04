import { describe, expect, it } from "vitest";
import { productMatches } from "./productSearch";

const lawn = { name_ur: "لان", name_en: "Lawn", design_no: "LW-101", category: { id: "c1" } };

describe("productMatches", () => {
  it("filters by category and case-insensitive text", () => {
    expect(productMatches(lawn, "lw", "c1")).toBe(true);
    expect(productMatches(lawn, "lw", "c2")).toBe(false);
    expect(productMatches(lawn, "cotton", null)).toBe(false);
  });
});
