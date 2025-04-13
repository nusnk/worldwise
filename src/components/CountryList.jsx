import { useCities } from '../contexts/CitiesContext';
import CountryItem from './CountryItem'
import styles from './CountryList.module.css'
import Message from './Message'
import Spinner from './Spinner'

export default function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner/>
  if (!cities.length) return <Message message="Add your first city by clicking on a city on the map"/>

  const countries = Object.values(cities.reduce((acc, city) => {
    acc[city.country] = { country: city.country, emoji: city.emoji };
    return acc;
  }, {}));

  return (
    <ul className={styles.countryList}>
      {countries.map(country => <CountryItem country={country} key={country.country}/>)}
    </ul>
  )
}