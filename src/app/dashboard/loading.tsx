export default function DashboardLoading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-kreo-ink/20 border-t-kreo-amber rounded-full animate-spin"></div>
        <p className="text-kreo-ink/60 font-medium">Loading...</p>
      </div>
    </div>
  );
}
