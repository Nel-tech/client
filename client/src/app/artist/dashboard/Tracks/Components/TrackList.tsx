"use client";

import { useState } from "react";
import { Track } from "@/lib/api/endpoints/track/type";
import TrackCard from "./TrackCard";
import { Music} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "./ui/Loading";
import Error from "./ui/Error";
import Empty from "./ui/Empty";
import { EditTrackDetails } from "./EditTrackDetails";
import { useDeleteTrack } from "@/lib/queries/track-queries";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface TrackListProps {
  tracks: Track[];
  isLoading: boolean;
  isError: boolean;
  currentTrackId?: string;
  isPlaying: boolean;
  currentTime: number;
  onPlayToggle: (track: Track) => void;
  onPromote:(track:Track) => void;
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
  const searchParams = useSearchParams();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const editingTrackId = searchParams.get("edit");
  const deleteMutation = useDeleteTrack()

  const handleEdit = (trackId: string) => {
    router.push(`?edit=${trackId}`, { scroll: false });
  };

  const handleEditOpenChange = (open: boolean) => {
    if (!open) {
      router.push(`?`, { scroll: false });
    }
  };

  const handleDelete = (trackId: string) => {
    setDeleteConfirm(trackId);
  };



  const confirmDelete = async (trackId: string) => {
    try {
      await deleteMutation.mutateAsync(trackId)
      toast.success('Track Successfully Deleted')
    } catch (error:unknown) {
       toast.error(error.response?.data?.error || 'Failed to Delete Track');
    }
    setDeleteConfirm(null);
  
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  if (tracks.length === 0) return <Empty />;

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

      {/* Edit Track Dialog - controlled by URL */}
      {editingTrackId && (
        <EditTrackDetails
          trackid={editingTrackId}
          open={!!editingTrackId}
          onOpenChange={handleEditOpenChange}
        />
      )}

      

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
              className="w-full max-w-md bg-black rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-4">
               
                <div>
                  <h3 className="text-lg font-semibold text-white">Delete Track</h3>
                  <p className="text-sm text-gray-400">This action cannot be undone</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete this track? All associated data will be permanently removed.
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={cancelDelete}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => confirmDelete(deleteConfirm)}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-lg transition-all"
                >
                  Delete
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}