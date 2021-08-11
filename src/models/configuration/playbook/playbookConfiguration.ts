export interface PlaybookConfiguration {
  isActive?: boolean;
  location: URL | string;
  playbookName: string;
  token?: string;
  templatesPath?: string;
}
