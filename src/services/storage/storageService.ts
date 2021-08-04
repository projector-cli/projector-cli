export interface StorageService<T> {
  read(name: string, location?: string): Promise<T | undefined>;
  write(name: string, data: T, location?: string): Promise<boolean>;
  list(location?: string): Promise<string[]>;
}
