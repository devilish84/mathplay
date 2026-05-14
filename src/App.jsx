import { useState } from 'react'
import './App.css'
import Home from './screens/Home'
import SubtractionPage from './subtraction/SubtractionPage'
import AdditionPage from './addition/AdditionPage'
import SequencePage from './sequences/SequencePage'

export default function App() {
  const [mode, setMode] = useState(null)  // null | 'add' | 'sub' | 'seq'

  if (!mode) return <Home onSelect={setMode} />

  if (mode === 'add') return <AdditionPage onBack={() => setMode(null)} />
  if (mode === 'sub') return <SubtractionPage onBack={() => setMode(null)} />
  if (mode === 'seq') return <SequencePage onBack={() => setMode(null)} />
}
