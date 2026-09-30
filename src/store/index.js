import { configureStore, createSlice } from '@reduxjs/toolkit'
const KEY = 'interviewiq'
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) } catch { return null } }
const slice = createSlice({
  name: 'app',
  initialState: load() || { bookmarks: [], history: [], profile: { name: 'Guest', role: 'Frontend Developer', goal: 'Land a React role' } },
  reducers: {
    toggleBookmark: (s, { payload }) => { s.bookmarks = s.bookmarks.includes(payload) ? s.bookmarks.filter(i => i !== payload) : [...s.bookmarks, payload] },
    addSession: (s, { payload }) => { s.history.unshift(payload) },
    clearHistory: s => { s.history = [] },
    saveProfile: (s, { payload }) => { s.profile = payload }
  }
})
export const { toggleBookmark, addSession, clearHistory, saveProfile } = slice.actions
export const store = configureStore({ reducer: slice.reducer })
store.subscribe(() => localStorage.setItem(KEY, JSON.stringify(store.getState())))
