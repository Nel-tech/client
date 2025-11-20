// components/artist/TrackTab/TrackList.tsx
"use client";
import { useState } from "react";
import { Track } from "@/helper/type";
import TrackCard from "./TrackCard";
import { Music, Loader2, AlertCircle, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface TrackListProps {
  tracks: Track[];
  isLoading: boolean;
  isError: boolean;
  currentTrackId?: string;
  isPlaying: boolean;
  currentTime: number;
  onPlayToggle: (track: Track) => void;
  onSeek: (time: number) => void;
}

export default function TrackList({
  tracks,
  isLoading,
  isError,
  currentTrackId,
  isPlaying,
  currentTime,
  onPlayToggle,
  onSeek,
}: TrackListProps) {
  const router = useRouter();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleEdit = (trackId: string) => {
    router.push(`/artist/tracks/edit/${trackId}`);
  };

  const handleDelete = (trackId: string) => {
    setDeleteConfirm(trackId);
  };

  const confirmDelete = async (trackId: string) => {
    // TODO: Implement your delete mutation here
    // Example:
    // await deleteTrackMutation.mutateAsync(trackId);
    console.log("Deleting track:", trackId);
    setDeleteConfirm(null);
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
        <p className="text-gray-400 text-sm">Loading your tracks...</p>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="p-4 rounded-full bg-red-500/10">
          <AlertCircle className="w-12 h-12 text-red-500" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-white">
            Failed to load tracks
          </h3>
          <p className="text-gray-400 text-sm">
            Something went wrong. Please try again later.
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg transition-all"
        >
          Retry
        </button>
      </div>
    );
  }

  // Empty State
  if (tracks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-6">
        <div className="relative">
          <div className="absolute inset-0  blur-3xl opacity-20 rounded-full" />
          <div className="relative p-6 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
            <Music className="w-16 h-16 text-gray-400" />
          </div>
        </div>
        <div className="text-center space-y-2 max-w-md">
          <h3 className="text-2xl font-bold text-white">No tracks yet</h3>
          <p className="text-gray-400">
            Upload your first track to start building your music collection
          </p>
        </div>
        <button
          onClick={() => router.push("/artist/tracks/upload")}
          className="px-8 py-3 bg-[#ff6b35] text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-purple-500/50"
        >
          Upload Your First Track
        </button>
      </div>
    );
  }

  // Track List
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Music className="w-5 h-5 text-[#ff6b35]" />
          <h2 className="text-lg font-semibold text-white">
            Your Tracks
            <span className="ml-2 text-sm font-normal text-gray-400">
              ({tracks.length})
            </span>
          </h2>
        </div>
      </div>

      {/* Tracks Grid */}
      <AnimatePresence mode="popLayout">
        <div className="space-y-3">
          {tracks.map((track) => (
            <motion.div
              key={track.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <TrackCard
                track={track}
                isPlaying={currentTrackId === track.id && isPlaying}
                currentTime={currentTrackId === track.id ? currentTime : 0}
                onPlayToggle={onPlayToggle}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSeek={onSeek}
              />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={cancelDelete}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-full bg-red-500/10">
                  <Trash2 className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Delete Track
                  </h3>
                  <p className="text-sm text-gray-400">
                    This action cannot be undone
                  </p>
                </div>
              </div>

              <p className="text-gray-300 mb-6">
                Are you sure you want to delete this track? All associated data
                will be permanently removed.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={cancelDelete}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => confirmDelete(deleteConfirm)}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-lg transition-all"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}