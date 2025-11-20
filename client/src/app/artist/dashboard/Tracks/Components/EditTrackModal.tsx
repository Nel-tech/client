// src/components/track/EditTrackModal.tsx
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Upload, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { TrackResponse } from '@/helper/type';

interface EditTrackModalProps {
  isOpen: boolean;
  onClose: () => void;
  track: TrackResponse;
  onSave: (fields: {
    title?: string;
    description?: string;
    thumbnail?: File | null;
  }) => void;
  editableFields?: string[];
}

export const EditTrackModal = ({
  isOpen,
  onClose,
  track,
  onSave,
  editableFields = [],
}: EditTrackModalProps) => {
  const canEditTitle = editableFields.includes('title');
  const canEditDesc = editableFields.includes('description');
  const canEditThumbnail = editableFields.includes('thumbnail');

  const [title, setTitle] = useState(track.title);
  const [description, setDescription] = useState(track.description ?? '');
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTitle(track.title);
      setDescription(track.description ?? '');
      setThumbnail(null);
    }
  }, [isOpen, track]);

  const handleSave = () => {
    const updates: any = {};
    if (canEditTitle && title !== track.title) updates.title = title;
    if (canEditDesc && description !== (track.description ?? ''))
      updates.description = description;
    if (canEditThumbnail && thumbnail) updates.thumbnail = thumbnail;

    onSave(updates);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-[#1f1f1f] p-6 rounded-xl shadow-2xl max-w-md w-full mx-4 border border-[#3a3a3a]"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-white mb-4">Edit Track</h2>

        <div className="space-y-4">
          {canEditTitle ? (
            <input
              className="bg-[#2a2a2a] text w-full rounded-lg px-3 py-2 text-sm text-white border border-[#3a3a3a] focus:border-[#ff6b35] transition"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Track title"
              autoFocus
            />
          ) : (
            <p className="text-sm text-gray-300">Title: {track.title}</p>
          )}

          {canEditDesc ? (
            <textarea
              className="bg-[#2a2a2a] w-full rounded-lg px-3 py-2 text-xs text-gray-300 border border-[#3a3a3a] focus:border-[#ff6b35] transition resize-none"
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Add a description..."
            />
          ) : (
            <p className="text-sm text-gray-300">
              Description: {track.description ?? 'None'}
            </p>
          )}

          {canEditThumbnail && (
            <div className="space-y-2">
              <p className="text-sm text-gray-300">Thumbnail</p>
              <div className="relative w-32 h-32 mx-auto rounded-lg overflow-hidden">
                <Image src={track.thumbnail} alt={track.title} fill className="object-cover" />
              </div>

              <label className="flex items-center justify-center gap-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-3 py-2 cursor-pointer hover:border-[#ff6b35] transition">
                <Upload className="h-4 w-4 text-gray-300" />
                <span className="text-sm text-gray-300">Upload new thumbnail</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => setThumbnail(e.target.files?.[0] ?? null)}
                />
              </label>

              {thumbnail && (
                <p className="text-xs text-gray-400 truncate">{thumbnail.name}</p>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button
            size="sm"
            variant="outline"
            onClick={onClose}
            className="border-gray-700 text-gray-300 hover:bg-[#2a2a2a]"
          >
            <X className="h-4 w-4 mr-1" />
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            className="bg-[#ff6b35] hover:bg-[#ff8555] text-white shadow-lg"
          >
            <Check className="h-4 w-4 mr-1" />
            Save
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};