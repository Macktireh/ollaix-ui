export function MessageSkeleton() {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="skeleton h-4 w-[100%]"></div>
      <div className="flex gap-0.5">
        <div className="skeleton h-4 w-[50%]"></div>
        <div className="skeleton h-4 w-[50%]"></div>
      </div>
      <div className="flex gap-0.5">
        <div className="skeleton h-4 w-[35%]"></div>
        <div className="skeleton h-4 w-[30%]"></div>
        <div className="skeleton h-4 w-[35%]"></div>
      </div>
      <div className="skeleton h-4 w-[50%]"></div>
    </div>
  );
}
