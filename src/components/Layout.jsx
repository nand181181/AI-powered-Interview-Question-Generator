import { useState } from 'react'; import { NavLink, Outlet } from 'react-router-dom'; import { useSelector } from 'react-redux'
const NAV = [['/', 'Dashboard'], ['/setup', 'New interview'], ['/interview/technical', 'Technical'], ['/interview/hr', 'HR'], ['/interview/mock', 'Mock interview'], ['/analytics', 'Analytics'], ['/bank', 'Question bank'], ['/bookmarks', 'Bookmarks'], ['/history', 'History'], ['/profile', 'Profile & settings']]
export default function Layout() {
  const [open, setOpen] = useState(false); const name = useSelector(s => s.profile.name)
  return (
    <div className="min-h-screen md:flex">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-2">Skip to content</a>
      <div className="flex items-center justify-between bg-ink p-3 text-white md:hidden">
        <span className="font-display text-lg font-bold">InterviewIQ</span>
        <button className="btn-ghost !text-white" aria-expanded={open} aria-controls="nav" onClick={() => setOpen(!open)}>Menu</button>
      </div>
      <nav id="nav" aria-label="Main" className={`${open ? 'block' : 'hidden'} w-full shrink-0 bg-ink p-4 text-slate-300 md:sticky md:top-0 md:block md:h-screen md:w-60`}>
        <p className="mb-6 hidden font-display text-xl font-bold text-white md:block">InterviewIQ</p>
        <ul className="space-y-1">{NAV.map(([to, l]) => (
          <li key={to}><NavLink to={to} end={to === '/'} onClick={() => setOpen(false)}
            className={({ isActive }) => `block rounded-lg px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber ${isActive ? 'bg-teal font-semibold text-white' : 'hover:bg-white/10'}`}>{l}</NavLink></li>))}
        </ul>
        <p className="mt-8 border-t border-white/10 pt-4 text-xs">Signed in as {name}</p>
      </nav>
      <main id="main" className="min-w-0 flex-1 p-4 md:p-8"><Outlet /></main>
    </div>
  )
}
