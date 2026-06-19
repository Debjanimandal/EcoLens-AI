"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, ImageIcon, CheckCircle } from "lucide-react";

interface ImageUploaderProps {
  onFileSelected: (file: File, previewUrl: string) => void;
  onFileClear: () => void;
  previewUrl: string | null;
  fileName: string | null;
  disabled?: boolean;
}

const ACCEPTED_TYPES = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
  "image/gif": [".gif"],
};
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

export default function ImageUploader({
  onFileSelected,
  onFileClear,
  previewUrl,
  fileName,
  disabled = false,
}: ImageUploaderProps) {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (accepted: File[], rejected: { errors: readonly { message: string }[] }[]) => {
      setError(null);

      if (rejected.length > 0) {
        const msg = rejected[0].errors[0]?.message ?? "Invalid file.";
        if (msg.includes("size")) setError("File is too large. Maximum size is 10 MB.");
        else setError("Unsupported file type. Please use JPEG, PNG, or WebP.");
        return;
      }

      if (accepted.length > 0) {
        const file = accepted[0];
        const url = URL.createObjectURL(file);
        onFileSelected(file, url);
      }
    },
    [onFileSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxSize: MAX_SIZE,
    maxFiles: 1,
    disabled,
  });

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setError(null);
    onFileClear();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!previewUrl ? (
          /* ── Drop zone ── */
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25 }}
          >
            <div
              {...getRootProps()}
              id="image-drop-zone"
              className={`drop-zone flex flex-col items-center justify-center gap-5 p-12 text-center select-none ${
                isDragActive ? "active" : ""
              } ${disabled ? "pointer-events-none opacity-50" : ""}`}
              style={{ minHeight: "280px" }}
            >
              <input {...getInputProps()} id="image-file-input" aria-label="Upload image" />

              <motion.div
                animate={isDragActive ? { scale: 1.15, rotate: 5 } : { scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: isDragActive
                    ? "rgba(52, 211, 153, 0.2)"
                    : "rgba(16, 185, 129, 0.1)",
                  border: "1px solid rgba(52, 211, 153, 0.25)",
                }}
              >
                {isDragActive ? (
                  <CheckCircle size={32} style={{ color: "var(--green-400)" }} />
                ) : (
                  <Upload size={32} style={{ color: "var(--green-400)" }} />
                )}
              </motion.div>

              <div>
                <p
                  className="font-display text-lg font-semibold mb-1"
                  style={{ color: isDragActive ? "var(--green-300)" : "var(--text-primary)", fontFamily: "var(--font-space)" }}
                >
                  {isDragActive ? "Drop it here!" : "Drag & drop your photo"}
                </p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  or{" "}
                  <span
                    style={{ color: "var(--green-400)", fontWeight: 600 }}
                    className="cursor-pointer hover:underline"
                  >
                    click to browse
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {["JPEG", "PNG", "WebP", "GIF"].map((fmt) => (
                  <span
                    key={fmt}
                    className="text-xs px-2 py-0.5 rounded"
                    style={{
                      background: "rgba(52, 211, 153, 0.07)",
                      color: "var(--green-300)",
                      border: "1px solid rgba(52, 211, 153, 0.15)",
                    }}
                  >
                    {fmt}
                  </span>
                ))}
                <span
                  className="text-xs px-2 py-0.5 rounded"
                  style={{
                    background: "rgba(52, 211, 153, 0.07)",
                    color: "var(--green-300)",
                    border: "1px solid rgba(52, 211, 153, 0.15)",
                  }}
                >
                  Max 10 MB
                </span>
              </div>

              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Try: rooftops · streets · vehicles · appliances · yards · buildings
              </p>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 px-4 py-3 rounded-xl text-sm flex items-center gap-2"
                style={{
                  background: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.25)",
                  color: "#f87171",
                }}
              >
                <X size={16} />
                {error}
              </motion.div>
            )}
          </motion.div>
        ) : (
          /* ── Preview ── */
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="relative rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(52, 211, 153, 0.3)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="Uploaded photo preview"
              className="w-full object-cover"
              style={{ maxHeight: "420px" }}
            />

            {/* Overlay bar */}
            <div
              className="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-center justify-between"
              style={{
                background: "linear-gradient(0deg, rgba(4,13,10,0.9) 0%, transparent 100%)",
              }}
            >
              <div className="flex items-center gap-2">
                <ImageIcon size={16} style={{ color: "var(--green-400)" }} />
                <span
                  className="text-sm font-medium truncate max-w-xs"
                  style={{ color: "var(--text-primary)" }}
                >
                  {fileName}
                </span>
              </div>
              {!disabled && (
                <button
                  id="clear-image-btn"
                  onClick={handleClear}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all hover:opacity-90"
                  style={{
                    background: "rgba(239, 68, 68, 0.15)",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    color: "#f87171",
                  }}
                >
                  <X size={13} />
                  Remove
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
