import { useEffect, useRef, useState } from 'react'; import { useNavigate, useParams, useSearchParams } from 'react-router-dom'; import { useDispatch } from 'react-redux'
import { askJSON } from '../services/api'; import { QUESTIONS } from '../data/questions'; import { addSession } from '../store'
import { ErrorMsg, Spinner, Title } from '../components/UI'; import { avg } from '../utils'
const LIMIT = 15 * 60
const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
export default function Interview() {
  const { mode } = useParams(); const [sp] = useSearchParams(); const nav = useNavigate(); const dispatch = useDispatch()
  const topic = sp.get('topic') || (mode === 'hr' ? 'HR & Behavioral' : 'React'); const level = sp.get('level') || 'Intermediate'; const total = Number(sp.get('count')) || 5
  const [chat, setChat] = useState([]); const [items, setItems] = useState([]); const [q, setQ] = useState(null)
  const [answer, setAnswer] = useState(''); const [busy, setBusy] = useState(false); const [err, setErr] = useState(''); const [secs, setSecs] = useState(0)
  const end = useRef(null); const done = useRef(false)

  const nextQuestion = async (asked = items.map(i => i.q)) => {
    setBusy(true); setErr('')
    try {
      const { question } = await askJSON(`Ask ONE ${level} ${mode === 'hr' ? 'behavioral/HR' : 'technical'} interview question about ${topic}. Do not repeat: ${asked.join(' | ') || 'none'}. Format: {"question":"..."}`, 'You are a friendly but rigorous interviewer.')
      setQ(question); setChat(c => [...c, { who: 'ai', text: question }])
    } catch (e) { // graceful fallback to the local bank
      const pool = QUESTIONS.filter(x => x.topic === topic && !asked.includes(x.question))
      if (pool.length) { setQ(pool[0].question); setChat(c => [...c, { who: 'ai', text: pool[0].question }]); setErr('AI unavailable — using the offline question bank.') } else setErr(e.message)
    } finally { setBusy(false) }
  }
  useEffect(() => { setChat([]); setItems([]); setSecs(0); done.current = false; nextQuestion([]) }, [mode, topic, level]) // eslint-disable-line
  useEffect(() => { const t = setInterval(() => setSecs(s => s + 1), 1000); return () => clearInterval(t) }, [])
  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth' }) }, [chat])
  useEffect(() => { if (mode === 'mock' && secs >= LIMIT) finish(items) }, [secs]) // eslint-disable-line

  const finish = list => {
    if (done.current || !list.length) return; done.current = true
    const id = Date.now().toString(36)
    dispatch(addSession({ id, date: new Date().toISOString(), mode, topic, level, seconds: secs, score: avg(list.map(i => i.score * 10)), items: list }))
    nav(`/results/${id}`)
  }
  const submit = async e => {
    e.preventDefault()
    if (answer.trim().length < 20) return setErr('Write at least 20 characters so the AI can assess your answer.')
    setBusy(true); setErr(''); setChat(c => [...c, { who: 'me', text: answer }])
    try {
      const r = await askJSON(`Question: ${q}\nCandidate answer: ${answer}\nScore 0-10. Format: {"score":n,"feedback":"strengths and gaps, 2-3 sentences","ideal":"model answer with explanation"}`, 'You are a strict, constructive interview coach.')
      const item = { q, a: answer, score: Math.max(0, Math.min(10, Number(r.score) || 0)), feedback: r.feedback, ideal: r.ideal }
      const list = [...items, item]; setItems(list); setAnswer('')
      setChat(c => [...c, { who: 'ai', text: `Score ${item.score}/10. ${item.feedback}`, fb: true }])
      if (list.length >= total) finish(list); else await nextQuestion(list.map(i => i.q))
    } catch (e2) { setErr(e2.message) } finally { setBusy(false) }
  }
  return (<>
    <Title sub={`${topic} · ${level} · question ${Math.min(items.length + 1, total)} of ${total}`}>{mode === 'mock' ? 'AI mock interview' : mode === 'hr' ? 'HR interview' : 'Technical interview'}</Title>
    <div className="mb-3 flex items-center justify-between">
      <p className="rounded-full bg-amber/20 px-3 py-1 text-sm font-semibold" role="timer" aria-live="off">{mode === 'mock' ? `${fmt(Math.max(0, LIMIT - secs))} left` : `${fmt(secs)} elapsed`}</p>
      <button className="btn-ghost" onClick={() => finish(items)} disabled={!items.length}>End & see results</button>
    </div>
    <div className="card h-[45vh] space-y-3 overflow-y-auto" role="log" aria-live="polite" aria-label="Interview conversation">
      {chat.map((m, i) => <div key={i} className={`flex ${m.who === 'me' ? 'justify-end' : ''}`}><p className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${m.who === 'me' ? 'bg-teal text-white' : m.fb ? 'bg-amber/20' : 'bg-slate-100'}`}>{m.text}</p></div>)}
      {busy && <Spinner label="Interviewer is thinking" />}<div ref={end} />
    </div>
    <form onSubmit={submit} className="mt-3 space-y-2" noValidate>
      <label htmlFor="ans" className="sr-only">Your answer</label>
      <textarea id="ans" rows={4} className="input" placeholder="Type your answer…" value={answer} onChange={e => setAnswer(e.target.value)} disabled={busy || !q} />
      <ErrorMsg>{err}</ErrorMsg><button className="btn" disabled={busy || !q}>Submit answer</button>
    </form></>)
}
