import { Interpolator } from "./interpolator";

describe("String interpolator", () => {
  it("returns original string if no variables in string", () => {
    const originalString = "This is my string";
    expect(Interpolator.interpolate(originalString)).toEqual(originalString);
  });

  it("throws error if variable included in string but received no parameters", () => {
    const originalString = "This is my ${variable}";
    expect(() => Interpolator.interpolate(originalString)).toThrowError(
      "Found ${variable}, which matches the variable syntax, but did not receive any parameters",
    );
  });

  it("throws error if variable value not provided in parameters", () => {
    const originalString = "This is my ${variable}";
    expect(() => Interpolator.interpolate(originalString, {})).toThrowError(
      "Variable 'variable' not found in parameters",
    );
  });

  it("replaces variable with provided parameter", () => {
    const originalString = "This is my ${variable}";
    const value = "myValue";
    expect(
      Interpolator.interpolate(originalString, {
        variable: value,
      }),
    ).toEqual(`This is my ${value}`);
  });

  it("replaces multiple instances of the same variable across multiple lines", () => {
    const originalString = "This is my ${variable}\n${variable}\n${variable}";
    const value = "myValue";
    expect(
      Interpolator.interpolate(originalString, {
        variable: value,
      }),
    ).toEqual(`This is my ${value}\n${value}\n${value}`);
  });

  it("replaces variable with environment variable", () => {
    const value = "myValue";
    process.env.MY_ENV_VAR = value;
    const originalString = "This is my ${env:MY_ENV_VAR}";
    expect(Interpolator.interpolate(originalString)).toEqual(`This is my ${value}`);
    delete process.env.MY_ENV_VAR;
  });

  it("throws error if environment variable does not exist", () => {
    const originalString = "This is my ${env:FAKE_ENV_VAR}";
    expect(() => Interpolator.interpolate(originalString)).toThrowError(
      "Environment variable 'FAKE_ENV_VAR' not found",
    );
  });
});
