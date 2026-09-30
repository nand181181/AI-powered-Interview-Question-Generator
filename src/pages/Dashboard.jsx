import { Link } from 'react-router-dom'; import { useSelector } from 'react-redux'
import { Stat, Title, Empty, Bar } from '../components/UI'; import { avg, byTopic } from '../utils'
export default function Dashboard() {
  const { history, profile, bookmarks } = useSelector(s => s)
  const scores = history.map(h => h.score); const topics = byTopic(history)
  return (<>
    <Title sub={`Goal: ${profile.goal}`}>Welcome back, {profile.name}</Title>
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <Stat label="Sessions" value={history.length} />
      <Stat label="Average score" value={`${avg(scores)}%`} />
      <Stat label="Best score" value={`${Math.max(0, ...scores)}%`} />
      <Stat label="Bookmarks" value={bookmarks.length} />
    </div>
    <div className="mt-6 grid gap-4 lg:grid-cols-3">
      <section className="card lg:col-span-2" aria-labelledby="s1">
        <h2 id="s1" className="font-display text-lg font-bold">Start practicing</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link className="btn" to="/interview/mock">Mock interview</Link>
          <Link className="btn-ghost" to="/interview/technical">Technical round</Link>
          <Link className="btn-ghost" to="/interview/hr">HR round</Link>
          <Link className="btn-ghost" to="/setup">Custom setup</Link>
        </div>
      </section>
      <section className="card" aria-labelledby="s2">
        <h2 id="s2" className="font-display text-lg font-bold">Focus areas</h2>
        {topics.length ? [...topics].reverse().slice(0, 3).map(t => <div key={t.topic} className="mt-3"><p className="mb-1 text-sm">{t.topic} · {t.score}%</p><Bar value={t.score} label={t.topic} /></div>) : <Empty>Finish a session to see your weakest topics.</Empty>}
      </section>
    </div></>)
}
