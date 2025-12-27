import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Works from './pages/Works'
import SeriesDetail from './pages/SeriesDetail'
import Exhibitions from './pages/Exhibitions'
import Press from './pages/Press'
import Biography from './pages/Biography'
import Contact from './pages/Contact'
import './styles/global.css'

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page without navigation */}
        <Route 
          path="/" 
          element={
            <Layout showNav={false}>
              <Home />
            </Layout>
          } 
        />
        
        {/* All other pages with navigation */}
        <Route 
          path="/works" 
          element={
            <Layout>
              <Works />
            </Layout>
          } 
        />
        
        <Route 
          path="/works/:slug" 
          element={
            <Layout>
              <SeriesDetail />
            </Layout>
          } 
        />
        
        <Route 
          path="/exhibitions" 
          element={
            <Layout>
              <Exhibitions />
            </Layout>
          } 
        />
        
        <Route 
          path="/press" 
          element={
            <Layout>
              <Press />
            </Layout>
          } 
        />
        
        <Route 
          path="/biography" 
          element={
            <Layout>
              <Biography />
            </Layout>
          } 
        />
        
        <Route 
          path="/contact" 
          element={
            <Layout>
              <Contact />
            </Layout>
          } 
        />
        
        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
