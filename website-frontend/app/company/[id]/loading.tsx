export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <div className="flex items-center justify-center">
        <progress className="mt-48 progress progress-info w-56" />
      </div>
    </>
  );
}
