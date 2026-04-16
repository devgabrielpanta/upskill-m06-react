import { useIsFetching, useIsMutating } from "@tanstack/react-query";

export default function Loading() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const isLoading = isFetching > 0 || isMutating > 0;

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-neutral/50 backdrop-blur-xs z-50">
      <div className="animate-pulse text-2xl font-bold text-primary">
        Loading <span className="loading loading-dots loading-xl"></span>
      </div>
    </div>
  );
}