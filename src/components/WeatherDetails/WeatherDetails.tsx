import type { Weather } from "../../hooks/useWeather"
import styles from "./WeatherDetails.module.css"

type WeatherDetailsProps = {
    weather: Weather
}



export default function WeatherDetails({ weather }: WeatherDetailsProps) {


    return (
        <div className={styles.container}>
            <h2>Clima de {weather.name}</h2>
            <p className={styles.current}>{weather.main.temp} °C</p>
            <div className={styles.temperatures}>
                <p>Min: <span>{weather.main.temp_min}</span> °C</p>
                <p>Max: <span>{weather.main.temp_max}</span> °C</p>
            </div>
        </div>
    )
}
