import { Parameters } from "../../models/general";
import { ParameterizedRegexInterpolator } from "./parameterizedRegexInterpolator";

const value = "value";
const parameters: Parameters = {
  variable: value,
};
const regexInterpolator = new ParameterizedRegexInterpolator(parameters);

describe("String interpolator", () => {
  it("returns original string if no variables in string", () => {
    const originalString = "This is my string";
    expect(regexInterpolator.interpolate(originalString)).toEqual(originalString);
  });

  it("replaces variable with provided parameter", () => {
    const originalString = "This is my ${variable}";
    expect(regexInterpolator.interpolate(originalString)).toEqual(`This is my ${value}`);
  });

  it("replaces multiple instances of the same variable across multiple lines", () => {
    const originalString = "This is my ${variable}\n${variable}\n${variable}";
    expect(regexInterpolator.interpolate(originalString)).toEqual(`This is my ${value}\n${value}\n${value}`);
  });

  it("replaces variable with environment variable", () => {
    const value = "myValue";
    process.env.MY_ENV_VAR = value;
    const originalString = "This is my ${env:MY_ENV_VAR}";
    expect(regexInterpolator.interpolate(originalString)).toEqual(`This is my ${value}`);
    delete process.env.MY_ENV_VAR;
  });

  it("throws error if environment variable does not exist", () => {
    const originalString = "This is my ${env:FAKE_ENV_VAR}";
    expect(() => regexInterpolator.interpolate(originalString)).toThrowError(
      "Environment variable 'FAKE_ENV_VAR' not found",
    );
  });
});
