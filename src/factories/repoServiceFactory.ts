import { RepoProviderOptions, RepoService } from "../models";
import { ObjectService, RepoServiceProvider } from "../services";

export class RepoServiceFactory {
  private static registry: {
    [providerName: string]: {
      new (options: RepoProviderOptions, contentService: ObjectService<string>): RepoService;
    };
  } = {};

  public static register(
    providerName: RepoServiceProvider,
    service: { new (options: RepoProviderOptions, contentService: ObjectService<string>): RepoService },
  ): void {
    RepoServiceFactory.registry[providerName] = service;
  }

  public static get(options: RepoProviderOptions, contentService: ObjectService<string>): RepoService {
    const { repoProvider } = options;
    const service = RepoServiceFactory.registry[repoProvider];

    if (!service) {
      throw new Error(`Repo service ${repoProvider} not defined. Options are ${Object.keys(this.registry).join(",")}`);
    }
    return new service(options, contentService);
  }
}
