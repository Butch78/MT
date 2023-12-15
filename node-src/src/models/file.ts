export interface FileCreate {
  name: string;
  type: string;
  size: number;
}

export interface File extends FileCreate {
  id: string;
  created_at: Date;
}
