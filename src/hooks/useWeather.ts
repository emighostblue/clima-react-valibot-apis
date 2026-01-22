import axios from "axios"
import { useState, useMemo } from "react"
import { string, number, object, parse, type InferOutput } from "valibot"

//Zod
// Schema de Zod:

// const Weather = z.object({
//     name: z.string(),
//     main: z.object({
//         temp: z.number(), 
//         temp_max: z.number(), 
//         temp_min: z.number(), 
//     })
// })

// type Weather = z.infer<typeof Weather>

// Valibot
const WeatherSchema = object({
    name: string(),
    main: object({
        temp: number(),
        temp_max: number(),
        temp_min: number()
    })
})

export type Weather = InferOutput<typeof WeatherSchema>

export const useWeather = () => {

    const [weather, setWeather] = useState({
        name: "",
        main: {
            temp: 0,
            temp_max: 0,
            temp_min: 0
        }
    })

    const [loading, setLoading] = useState(false)

    const [notFound, setNotFound] = useState(false)

    const fetchWeather = async (city: string, country: string) => {
        console.log(`en el metodo`)
        setLoading(true)
        const API_KEY = import.meta.env.VITE_API_KEY_WEATHER
        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&appid=${API_KEY}`
        try {
            const { data } = await axios(url)
            if(!data[0]){
                console.log(`Clima no encontrado`)
                setNotFound(true)
                return
            }
            console.log(data)
            const { data: weatherResult } = await axios(`https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&appid=${API_KEY}`)
            const result = parse(WeatherSchema, weatherResult)
            if (result) {
                console.log(result.name)
                console.log(result.main.temp)
                setNotFound(false)
                setWeather({
                    name: result.name,
                    main: {
                        temp: result.main.temp,
                        temp_max: result.main.temp_max,
                        temp_min: result.main.temp_min
                    }
                })
            }

        }
        catch (error) {
            console.log(`Imprimir error: ${error}`)
        } finally {
            setLoading(false)
        }
    }

    const isEmpty = useMemo(() => {
        return weather.name.trim() === ""
    }, [weather.name])

    return {
        fetchWeather,
        weather,
        isEmpty,
        loading,
        notFound
    }
}