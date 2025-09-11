
import { Skeleton } from "@/components/ui/skeleton"
function SidebarSkeleton() {
  return (
    <div>
        <aside className="w-64 text-gray-300 flex flex-col p-4 h-screen  border-r border-gray-800">
      {/* Logo skeleton */}
      <div className="mb-10 px-3">
        <Skeleton className="h-8 w-32 bg-gray-800" />
      </div>

      {/* Nav items skeleton */}
      <nav className="flex-1 flex flex-col space-y-2">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-full bg-gray-800 rounded-2xl" />
        ))}
      </nav>

      {/* Profile section skeleton */}
      <div className="mt-auto">
        <hr className="my-4 border-t border-gray-700/50" />
        <div className="flex items-center gap-3 p-3">
          <Skeleton className="w-10 h-10 rounded-full bg-gray-800" />
          <div className="flex-1">
            <Skeleton className="h-4 w-20 mb-1 bg-gray-800" />
            <Skeleton className="h-3 w-16 bg-gray-800" />
          </div>
        </div>
      </div>
    </aside>
    </div>
  )
}

export default SidebarSkeleton