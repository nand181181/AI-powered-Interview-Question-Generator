import { useState } from 'react'; import { useDispatch, useSelector } from 'react-redux'; import { saveProfile } from '../store'; import { ErrorMsg, Title } from '../components/UI'
export default function Profile() {
  const d = useDispatch(); const [p, setP] = useState(useSelector(s => s.profile)); const [msg, setMsg] = useState(''); const [err, setErr] = useState('')
  const set = k => e => setP({ ...p, [k]: e.target.value })
  const save = e => { e.preventDefault(); setMsg(''); if (p.name.trim().length < 2) return setErr('Enter a name with at least 2 characters.'); setErr(''); d(saveProfile(p)); setMsg('Profile saved') }
  return (<>
    <Title sub="Personalize your practice">Profile & settings</Title>
    <form onSubmit={save} noValidate className="card grid max-w-xl gap-4">
      {[['name', 'Name'], ['role', 'Target role'], ['goal', 'Goal']].map(([k, l]) => <div key={k}><label htmlFor={k} className="mb-1 block text-sm font-medium">{l}</label><input id={k} className="input" value={p[k]} onChange={set(k)} /></div>)}
      <ErrorMsg>{err}</ErrorMsg>{msg && <p role="status" className="text-sm text-teal">{msg}</p>}<button className="btn">Save changes</button>
    </form></>)
}
