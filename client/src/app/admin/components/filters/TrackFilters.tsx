// components/filters/TrackFilters.tsx
'use client';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

interface Props {
  filter: string;
  sort: string;
  onFilterChange: (v: string) => void;
  onSortChange: (v: string) => void;
}

export default function TrackFilters({
  filter,
  sort,
  onFilterChange,
  onSortChange,
}: Props) {
  return (
    <div className="flex gap-4">
      <Select value={filter} onValueChange={onFilterChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="new">New Artists</SelectItem>
          <SelectItem value="trusted">Trusted Artists</SelectItem>
        </SelectContent>
      </Select>

      <Select value={sort} onValueChange={onSortChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="oldest">Oldest First</SelectItem>
          <SelectItem value="newest">Newest First</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}