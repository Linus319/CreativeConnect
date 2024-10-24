import { sum } from "./math";

describe("sum function", () => {
  it("should return the sum of two positive numbers", () => {
    expect(sum(1, 2)).toBe(3);
  });

  it("should return the sum of two negative numbers", () => {
    expect(sum(-1, -2)).toBe(-3);
  });

  it("should return the sum of a positive and a negative number", () => {
    expect(sum(1, -2)).toBe(-1);
  });

  it("should return 0 when both numbers are 0", () => {
    expect(sum(0, 0)).toBe(0);
  });
});
