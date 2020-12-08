import { AgileServiceProvider } from "../../services";
import { ServiceProviderOptions } from "./serviceProviderOptions";

export interface AgileProviderOptions extends ServiceProviderOptions {
  agileProvider: AgileServiceProvider;
}
