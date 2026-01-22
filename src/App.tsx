import styles from "./App.module.css"
import Form from "./components/Form/Form"
import WeatherDetails from "./components/WeatherDetails/WeatherDetails"
import { useWeather } from "./hooks/useWeather"
import Spinner from "./components/Spinner/Spinner"
function App() {
  const { fetchWeather, weather, isEmpty, loading, notFound } = useWeather()
  return (
    <>
      <h1 className={styles.title}>Buscador de Clima</h1>
      <div className={styles.container}>
        <Form
          fetchWeather={fetchWeather}
        />
        {notFound && 
         <p>Ciudad no encontrada</p>
        }
        {loading && (
          <Spinner />
        )}
        {(!isEmpty) && (!loading) && (
          <WeatherDetails
            weather={weather}
          />
        )}
      </div>
    </>
  )
}

export default App
