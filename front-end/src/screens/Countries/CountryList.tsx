import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './CountryList.css'

interface Country {
  code: string
  name: string
  emoji: string
}

const CountryListPage = () => {
  const { continentCode } = useParams<{ continentCode: string }>()
  const [countries, setCountries] = useState<Country[]>([])

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://countries.nausicaa.wilders.dev/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              query {
                continent(code: "${continentCode}") {
                  countries {
                    code
                    name
                    emoji
                  }
                }
              }
            `,
          }),
        })

        const { data } = await response.json()
        setCountries(data.continent.countries)
      } catch (error) {
        console.error('Error fetching countries:', error)
      }
    }

    fetchCountries()
  }, [continentCode])

  return (
    <div>
      <h2>Liste des pays du continent</h2>
      <div className="country-list">
        {countries.map((country) => (
          <div className='country' key={country.code}>
            <Link to={`/country/${country.code}`} className="country-link">
              {country.emoji}
              {country.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CountryListPage