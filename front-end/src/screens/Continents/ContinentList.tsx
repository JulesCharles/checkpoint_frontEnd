import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './ContinentList.css'

interface Continent {
  code: string
  name: string
}

const ContinentList = () => {
  const [continents, setContinents] = useState<Continent[]>([])

  useEffect(() => {
    const fetchContinents = async () => {
      try {
        const response = await fetch('https://countries.nausicaa.wilders.dev/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              query {
                continents {
                  code
                  name
                }
              }
            `,
          }),
        })

        const { data } = await response.json()
        setContinents(data.continents)
      } catch (error) {
        console.error('Error fetching continents:', error)
      }
    }
    fetchContinents()
  }, [])

  return (
    <div>
      <h2>Liste des continents</h2>
      <div className="continent-list">
        {continents.map((continent) => (
          <div className="hey" key={continent.code}>
            <Link to={`/continent/${continent.code}`} className="continent-link">
              {continent.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContinentList