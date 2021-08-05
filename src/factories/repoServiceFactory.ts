import { RepoProviderOptions, RepoService } from "../models";
import { RepoServiceProvider } from "../services";

export class RepoServiceFactory {
  private static registry: {
    [providerName: string]: {
      new (options: RepoProviderOptions): RepoService;
    };
  } = {};

  public static register(
    providerName: RepoServiceProvider,
    service: { new (options: RepoProviderOptions): RepoService },
  ): void {
    RepoServiceFactory.registry[providerName] = service;
  }

  public static get(options: RepoProviderOptions): RepoService {
    const { repoProvider } = options;
    const service = RepoServiceFactory.registry[repoProvider];

    if (!service) {
      throw new Error(`Repo service ${repoProvider} not defined. Options are ${Object.keys(this.registry).join(",")}`);
    }
    return new service(options);
  }
}
