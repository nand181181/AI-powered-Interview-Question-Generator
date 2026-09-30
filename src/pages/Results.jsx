import { Link, useParams } from 'react-router-dom'; import { useSelector } from 'react-redux'; import { Bar, Empty, Stat, Title } from '../components/UI'
export default function Results() {
  const s = useSelector(st => st.history.find(h => h.id === useParams().id))
  if (!s) return <Empty>Session not found. <Link className="underline" to="/history">Open history</Link></Empty>
  const label = s.score >= 80 ? 'Interview-ready' : s.score >= 60 ? 'Getting there' : 'Needs more practice'
  return (<>
    <Title sub={`${s.topic} · ${s.level} · ${Math.round(s.seconds / 60)} min`}>Results: {label}</Title>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3"><Stat label="Overall score" value={`${s.score}%`} /><Stat label="Questions" value={s.items.length} /><Stat label="Weakest answer" value={`${Math.min(...s.items.map(i => i.score))}/10`} /></div>
    <ul className="mt-6 space-y-4">{s.items.map((i, n) => (
      <li key={n} className="card"><p className="font-semibold">{i.q}</p><div className="my-2"><Bar value={i.score * 10} label={`Score ${i.score} of 10`} /></div>
        <p className="text-sm"><b>Your answer:</b> {i.a}</p><p className="mt-2 text-sm"><b>Feedback:</b> {i.feedback}</p>
        <details className="mt-2 text-sm"><summary className="cursor-pointer font-medium text-teal">Model answer</summary><p className="mt-1">{i.ideal}</p></details></li>))}</ul>
    <Link to="/setup" className="btn mt-6">Practice again</Link></>)
}
