export interface Sprint {
  name: string;
  id?: string;
  description?: string;
  startDate?: Date;
  finishDate?: Date;
  metadata?: unknown;
}
