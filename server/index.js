// Secure AI proxy: the API key never reaches the browser.
import 'dotenv/config'; import express from 'express'; import cors from 'cors'; import rateLimit from 'express-rate-limit'
const app = express()
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }), express.json({ limit: '50kb' }))
app.use('/api', rateLimit({ windowMs: 60_000, limit: 30 }))
app.post('/api/ai', async (req, res) => {
  const { prompt, system } = req.body || {}
  if (typeof prompt !== 'string' || !prompt.trim() || prompt.length > 8000) return res.status(400).json({ error: 'Invalid prompt' })
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-5-5', max_tokens: 1200, system: String(system || '').slice(0, 2000), messages: [{ role: 'user', content: prompt }] })
    })
    const d = await r.json()
    if (!r.ok) return res.status(502).json({ error: d.error?.message || 'AI service error' })
    res.json({ text: d.content.filter(b => b.type === 'text').map(b => b.text).join('') })
  } catch { res.status(500).json({ error: 'Could not reach AI service' }) }
})
app.listen(process.env.PORT || 5000, () => console.log('AI proxy running'))
