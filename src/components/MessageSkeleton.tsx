export function MessageSkeleton() {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="skeleton h-4 w-[100%]"></div>
      <div className="flex gap-0.5">
        <div className="skeleton h-4 w-[40%]"></div>
        <div className="skeleton h-4 w-[20%]"></div>
        <div className="skeleton h-4 w-[40%]"></div>
      </div>
      <div className="skeleton h-4 w-[50%]"></div>
    </div>
  );
}
