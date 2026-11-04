import { describe, expect, it } from "vitest";
import { weekBarHeights } from "./weekBars";

describe("weekBarHeights", () => {
  it("keeps an all-zero week flat", () => {
    expect(weekBarHeights([0, 0, 0], 100)).toEqual([0, 0, 0]);
  });

  it("scales the peak day to maxPx and zeros stay zero", () => {
    expect(weekBarHeights([10, 5, 0], 100)).toEqual([100, 50, 0]);
  });
});
