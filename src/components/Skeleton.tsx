export default function Skeleton() {
  return (
    <div className="animate-pulse w-full p-3">
      <div className="flex gap-3">
        <div className="w-5 h-5 bg-slate-200 rounded-full"></div>
        <div className="flex-grow bg-slate-200 rounded "></div>
      </div>
      {Array.from({ length: 4 }).map((_, idx) => (
        <div key={idx} className="my-3">
          <div className="grid grid-cols-3 gap-2 my-2">
            <div className="h-3 col-span-1 bg-slate-200 rounded"></div>
            <div className="h-3 col-span-2 bg-slate-200 rounded"></div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="h-3 col-span-2 bg-slate-200 rounded"></div>
            <div className="h-3 col-span-1 bg-slate-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
