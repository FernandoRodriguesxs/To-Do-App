import { Skeleton } from '@/components/ui/skeleton'

export const TodoListSkeleton = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <Skeleton className="flex justify-between items-center h-28 w-full" />
      <Skeleton className="flex justify-between items-center h-28 w-full" />
      <Skeleton className="flex justify-between items-center h-28 w-full" />
      <Skeleton className="flex justify-between items-center h-28 w-full" />
    </div>
  )
}
