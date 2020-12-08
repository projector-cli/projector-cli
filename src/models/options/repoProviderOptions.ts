import { RepoServiceProvider } from "../../services";
import { ServiceProviderOptions } from "./serviceProviderOptions";

export interface RepoProviderOptions extends ServiceProviderOptions {
  repoProvider: RepoServiceProvider;
}
