export interface StorageService {
  find(name: string, startingDirectory?: string): Promise<string | undefined>;
  read(name: string, location?: string): Promise<string | undefined>;
  write(name: string, data: string, location?: string): Promise<boolean>;
  list(location?: string): Promise<string[]>;
}
