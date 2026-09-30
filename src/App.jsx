import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'; import Setup from './pages/Setup'; import Interview from './pages/Interview'
import Results from './pages/Results'; import Analytics from './pages/Analytics'; import Bank from './pages/Bank'
import History from './pages/History'; import Profile from './pages/Profile'
export default function App() {
  return (
    <Routes><Route element={<Layout />}>
      <Route index element={<Dashboard />} />
      <Route path="setup" element={<Setup />} />
      <Route path="interview/:mode" element={<Interview />} />
      <Route path="results/:id" element={<Results />} />
      <Route path="analytics" element={<Analytics />} />
      <Route path="bank" element={<Bank />} />
      <Route path="bookmarks" element={<Bank bookmarksOnly />} />
      <Route path="history" element={<History />} />
      <Route path="profile" element={<Profile />} />
      <Route path="*" element={<p>Page not found.</p>} />
    </Route></Routes>
  )
}
