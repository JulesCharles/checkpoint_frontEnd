import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

interface Country {
  code: string
  name: string
  capital: string
  currency: string
  flag: string
  emoji: string
}

const CountryPage = () => {
  const { countryCode } = useParams<{ countryCode: string }>()
  const [country, setCountry] = useState<Country | null>(null)

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(`https://countries.nausicaa.wilders.dev/graphql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              query {
                country(code: "${countryCode}") {
                  code
                  name
                  capital
                  currency
                  emoji
                }
              }
            `,
          }),
        })

        const { data } = await response.json()
        setCountry(data.country)
      } catch (error) {
        console.error('Error fetching country:', error)
      }
    }

    fetchCountry()
  }, [countryCode])

  return (
    <div>
      {country ? (
        <div>
          <p>{country.emoji}</p>
          <h2>{country.name}</h2>
          <p>Capital: {country.capital}</p>
          <p>Devise: {country.currency}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default CountryPage
