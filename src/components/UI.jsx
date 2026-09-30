export const Bar = ({ value, label }) => (
  <div role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={label} className="h-2 w-full rounded-full bg-slate-200">
    <div className="h-2 rounded-full bg-teal transition-all duration-500" style={{ width: `${value}%` }} />
  </div>
)
export const Stat = ({ label, value, hint }) => (
  <div className="card"><p className="text-sm text-slate-500">{label}</p><p className="mt-1 font-display text-3xl font-bold">{value}</p>{hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}</div>
)
export const Empty = ({ children }) => <div className="card text-center text-sm text-slate-500">{children}</div>
export const ErrorMsg = ({ children }) => children ? <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{children}</p> : null
export const Spinner = ({ label = 'Loading' }) => <span role="status" className="inline-flex items-center gap-2 text-sm text-slate-500"><span className="h-4 w-4 animate-spin rounded-full border-2 border-teal border-t-transparent" />{label}…</span>
export const Title = ({ children, sub }) => <header className="mb-6"><h1 className="font-display text-2xl font-bold md:text-3xl">{children}</h1>{sub && <p className="mt-1 text-slate-600">{sub}</p>}</header>
