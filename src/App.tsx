import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import NewNote from './components/NewNote'
import Note from './components/Note'
import EditNote from './components/EditNote'
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from 'react-bootstrap'
import { RawNote, Tag } from './types/Types'
import { useLocalStorage } from './storage/useLocalStorage'

const App: React.FC = () => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  return (
    <Container className='my-4'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<NewNote />} />
        <Route path="/:id" element={<Note />} />

        <Route path="/:id/edit" element={<EditNote />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Container>
  )
}

export default App
