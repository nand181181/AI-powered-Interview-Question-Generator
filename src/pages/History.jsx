import { Link } from 'react-router-dom'; import { useDispatch, useSelector } from 'react-redux'; import { clearHistory } from '../store'; import { Empty, Title } from '../components/UI'
export default function History() {
  const h = useSelector(s => s.history); const d = useDispatch()
  return (<>
    <Title sub="Every session you've completed">Interview history</Title>
    {!h.length ? <Empty>No sessions yet. <Link className="underline" to="/setup">Start your first interview</Link></Empty> : <>
      <ul className="space-y-3">{h.map(s => <li key={s.id}><Link to={`/results/${s.id}`} className="card flex items-center justify-between hover:border-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber">
        <span><b className="capitalize">{s.mode}</b> · {s.topic} · {s.level}<br /><small className="text-slate-500">{new Date(s.date).toLocaleString()}</small></span><span className="font-display text-xl font-bold">{s.score}%</span></Link></li>)}</ul>
      <button className="btn-ghost mt-4" onClick={() => window.confirm('Delete all interview history?') && d(clearHistory())}>Clear history</button></>}</>)
}
