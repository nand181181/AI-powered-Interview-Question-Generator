import axios from 'axios'
export const askAI = async (prompt, system = 'You are an expert technical interviewer and coach.') => {
  try { return (await axios.post('/api/ai', { prompt, system }, { timeout: 45000 })).data.text }
  catch (e) { throw new Error(e.response?.data?.error || 'AI is unavailable right now. Check that the server is running and try again.') }
}
export const askJSON = async (prompt, system) => {
  const t = await askAI(prompt + '\nReply with valid JSON only, no markdown.', system)
  try { return JSON.parse(t.replace(/```json|```/g, '').trim()) } catch { throw new Error('The AI reply was malformed. Please retry.') }
}
