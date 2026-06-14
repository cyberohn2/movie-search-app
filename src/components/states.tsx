const LoadingGrid = ({ count = 10 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="space-y-4">
          <div className="min-h-50 rounded-md bg-gray-200 animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 rounded-md bg-gray-200 animate-pulse" />
            <div className="h-4 w-3/4 rounded-md bg-gray-200 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

const ErrorState = ({ message }: { message: string }) => (
  <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
    {message}
  </div>
);

const EmptyState = ({ message }: { message: string }) => (
  <div className="rounded-lg border border-gray-200 bg-white p-6 text-sm text-gray-700">
    {message}
  </div>
);

export { LoadingGrid, ErrorState, EmptyState };
