import { useState } from 'react'; import { useDispatch, useSelector } from 'react-redux'; import { QUESTIONS, TOPICS, LEVELS } from '../data/questions'
import { toggleBookmark } from '../store'; import { Empty, Title } from '../components/UI'
export default function Bank({ bookmarksOnly }) {
  const dispatch = useDispatch(); const marks = useSelector(s => s.bookmarks)
  const [f, setF] = useState({ text: '', topic: '', level: '' }); const [open, setOpen] = useState(null)
  const list = QUESTIONS.filter(q => (!bookmarksOnly || marks.includes(q.id)) && (!f.topic || q.topic === f.topic) && (!f.level || q.level === f.level) && q.question.toLowerCase().includes(f.text.toLowerCase()))
  const set = k => e => setF({ ...f, [k]: e.target.value })
  return (<>
    <Title sub={bookmarksOnly ? 'Questions you saved for review' : 'Search, filter and bookmark questions'}>{bookmarksOnly ? 'Bookmarked questions' : 'Question bank'}</Title>
    <div className="mb-4 grid gap-2 md:grid-cols-3">
      <input aria-label="Search questions" className="input" placeholder="Search…" value={f.text} onChange={set('text')} />
      <select aria-label="Topic" className="input" value={f.topic} onChange={set('topic')}><option value="">All topics</option>{TOPICS.map(t => <option key={t}>{t}</option>)}</select>
      <select aria-label="Difficulty" className="input" value={f.level} onChange={set('level')}><option value="">All levels</option>{LEVELS.map(t => <option key={t}>{t}</option>)}</select>
    </div>
    {!list.length ? <Empty>{bookmarksOnly ? 'No bookmarks yet. Save questions from the question bank.' : 'No questions match these filters.'}</Empty> :
      <ul className="space-y-3">{list.map(q => {
        const on = marks.includes(q.id); return (
          <li key={q.id} className="card"><div className="flex items-start justify-between gap-3">
            <div><p className="font-semibold">{q.question}</p><p className="text-xs text-slate-500">{q.topic} · {q.level}</p></div>
            <button className="btn-ghost shrink-0" aria-pressed={on} onClick={() => dispatch(toggleBookmark(q.id))}>{on ? 'Saved' : 'Save'}</button></div>
            <button className="mt-2 text-sm font-medium text-teal underline" aria-expanded={open === q.id} onClick={() => setOpen(open === q.id ? null : q.id)}>{open === q.id ? 'Hide answer' : 'Show answer'}</button>
            {open === q.id && <p className="mt-2 rounded-lg bg-slate-50 p-3 text-sm">{q.answer}</p>}</li>)
      })}</ul>}</>)
}
