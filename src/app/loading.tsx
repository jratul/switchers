import Spinner from "@/components/Spinner";

export default function Loading() {
  return (
    <div className="min-h-[50vh]">
      <div className="m-auto">
        <Spinner size={32} />
      </div>
    </div>
  );
}
