import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const BUCKET_NAME = "submissions";
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
const ALLOWED_TYPES = ["video/mp4", "video/quicktime", "video/webm"];
const ALLOWED_EXTENSIONS = [".mp4", ".mov", ".webm"];

interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

interface UseVideoUploadReturn {
  uploadVideo: (file: File) => Promise<string | null>;
  deleteVideo: (path: string) => Promise<boolean>;
  isUploading: boolean;
  progress: UploadProgress | null;
  error: string | null;
  validateFile: (file: File) => { valid: boolean; error?: string };
}

export const useVideoUpload = (): UseVideoUploadReturn => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState<UploadProgress | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateFile = useCallback((file: File): { valid: boolean; error?: string } => {
    // Check file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        return {
          valid: false,
          error: `Invalid file type. Allowed formats: ${ALLOWED_EXTENSIONS.join(", ")}`,
        };
      }
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return {
        valid: false,
        error: `File too large. Maximum size is 100MB. Your file is ${(file.size / (1024 * 1024)).toFixed(1)}MB`,
      };
    }

    return { valid: true };
  }, []);

  const uploadVideo = useCallback(async (file: File): Promise<string | null> => {
    if (!user) {
      setError("You must be logged in to upload videos");
      toast({
        title: "Error",
        description: "You must be logged in to upload videos",
        variant: "destructive",
      });
      return null;
    }

    const validation = validateFile(file);
    if (!validation.valid) {
      setError(validation.error || "Invalid file");
      toast({
        title: "Invalid file",
        description: validation.error,
        variant: "destructive",
      });
      return null;
    }

    setIsUploading(true);
    setError(null);
    setProgress({ loaded: 0, total: file.size, percentage: 0 });

    try {
      // Generate unique filename: userId/timestamp-originalname
      const timestamp = Date.now();
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const filePath = `${user.id}/${timestamp}-${sanitizedName}`;

      // Upload with progress tracking via XMLHttpRequest
      const formData = new FormData();
      formData.append("file", file);

      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;

      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        xhr.upload.addEventListener("progress", (event) => {
          if (event.lengthComputable) {
            setProgress({
              loaded: event.loaded,
              total: event.total,
              percentage: Math.round((event.loaded / event.total) * 100),
            });
          }
        });

        xhr.addEventListener("load", async () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            // Get public URL
            const { data: urlData } = supabase.storage
              .from(BUCKET_NAME)
              .getPublicUrl(filePath);

            setIsUploading(false);
            setProgress(null);
            
            toast({
              title: "Upload complete",
              description: "Your video has been uploaded successfully!",
            });
            
            resolve(urlData.publicUrl);
          } else {
            const errorMsg = "Upload failed. Please try again.";
            setError(errorMsg);
            setIsUploading(false);
            setProgress(null);
            reject(new Error(errorMsg));
          }
        });

        xhr.addEventListener("error", () => {
          const errorMsg = "Network error. Please check your connection.";
          setError(errorMsg);
          setIsUploading(false);
          setProgress(null);
          reject(new Error(errorMsg));
        });

        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        xhr.open(
          "POST",
          `${supabaseUrl}/storage/v1/object/${BUCKET_NAME}/${filePath}`
        );
        xhr.setRequestHeader("Authorization", `Bearer ${accessToken}`);
        xhr.setRequestHeader("x-upsert", "true");
        xhr.send(file);
      });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Upload failed";
      setError(errorMsg);
      setIsUploading(false);
      setProgress(null);
      toast({
        title: "Upload failed",
        description: errorMsg,
        variant: "destructive",
      });
      return null;
    }
  }, [user, validateFile, toast]);

  const deleteVideo = useCallback(async (path: string): Promise<boolean> => {
    try {
      // Extract path from full URL if needed
      const pathParts = path.split(`${BUCKET_NAME}/`);
      const filePath = pathParts.length > 1 ? pathParts[1] : path;

      const { error: deleteError } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([filePath]);

      if (deleteError) throw deleteError;

      toast({
        title: "Video deleted",
        description: "Your video has been removed.",
      });
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Delete failed";
      toast({
        title: "Delete failed",
        description: errorMsg,
        variant: "destructive",
      });
      return false;
    }
  }, [toast]);

  return {
    uploadVideo,
    deleteVideo,
    isUploading,
    progress,
    error,
    validateFile,
  };
};
