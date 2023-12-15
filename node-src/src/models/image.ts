export interface ImageUpload {
  name: string;
  file: File;
}

export interface Image extends ImageUpload {
  id: string;
  created_at: Date;
}
