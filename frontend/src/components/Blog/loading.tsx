import { Skeleton } from "@/components/ui/skeleton"
export default function Loading() {
    return (
    <div className="w-full flex flex-col gap-2">
        <Skeleton className="h-3 w-3/5 rounded-lg"/>
        <Skeleton className="h-3 w-4/5 rounded-lg"/>
    </div>
    )
  }
