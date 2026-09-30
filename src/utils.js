export const avg = a => a.length ? Math.round(a.reduce((x, y) => x + y, 0) / a.length) : 0
export const byTopic = history => {
  const m = {}
  history.forEach(h => h.items.forEach(i => { (m[h.topic] ||= []).push(i.score * 10) }))
  return Object.entries(m).map(([topic, s]) => ({ topic, score: avg(s), n: s.length })).sort((a, b) => b.score - a.score)
}
