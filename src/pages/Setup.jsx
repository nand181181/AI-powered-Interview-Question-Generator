import { useState } from 'react'; import { useNavigate } from 'react-router-dom'
import { TOPICS, LEVELS } from '../data/questions'; import { Title, ErrorMsg } from '../components/UI'
export default function Setup() {
  const nav = useNavigate(); const [f, setF] = useState({ mode: 'technical', topic: 'React', level: 'Intermediate', count: 5 }); const [err, setErr] = useState('')
  const set = k => e => setF({ ...f, [k]: e.target.value })
  const go = e => {
    e.preventDefault()
    const n = Number(f.count); if (!(n >= 1 && n <= 15)) return setErr('Choose between 1 and 15 questions.')
    if (f.mode === 'hr') f.topic = 'HR & Behavioral'
    nav(`/interview/${f.mode}?topic=${encodeURIComponent(f.topic)}&level=${f.level}&count=${n}`)
  }
  const Field = ({ id, label, children }) => <div><label htmlFor={id} className="mb-1 block text-sm font-medium">{label}</label>{children}</div>
  return (<>
    <Title sub="Pick a format, topic and difficulty. The AI tailors every question.">AI interview setup</Title>
    <form onSubmit={go} noValidate className="card grid max-w-xl gap-4">
      <Field id="mode" label="Format"><select id="mode" className="input" value={f.mode} onChange={set('mode')}><option value="technical">Technical</option><option value="hr">HR & behavioral</option><option value="mock">Timed mock interview</option></select></Field>
      <Field id="topic" label="Topic"><select id="topic" className="input" disabled={f.mode === 'hr'} value={f.mode === 'hr' ? 'HR & Behavioral' : f.topic} onChange={set('topic')}>{TOPICS.map(t => <option key={t}>{t}</option>)}</select></Field>
      <Field id="level" label="Difficulty"><select id="level" className="input" value={f.level} onChange={set('level')}>{LEVELS.map(t => <option key={t}>{t}</option>)}</select></Field>
      <Field id="count" label="Number of questions (1–15)"><input id="count" type="number" className="input" value={f.count} onChange={set('count')} /></Field>
      <ErrorMsg>{err}</ErrorMsg><button className="btn">Start interview</button>
    </form></>)
}
