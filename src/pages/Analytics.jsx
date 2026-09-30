import { useSelector } from 'react-redux'; import { Bar, Empty, Stat, Title } from '../components/UI'; import { avg, byTopic } from '../utils'
export default function Analytics() {
  const history = useSelector(s => s.history); const topics = byTopic(history); const trend = [...history].reverse().slice(-10)
  if (!history.length) return <><Title>Performance analytics</Title><Empty>No data yet. Complete an interview to unlock strengths, weaknesses and trends.</Empty></>
  const answers = history.flatMap(h => h.items); const acc = Math.round(answers.filter(a => a.score >= 7).length / answers.length * 100)
  return (<>
    <Title sub="Based on every answer you've submitted">Performance analytics</Title>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4"><Stat label="Accuracy" value={`${acc}%`} hint="Answers scoring 7+" /><Stat label="Avg score" value={`${avg(history.map(h => h.score))}%`} /><Stat label="Strongest" value={topics[0]?.topic} /><Stat label="Weakest" value={topics.at(-1)?.topic} /></div>
    <div className="mt-6 grid gap-4 lg:grid-cols-2">
      <section className="card" aria-labelledby="t1"><h2 id="t1" className="font-display text-lg font-bold">Score by topic</h2>{topics.map(t => <div key={t.topic} className="mt-3"><p className="mb-1 text-sm">{t.topic} · {t.score}% ({t.n} answers)</p><Bar value={t.score} label={t.topic} /></div>)}</section>
      <section className="card" aria-labelledby="t2"><h2 id="t2" className="font-display text-lg font-bold">Last {trend.length} sessions</h2>
        <div className="mt-4 flex h-40 items-end gap-2" role="img" aria-label={`Scores: ${trend.map(t => t.score + '%').join(', ')}`}>{trend.map(t => <div key={t.id} className="flex flex-1 flex-col items-center justify-end"><span className="text-xs">{t.score}</span><div className="w-full rounded-t bg-teal transition-all" style={{ height: `${t.score}%` }} /></div>)}</div></section>
    </div></>)
}
