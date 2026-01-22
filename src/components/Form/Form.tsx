import { useEffect, useState } from "react"
import {useForm, type SubmitHandler} from "react-hook-form"
import { countries } from "../../data/countries"
import type { SearchType } from "../../types"
import styles from "./Form.module.css"

type FormInputs = {
    city: string
    country: string
}

type FormProps = {
    fetchWeather: (city: string, country: string) => void
}
export default function Form({fetchWeather} : FormProps) {

    const {register, handleSubmit, reset, formState: {errors}} = useForm<FormInputs>()
    const [search, setSearch] = useState<SearchType>({
        city: "",
        country: ""
    })

     useEffect(() => {
        if(search.city && search.country){
            fetchWeather(search.city, search.country)
        }
    }, [search])


    const onSubmit: SubmitHandler<FormInputs> =  (data => {
        console.log(data)
        setSearch(data)
        reset()
    })

   

   

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} >
            <div className={styles.field}>
                <label htmlFor="city">Ciudad:</label>
                <input
                    id="city"
                    type="text"
                    placeholder="Escribe una ciudad..."
                    
                   {...register("city", {
                        required: "El nombre de la ciudad es obligatorio",
                        pattern: {
                            value: /^[a-zA-Z ]+$/,
                            message: "El nombre de la ciudad debe incluir solamente letras"
                        }
                   })}
                />
                {errors.city && (
                    <p className={styles.error}>{errors.city.message?.toString()}</p>
                )}
            </div>
            <div className={styles.field}>
                <label htmlFor="country">País:</label>
                <select 
                    id="country"
                    {...register("country", {
                        required: "El país es obligatorio."
                    })}
                >
                    <option value="">--- Seleccione un país ---</option>
                    {countries.map(country => (
                        <option 
                            key={country.code} 
                            value={country.code}
                        >
                            {country.name}
                        </option>
                    ))}
                </select>

                {errors.country && (
                    <p className={styles.error}>{errors.country.message}</p>
                )}

            </div>
            <input className={styles.submit} type="submit"  value={"Consultar Clima"} />
        </form>
    )
}
