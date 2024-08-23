import Skeleton from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 p-5">
      {Array.from({ length: 12 }).map((_, idx) => (
        <div className="col-span-1" key={idx}>
          <Skeleton />
        </div>
      ))}
      <div className="col-span-1"></div>
    </div>
  );
}
