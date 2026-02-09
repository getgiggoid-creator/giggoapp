import { useState, useRef, useCallback } from "react";
import { Upload, X, Play, Pause, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useVideoUpload } from "@/hooks/useVideoUpload";

interface VideoUploaderProps {
  onUploadComplete: (url: string) => void;
  onRemove?: () => void;
  existingUrl?: string;
  className?: string;
  disabled?: boolean;
}

export const VideoUploader = ({
  onUploadComplete,
  onRemove,
  existingUrl,
  className,
  disabled = false,
}: VideoUploaderProps) => {
  const { uploadVideo, deleteVideo, isUploading, progress, error, validateFile } = useVideoUpload();
  const [previewUrl, setPreviewUrl] = useState<string | null>(existingUrl || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileSelect = useCallback(async (file: File) => {
    setValidationError(null);
    
    // Validate before creating preview
    const validation = validateFile(file);
    if (!validation.valid) {
      setValidationError(validation.error || "Invalid file");
      return;
    }

    // Create local preview
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);

    // Upload to storage
    const uploadedUrl = await uploadVideo(file);
    
    if (uploadedUrl) {
      // Replace local preview with uploaded URL
      URL.revokeObjectURL(localUrl);
      setPreviewUrl(uploadedUrl);
      onUploadComplete(uploadedUrl);
    } else {
      // Revert preview on error
      URL.revokeObjectURL(localUrl);
      setPreviewUrl(existingUrl || null);
    }
  }, [uploadVideo, validateFile, onUploadComplete, existingUrl]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
    // Reset input so same file can be selected again
    e.target.value = "";
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleRemove = async () => {
    if (previewUrl && previewUrl !== existingUrl) {
      await deleteVideo(previewUrl);
    }
    setPreviewUrl(null);
    setIsPlaying(false);
    onRemove?.();
  };

  const togglePlayback = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const displayError = validationError || error;

  return (
    <div className={cn("w-full", className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/quicktime,video/webm,.mp4,.mov,.webm"
        onChange={handleInputChange}
        className="hidden"
        disabled={disabled || isUploading}
      />

      {/* Upload Zone or Preview */}
      {!previewUrl ? (
        <div
          onClick={() => !disabled && !isUploading && fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            "relative flex flex-col items-center justify-center gap-4 p-8",
            "border-2 border-dashed rounded-xl transition-all cursor-pointer",
            "min-h-[240px]",
            isDragOver
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-accent/50",
            displayError && "border-destructive",
            (disabled || isUploading) && "opacity-50 cursor-not-allowed"
          )}
        >
          <div className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center",
            "bg-primary/10 text-primary"
          )}>
            <Upload className="w-8 h-8" />
          </div>
          
          <div className="text-center">
            <p className="font-medium text-foreground">
              {isDragOver ? "Drop your video here" : "Upload your video"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              MP4, MOV, or WebM • Max 100MB
            </p>
          </div>

          <Button variant="outline" size="sm" disabled={disabled || isUploading}>
            Choose File
          </Button>
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden bg-black">
          {/* Video Preview */}
          <video
            ref={videoRef}
            src={previewUrl}
            className="w-full aspect-[9/16] max-h-[400px] object-contain"
            onEnded={() => setIsPlaying(false)}
            playsInline
          />

          {/* Overlay Controls */}
          <div className="absolute inset-0 flex items-center justify-center">
            {!isUploading && (
              <button
                onClick={togglePlayback}
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center",
                  "bg-black/50 text-white backdrop-blur-sm",
                  "transition-all hover:bg-black/70 hover:scale-110"
                )}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8 ml-1" />
                )}
              </button>
            )}
          </div>

          {/* Remove Button */}
          {!isUploading && (
            <button
              onClick={handleRemove}
              className={cn(
                "absolute top-3 right-3 p-2 rounded-full",
                "bg-black/50 text-white backdrop-blur-sm",
                "transition-all hover:bg-destructive"
              )}
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Upload Status Badge */}
          <div className="absolute bottom-3 left-3 right-3">
            {isUploading && progress && (
              <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span className="text-sm text-white">
                    Uploading... {progress.percentage}%
                  </span>
                  <span className="text-xs text-white/60 ml-auto">
                    {formatSize(progress.loaded)} / {formatSize(progress.total)}
                  </span>
                </div>
                <Progress value={progress.percentage} className="h-1" />
              </div>
            )}

            {!isUploading && previewUrl && !previewUrl.startsWith("blob:") && (
              <div className="inline-flex items-center gap-2 bg-success/20 text-success px-3 py-1.5 rounded-full text-sm">
                <CheckCircle2 className="w-4 h-4" />
                Upload complete
              </div>
            )}
          </div>
        </div>
      )}

      {/* Error Display */}
      {displayError && (
        <div className="flex items-center gap-2 mt-3 text-destructive text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{displayError}</span>
        </div>
      )}

      {/* File Requirements */}
      {!previewUrl && (
        <p className="text-xs text-muted-foreground mt-3 text-center">
          For best results, upload vertical video (9:16 aspect ratio)
        </p>
      )}
    </div>
  );
};
