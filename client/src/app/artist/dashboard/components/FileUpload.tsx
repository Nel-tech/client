// components/FileUpload.tsx
import { ImageIcon, FileAudio } from 'lucide-react';
import { FileUploadProps } from '../../../../helper/type';
import Image from 'next/image';
import { toast } from 'sonner';
interface FileConfig {
  icon: typeof ImageIcon | typeof FileAudio;
  accept: string;
  maxSize: number;
  formats: string;
  label: string;
}

const getThumbnailConfig = (): FileConfig => ({
  icon: ImageIcon,
  accept: 'image/*',
  maxSize: 10 * 1024 * 1024, // 10MB
  formats: 'PNG, JPG up to 10MB',
  label: 'Click to upload thumbnail',
});

const getAudioConfig = (maxSizeMB?: number): FileConfig => {
  const defaultMaxSize = 200; 
  const maxSize = maxSizeMB || defaultMaxSize;
  
  return {
    icon: FileAudio,
    accept: 'audio/*',
    maxSize: maxSize * 1024 * 1024,
    formats: `MP3, WAV up to ${maxSize}MB`,
    label: 'Click to upload audio',
  };
};

export default function FileUpload({ 
  type, 
  file, 
  preview,
  maxAudioSizeMB, 
  onFileChange, 
  error 
}: FileUploadProps) {
  const config = type === 'thumbnail' 
    ? getThumbnailConfig() 
    : getAudioConfig(maxAudioSizeMB);
  
  const Icon = config.icon;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    if (!selectedFile) return;



    if (selectedFile.size > config.maxSize) {
      const maxSizeMB = config.maxSize / 1024 / 1024;
      toast.warning(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    onFileChange(selectedFile);
  };

  

  const handleRemove = () => {
    onFileChange(null);
  };

  return (
    <div>
      <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
        {file ? (
          <div className="space-y-3">
            {type === 'thumbnail' && preview ? (
              <Image
                src={preview}
                alt="Thumbnail preview"
                className="w-32 h-32 object-cover rounded-lg mx-auto"
                width={128}
                height={128}
              />
            ) : (
              <Icon className="h-12 w-12 mx-auto text-[#FF6B35]" />
            )}
            {type === 'audio' && <p className="text-sm font-medium">{file.name}</p>}
            <button
              type="button"
              onClick={handleRemove}
              className="text-sm text-red-500 hover:text-red-600 transition-colors"
            >
              Remove
            </button>
          </div>
        ) : (
          <label className="cursor-pointer">
            <Icon className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">{config.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{config.formats}</p>
            <input
              type="file"
              accept={config.accept}
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}