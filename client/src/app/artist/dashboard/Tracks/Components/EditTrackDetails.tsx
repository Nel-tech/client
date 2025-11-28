"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  useTrackById,
  useUpdateTrackDetails,
} from "@/lib/queries/track-queries"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from "next/image"

interface TrackDetailsProps {
  trackid: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditTrackDetails({ trackid, open, onOpenChange }: TrackDetailsProps) {
  const { data: CurrentTrack, isLoading } = useTrackById(trackid)
  
  const [preview, setPreview] = useState<string | null>(null)
  const [newThumbnail, setNewThumbnail] = useState<File | null>(null)
  const [genre, setGenre] = useState("")

  useEffect(() => {
    if (CurrentTrack?.genre) setGenre(CurrentTrack.genre)
  }, [CurrentTrack])

  // Reset preview when dialog closes
  useEffect(() => {
    if (!open) {
      setPreview(null)
      setNewThumbnail(null)
    }
  }, [open])

  const updateMutation = useUpdateTrackDetails()

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewThumbnail(file) 
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget

    await updateMutation.mutateAsync({
      trackId: trackid,
      title: form.title.value,
      description: form.description.value,
      genre,
      thumbnail: newThumbnail, 
    })

    onOpenChange(false)
    form.reset()
    setPreview(null)
    setNewThumbnail(null) 
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 border-0 bg-transparent sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <div className="relative w-full bg-black rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
          <div className="p-6">
            <DialogHeader className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <DialogTitle className="text-xl font-bold text-white">
                  Edit Track Details
                </DialogTitle>
              </div>
              <DialogDescription className="text-gray-400">
                Make changes to your track. Click save when done.
              </DialogDescription>
            </DialogHeader>

            {isLoading ? (
              <div className="py-12 text-center">
                <div className="inline-flex items-center gap-2 text-gray-400">
                  <div className="w-5 h-5 border-2 border-[#ff6b35] border-t-transparent rounded-full animate-spin" />
                  Loading track details...
                </div>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium text-gray-300">
                    Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    defaultValue={CurrentTrack?.title}
                    className="bg-white/5 border-gray-700 text-white placeholder:text-gray-500 
                    focus:border-[#ff6b35] focus:ring-[#ff6b35]/20 rounded-lg"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium text-gray-300">
                    Description
                  </Label>
                  <Input
                    id="description"
                    name="description"
                    defaultValue={CurrentTrack?.description}
                    className="bg-white/5 border-gray-700 text-white placeholder:text-gray-500 
                    focus:border-[#ff6b35] focus:ring-[#ff6b35]/20 rounded-lg"
                  />
                </div>

                {/* Genre */}
                <div className="space-y-2">
                  <Label className="text-sm text-white font-medium">Genre</Label>
                  <Select value={genre} onValueChange={setGenre}>
                    <SelectTrigger className="bg-white/5 border-gray-700 text-white rounded-lg">
                      <SelectValue placeholder={CurrentTrack?.genre || "Select genre"} />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 text-white border-gray-700">
                      <SelectItem value="Afrobeats" className="text-white">Afrobeats</SelectItem>
                      <SelectItem value="Hip_Hop" className="text-white">Hip_Hop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Thumbnail + Preview */}
                <div className="space-y-2">
                  <Label htmlFor="thumbnail" className="text-sm font-medium text-gray-300">
                    Thumbnail {newThumbnail && <span className="text-[#ff6b35] text-xs">(New image selected)</span>}
                  </Label>

                  {/* Thumbnail Preview */}
                  <div className="relative w-full h-[180px] rounded-lg overflow-hidden border border-gray-700">
                    <Image
                      src={preview || CurrentTrack?.thumbnail || "/placeholder.png"}
                      alt="Track thumbnail"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* File Input */}
                  <Input
                    id="thumbnail"
                    name="thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="bg-white/5 border-gray-700 text-white 
                    file:bg-[#ff6b35]/10 file:text-[#ff6b35] file:border-0 
                    file:rounded-md file:px-3 file:py-1 file:mr-3 file:font-medium
                    hover:file:bg-[#ff6b35]/20 focus:border-[#ff6b35] 
                    focus:ring-[#ff6b35]/20 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Footer */}
                <div className="flex gap-3 pt-4 border-t border-gray-700/50">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    className="flex-1 bg-transparent border-gray-700 text-gray-300 
                    hover:bg-white/5 hover:text-white rounded-lg"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={updateMutation.isPending}
                    className="flex-1 bg-gradient-to-r from-[#ff6b35] to-orange-600 
                    hover:from-[#ff5722] hover:to-orange-500 text-white font-medium 
                    rounded-lg shadow-lg shadow-[#ff6b35]/20 transition-all 
                    disabled:opacity-50"
                  >
                    {updateMutation.isPending ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Saving...
                      </span>
                    ) : (
                      "Save changes"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}