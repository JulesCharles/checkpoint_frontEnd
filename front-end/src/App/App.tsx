import './App.css'
import { Routes, Route } from 'react-router-dom'
import ContinentList from '../screens/Continents/ContinentList'
import CountryList from '../screens/Countries/CountryList'
import Details from '../screens/Details/Details'
import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Link to="/">
        <div className="home">Back Home</div>
      </Link>
      <Routes>
        <Route path='/' element={<ContinentList />} />
        <Route path="/continent/:continentCode" element={<CountryList />} />
        <Route path="/country/:countryCode" element={<Details />} />
      </Routes>
    </div>
  )
}

export default App
