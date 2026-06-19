export type { AuditResult, Level } from "@/lib/schema";

export type AppState = "idle" | "loading" | "success" | "error";

export interface UploadedFile {
  file: File;
  previewUrl: string;
}
