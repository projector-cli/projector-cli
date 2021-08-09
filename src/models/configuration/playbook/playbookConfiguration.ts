export interface PlaybookConfiguration {
  isActive?: boolean;
  location: URL | string;
  name: string;
  token?: string;
  templatesPath?: string;
}
