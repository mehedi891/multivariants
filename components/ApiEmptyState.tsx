type ApiEmptyStateProps = {
  title: string;
  description: string;
  helpText?: string;
  error?: string;
  showDebugDetails?: boolean;
};

export default function ApiEmptyState({
  title,
  description,
  helpText,
  error,
  showDebugDetails = false,
}: ApiEmptyStateProps) {
  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-white/16 bg-gradient-to-b from-white/[0.08] to-white/[0.03] p-6 text-center shadow-[0_16px_36px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:p-8">
      <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/45 bg-primary/18 text-primary-light shadow-[0_0_18px_rgba(92,106,196,0.3)]">
        <span className="text-xl font-bold">i</span>
      </div>

      <h2 className="mt-4 text-2xl font-black tracking-tight text-white">{title}</h2>
      <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-white/[0.72] sm:text-base">
        {description}
      </p>

      {helpText && (
        <p className="mt-3 text-xs uppercase tracking-[0.08em] text-white/[0.46] sm:text-[11px]">
          {helpText}
        </p>
      )}

      {showDebugDetails && error && (
        <pre className="mt-4 overflow-x-auto rounded-xl border border-amber-200/25 bg-black/25 px-3 py-2 text-left text-xs leading-relaxed text-amber-200/90">
          {error}
        </pre>
      )}
    </div>
  );
}
